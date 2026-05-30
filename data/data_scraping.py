import requests
import sqlite3

API_KEY = None
places = []
queries = ["Fryzjer Warszawa", "Barber Warszawa", "Hairdresser Warszawa", "Kosmetyczka Warszawa", "Manicure Warszawa", "Beauty Salon Warszawa"]

for query in queries:
    res = requests.post('https://places.googleapis.com/v1/places:searchText',f'{{"textQuery" : "{query}", "maxResultCount": 110}}', headers={
    'X-Goog-Api-Key': API_KEY,
    'Content-Type': 'application/json',
    'X-Goog-FieldMask': '*'
    })
    if res.status_code==200:
        places.extend(res.json()["places"])

def getAddress(addressComponents: list[dict]):
    address = postal_code = district = ""
    for component in addressComponents:
        if "types" not in component.keys():
            address = component["longText"]
        elif "route" in component["types"]:
            address = component["longText"] + address
        elif "street_number" in component["types"]:
            address = address + " " + component["longText"]
        elif "postal_code" in component["types"]:
            postal_code = component["longText"]
        elif "sublocality_level_1" in component["types"]:
            district = component["longText"]
    return address, postal_code, district

place_list = []
visited_ids = set()
for place in places:
    if place["id"] in visited_ids: 
        continue
    place_list.append((
        place["id"],
        place["displayName"]["text"],
        place["nationalPhoneNumber"] if "nationalPhoneNumber" in place.keys() else None,
        *getAddress(place["addressComponents"]),
        place["rating"],
        place["userRatingCount"],
        place["websiteUri"] if "websiteUri" in place.keys() else None,
        place["googleMapsTypeLabel"]
    ))

    visited_ids.add(place["id"])

con = sqlite3.connect("data.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS salons (id text, name text, phone_number text, address text, postal_code text, district text, rating real, number_of_reviews int, website text, type text, PRIMARY KEY(id))")
cur.executemany("INSERT INTO salons VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", place_list)
con.commit()
con.close()
