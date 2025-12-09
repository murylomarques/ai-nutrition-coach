from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # <--- ISSO É OBRIGATÓRIO
from app.schemas import UserPreferences, DailyPlan
from app.services.diet_service import generate_diet_plan

app = FastAPI(title="AI Nutrition Coach", version="0.1.0")

# --- BLOCO DE SEGURANÇA CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite qualquer origem (Frontend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -------------------------------

@app.get("/ping")
def health_check():
    return {"status": "active"}

@app.post("/api/generate", response_model=DailyPlan)
def generate_diet(user_data: UserPreferences):
    return generate_diet_plan(user_data)