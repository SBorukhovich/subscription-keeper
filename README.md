# 🗂 Subscription Keeper

Subscription Keeper is a full-stack web application that helps users track all recurring subscriptions in one place. It simplifies personal budgeting by allowing users to manage renewal cycles, pricing, billing frequency, and notes—all through a clean, intuitive dashboard. A one place to track all of your subscriptions. 

<img width="1468" height="802" alt="SK_example" src="https://github.com/user-attachments/assets/dbe41407-360b-4159-87d2-85542f7fa0b9" />
<img width="1466" height="802" alt="Screenshot 2025-11-23 at 19 05 01" src="https://github.com/user-attachments/assets/258e1a46-b45f-4464-8cee-55c40aff0390" />

## Try it

[Subscription Keeper](https://subscription-keeper.vercel.app/)


To get started just sign up or log in using your Google account and start adding your subscriptions.


## 🚀 Features
* Secure Google Authentication (via FirebaseAuth)
* Add, view, edit, and delete subscription entries.
* Get Insights: Annual and monthly spending, next subscription to expire, most and least expensive subscriptions.
* Notes + Color Coding: Add notes and tag subscriptions with custom colors.
* Renewal Types: Choose between automatic and manual renewal.
* Billing Cycles: Choose between monthly and annual plans.
* Persistent Cloud Storage

## 🛠️ Tech Stack

**Frontend**
- React.js
- npm

**Backend**
- FastAPI
- SQLAlchemy ORM

**Database**
- MySQL (AWS)

**Deployment**
- Vercel (Frontend)
- Render (Backend API)


## API Overview
GET /subscriptions

* Retrieve all user subscriptions.

POST /subscriptions

* Create a new subscription entry.

PUT /subscriptions/{id}

* Update name, price, notes, renewal type, billing cycle, etc.

DELETE /subscriptions/{id}

* Remove a subscription from the database.

## To Run Locally
Clone the repo
```
git clone https://github.com/yourusername/subscription-keeper.git
cd subscription-keeper
```
Start backend: 

    cd backend
    ./run.sh

Start frontend:
    
    cd frontend
    npm run dev

## Environment Variables (Required)

### Frontend
Create a `.env` file in `/frontend`:

REACT_APP_API_URL="http://127.0.0.1:8000/"

### Backend
Create a `.env` file in `/backend`:

DATABASE_URL="mysql://user:password@host:port/dbname"
SECRET_KEY="your_secret_key"

## 🤝 Contributions

This is a personal project, but suggestions are welcome!
