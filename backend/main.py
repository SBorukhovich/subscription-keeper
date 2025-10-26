from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional
from dotenv import load_dotenv
import os

app = FastAPI(title="Subscription Keeper API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- Database setup -----------
load_dotenv()

MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = os.getenv("MYSQL_PORT")
MYSQL_DB = os.getenv("MYSQL_DB")

DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
engine = create_engine(DATABASE_URL, echo=True)


class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str    # firebase UID
    name: str
    price: float
    renewal_date: str
    color: str


@app.on_event("startup")
def on_startup():
    print("Creating database tables if not exist...")
    SQLModel.metadata.create_all(engine)
    print("Database connected and tables created.")


@app.get("/")
def read_root():
    return {"message": "Connected to MySQL successfully!"}


@app.get("/subscriptions/{user_id}")
def get_subscriptions(user_id: str):
    with Session(engine) as session:
        subscriptions = session.query(Subscription).filter(Subscription.user_id == user_id).all()
        return subscriptions


@app.post("/subscriptions")
def add_subscription(subscription: Subscription):
    with Session(engine) as session:
        session.add(subscription)
        session.commit()
        session.refresh(subscription)
        return subscription

@app.put("/subscriptions/{subscription_id}")
def update_subscription(subscription_id: int, updated_data: Subscription):
    with Session(engine) as session:
        existing = session.get(Subscription, subscription_id)

        if not existing:
            return {"error": "Subscription not found."}

        if updated_data.user_id != existing.user_id:
            return {"error": "Unauthorized to edit this subscription."}

        # Update only fields that are provided
        if updated_data.name:
            existing.name = updated_data.name
        if updated_data.price:
            existing.price = updated_data.price
        if updated_data.renewal_date:
            existing.renewal_date = updated_data.renewal_date
        if updated_data.color:
            existing.color = updated_data.color

        session.add(existing)
        session.commit()
        session.refresh(existing)
        return existing


@app.delete("/subscriptions/delete/{subscription_id}")
def delete_subscription(subscription_id: int, user_id: str):
    with Session(engine) as session:
        subscription = session.get(Subscription, subscription_id)
        
        if not subscription:
            return {"error": "Subscription not found."}
        if subscription.user_id != user_id:
            return {"error": "Unauthorized to delete this subscription."}
        
        session.delete(subscription)
        session.commit()
        return {"message": "Subscription deleted successfully."}