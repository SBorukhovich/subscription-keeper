# subscription-keeper

Set up backend: 
    cd backend
    python3 -m venv .venv           
    source .venv/bin/activate
    pip3 install -r requirements.txt
    uvicorn main:app --reload       

Set up frontend:
    cd frontend
    npm start

    npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch