0. Data scraping

Replace this line in data_scraping.py with your Google Places API key and run the script. (Or just use the provided database)
```
API_KEY = None
```


1. Set up a virtual environment

``` 
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

2. Run FastAPI

```
fastapi dev backend/main.py
```
