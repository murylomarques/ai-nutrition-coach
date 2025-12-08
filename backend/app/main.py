# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import UserPreferences, DailyPlan, MealItem # Importando nossas regras

app = FastAPI(title="AI Nutrition Coach", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def health_check():
    return {"status": "active"}

# --- NOVA ROTA AQUI ---
@app.post("/api/generate", response_model=DailyPlan)
def generate_diet(user_data: UserPreferences):
    """
    Recebe dados do usuário e retorna um plano alimentar MOCK (Simulado).
    Futuramente, aqui chamaremos a OpenAI.
    """
    
    # Lógica Simulada (Hardcoded)
    # Não importa o que o usuário mande, devolvemos isso por enquanto.
    # Isso permite testar o Frontend sem gastar créditos da IA.
    
    print(f"Recebi dados do usuário: {user_data.goal} - {user_data.weight}kg") # Log simples

    return DailyPlan(
        plan_title=f"Plano Mock para {user_data.goal}",
        calories_total=2200,
        protein_total=160,
        carbs_total=200,
        fat_total=70,
        meals={
            "cafe_da_manha": MealItem(
                food="Ovos mexidos com espinafre e aveia",
                portion="3 ovos + 40g aveia",
                calories=450, protein=25, carbs=30, fat=15
            ),
            "almoco": MealItem(
                food="Peito de frango grelhado + Arroz integral + Brócolis",
                portion="150g frango + 100g arroz",
                calories=600, protein=45, carbs=50, fat=10
            ),
            "jantar": MealItem(
                food="Patinho moído com batata doce",
                portion="150g carne + 100g batata",
                calories=550, protein=40, carbs=40, fat=12
            )
        },
        notes=["Beba pelo menos 3L de água", "Evite frituras", "Este é um plano gerado por IA (Simulação)"]
    )