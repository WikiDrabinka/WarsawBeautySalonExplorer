# %%
import requests
from bs4 import BeautifulSoup
import re
import json

base_url = "https://www.yelp.pl/search?find_desc=Hair+Salons&find_loc=Warszawa"
next_url = ""
headers = {
    'User-Agent': 'project',
}

# %%
links = []
page = 1
while len(links) < 200:
    response = requests.get(base_url+next_url, headers=headers)
    if response.status_code != 200:
        continue
    soup = BeautifulSoup(response.text)
    all_links = [link.find("a").get("href") for link in soup.find("main").find_all("li") if link.find("a")]
    salons = filter(lambda link: re.match('/biz/', link), all_links)
    next_url = f"&start={page*10}"
    links.extend(salons)
    page+=1

# %%
salons = []
for link in links:
    response = requests.get("https://www.yelp.pl"+link, headers=headers)
    if response.status_code != 200:
        continue
    soup = BeautifulSoup(response.text)

    full_address = soup.find("address")
    try:
        address = full_address.next_element.text
        zip_code = full_address.next_element.next_sibling.text.split()[0]
        district = full_address.next_sibling.text.split(", ")[-1]
    except:
        print(full_address)
        continue

    name = soup.find("h1").text.strip()

    contact = soup.find("div", attrs={"data-testid": "cookbook-island"})
    contact = [p.text for p in contact.find_all("p")]
    
    website = list(filter(lambda string: re.match("[a-z]+[.][a-z]+", string), contact))
    phone_number = list(filter(lambda string: re.match("[0-9 ]{9,12}", string), contact))

    reviews = soup.find("div", attrs={"data-testid":"BizHeaderReviewCount"})
    if not reviews:
        rating, quantity = None, None
    else:
        rating, quantity, *_ = reviews.text.split()
        rating = float(rating)
        quantity = int(re.findall("[0-9]+",quantity)[0])

    object = {
        "name" : name,
        "address" : address,
        "zip_code" : zip_code,
        "district" : district,
        "website" : website[0] if len(website)>0 else None,
        "phone_number" : phone_number[0] if len(phone_number)>0 else None,
        "rating" : rating,
        "number_of_reviews" : quantity
    }
    salons.append(object)

# %%
#json.dump(salons, open("data.json", "w"))

# %%
#salons = json.load(open("data.json", "r"))

# %%
import sqlite3
con = sqlite3.connect("data.db")
con.row_factory = sqlite3.Row

# %%
cur = con.cursor()

# %%
cur.execute("DROP TABLE salons")

# %%
cur.execute("CREATE TABLE IF NOT EXISTS salons (id int, name text, address text, zip_code text, district text, website text, phone_number text, rating real, number_of_reviews int, PRIMARY KEY(id))")

# %%
cur.executemany("INSERT INTO salons VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [(id, *salon.values()) for id,salon in enumerate(salons)])

# %%
con.commit()
con.close()


