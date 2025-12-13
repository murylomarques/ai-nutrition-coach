from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.schemas import UserPreferences, DailyPlan
from app.services.diet_service import generate_diet_plan
from app.database import get_db
from app.models import DietPlanModel

app = FastAPI(title="AI Nutrition Coach", version="0.2.0")

# Configure CORS policies
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

@app.post("/api/generate", response_model=DailyPlan)
def generate_diet(user_data: UserPreferences, db: Session = Depends(get_db)):
    """
    Generates a personalized diet plan using AI and persists the result to the database.
    """
    # Execute core business logic
    plan = generate_diet_plan(user_data)
    
    # Serialize Pydantic model to dict for JSON storage
    plan_dict = plan.model_dump()

    db_plan = DietPlanModel(
        user_age=user_data.age,
        user_weight=user_data.weight,
        user_goal=user_data.goal,
        plan_title=plan.plan_title,
        calories_total=plan.calories_total,
        protein_total=plan.protein_total,
        carbs_total=plan.carbs_total,
        fat_total=plan.fat_total,
        meals_json=plan_dict.get('meals'),
        notes_json=plan_dict.get('notes')
    )
    
    try:
        db.add(db_plan)
        db.commit()
        db.refresh(db_plan)
    except Exception as e:
        # Log error but return response to avoid blocking the user
        print(f"Error saving to database: {e}")
    
    return plan

@app.get("/api/history")
def get_history(db: Session = Depends(get_db)):
    """
    Retrieves the last 10 generated diet plans.
    """
    return db.query(DietPlanModel).order_by(DietPlanModel.id.desc()).limit(10).all()