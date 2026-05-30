## Setup

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

3. Run frontend application

```
cd frontend
npm run dev
```

4. Visit [http://localhost:3000/](http://localhost:3000/) and enjoy!

## Tools

- Data collection: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1920px-Google_Maps_icon_%282020%29.svg.png" width="10" height="15" /> Google Places API
- Data storage: <img src="https://images.icon-icons.com/2699/PNG/512/sqlite_logo_icon_169724.png" width="15" height="15" /> SQLite database
- Backend: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/3840px-Python-logo-notext.svg.png" width="15" height="15" /> Python (FastAPI)
- Frontend: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png" width="18" height="15" /> React, <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="15" height="15" /> Next.js

## Possible improvements

- Collecting data from multiple sources and validating them against each other
- Embedded map with location
- Authorization behind data manipulation
- Fetching some reviews
