# backend/app/schemas.py
from pydantic import BaseModel, Field
from typing import List, Optional

# 1. O que o usuário envia (Input)
class UserPreferences(BaseModel):
    age: int = Field(..., gt=0, lt=120, description="Idade em anos")
    weight: float = Field(..., gt=20, description="Peso em kg")
    height: float = Field(..., gt=50, description="Altura em cm")
    goal: str = Field(..., description="Ex: emagrecimento, hipertrofia")
    activity_level: str = Field(..., description="Ex: sedentario, moderado, ativo")
    allergies: Optional[List[str]] = []
    food_preferences: Optional[List[str]] = []

# 2. O que a API devolve (Output - Estrutura da Dieta)
class MealItem(BaseModel):
    food: str
    portion: str
    calories: int
    protein: int
    carbs: int
    fat: int

class DailyPlan(BaseModel):
    plan_title: str
    calories_total: int
    protein_total: int
    carbs_total: int
    fat_total: int
    meals: dict[str, MealItem] # Ex: "cafe_da_manha": { ... }
    notes: List[str]