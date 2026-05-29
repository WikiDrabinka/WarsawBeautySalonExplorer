1. Set up a virtual environment

``` 
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

2. Run FastAPI

```
fastapi dev ./backend/main.py
```