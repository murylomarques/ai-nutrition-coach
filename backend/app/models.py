from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base

class DietPlanModel(Base):
    __tablename__ = "diet_plans"

    id = Column(Integer, primary_key=True, index=True)
    
    # Metadados do Usuário (Snapshot do momento que gerou)
    user_age = Column(Integer)
    user_weight = Column(Float)
    user_goal = Column(String)
    
    # O Plano Gerado
    plan_title = Column(String)
    calories_total = Column(Integer)
    protein_total = Column(Integer)
    carbs_total = Column(Integer)
    fat_total = Column(Integer)
    
    # Armazena o JSON completo das refeições (Flexibilidade)
    meals_json = Column(JSON)
    notes_json = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())