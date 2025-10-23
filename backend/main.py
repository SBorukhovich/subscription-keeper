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
    name: str
    price: float
    renewal_date: str


@app.on_event("startup")
def on_startup():
    print("Creating database tables if not exist...")
    SQLModel.metadata.create_all(engine)
    print("Database connected and tables created.")


@app.get("/")
def read_root():
    return {"message": "Connected to MySQL successfully!"}


@app.get("/subscriptions")
def get_subscriptions():
    with Session(engine) as session:
        subscriptions = session.query(Subscription).all()
        return subscriptions


@app.post("/subscriptions")
def add_subscription(subscription: Subscription):
    with Session(engine) as session:
        session.add(subscription)
        session.commit()
        session.refresh(subscription)
        return subscription
