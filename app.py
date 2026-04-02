from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from model import load_engine, get_recommendations

engine_rules = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global engine_rules
    print(" Starting up server... Caching association rules.")
    engine_rules = load_engine('association_rules.csv')
    yield  
    engine_rules = None

app = FastAPI(title="E-Commerce API", lifespan=lifespan)

# --- THE MAGIC FIX: Allow React to talk to FastAPI ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all connections (great for local testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/recommend")
def recommend(item: str = Query(...)):
    if engine_rules is None:
        raise HTTPException(status_code=500, detail="Engine not loaded.")
    
    recommended_items = get_recommendations(item, engine_rules, top_n=3)
    
    return {
        "success": True,
        "queried_item": item,
        "recommendations": recommended_items
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)