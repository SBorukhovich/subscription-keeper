from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Subscription Keeper API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data
subscriptions = [
    {"id": 1, "name": "Netflix", "price": 15.99, "renewal_date": "2025-11-01"},
    {"id": 2, "name": "Spotify", "price": 9.99, "renewal_date": "2025-10-15"},
]

@app.get("/")
def home():
    return {"message": "Subscription Keeper API is running 🚀"}

@app.get("/subscriptions")
def get_subscriptions():
    return subscriptions

@app.post("/subscriptions")
def add_subscription(sub: dict):
    sub["id"] = len(subscriptions) + 1
    subscriptions.append(sub)
    return {"message": "Subscription added", "data": sub}
