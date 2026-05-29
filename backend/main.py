from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
con = sqlite3.connect("./data/data.db")
con.row_factory = sqlite3.Row
cur = con.cursor()

app = FastAPI()

class Salon(BaseModel):
    name: str | None = None
    address: str | None = None
    zip_code: str | None = None
    district: str | None = None
    website: str | None = None
    phone_number: str | None = None
    rating: float | None = None
    number_of_reviews: int | None = None

@app.get("/")
async def get_all():
    data = cur.execute("SELECT * FROM salons")
    return [dict(row) for row in data]

@app.get("/salon/{salon_id}")
async def get_salon(salon_id: int):
    row = cur.execute("SELECT * FROM salons WHERE id = ?", (salon_id,)).fetchone()
    return dict(row) if row else {"msg" : "Incorrect id"}

@app.put("/salon/{salon_id}")
async def update_salon(salon_id: int, salon: Salon):
    object = salon.model_dump()
    cur.execute("UPDATE salons SET name = ?, address = ?, zip_code = ?, district = ?, website = ?, phone_number = ?, rating = ?, number_of_reviews = ? WHERE id = ?",
                (*object.values(), salon_id))
    cur.commit()