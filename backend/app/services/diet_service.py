import os
import json
import google.generativeai as genai
from app.schemas import UserPreferences, DailyPlan, MealItem
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)

def generate_diet_plan_mock(user_data: UserPreferences) -> DailyPlan:
    print("⚠️ Entrando no Modo Mock (Fallback).")
    return DailyPlan(
        plan_title="Plano Offline (Fallback)",
        calories_total=2000, protein_total=150, carbs_total=200, fat_total=60,
        meals={
            "cafe_da_manha": MealItem(food="Ovos e Aveia", portion="3 ovos", calories=350, protein=20, carbs=20, fat=15),
            "almoco": MealItem(food="Frango e Batata", portion="150g cada", calories=500, protein=40, carbs=40, fat=10),
            "jantar": MealItem(food="Salada e Atum", portion="1 lata", calories=300, protein=30, carbs=10, fat=10)
        },
        notes=["Serviço de IA instável.", "Tente novamente em instantes."]
    )

def generate_diet_plan(user_data: UserPreferences) -> DailyPlan:
    try:
        if not API_KEY:
            print("❌ Erro: Chave API não encontrada.")
            return generate_diet_plan_mock(user_data)

        # --- AQUI ESTÁ A MUDANÇA (Usando o modelo da sua lista) ---
        model_name = 'models/gemini-2.5-flash'
        # ----------------------------------------------------------
        
        print(f"🤖 Solicitando ao Google ({model_name})...")
        
        model = genai.GenerativeModel(model_name)
        
        prompt = f"""
        Atue como nutricionista esportivo. Crie um JSON para:
        - Idade: {user_data.age}
        - Peso: {user_data.weight}kg
        - Altura: {user_data.height}cm
        - Objetivo: {user_data.goal}
        - Nível Atividade: {user_data.activity_level}
        
        Responda APENAS JSON puro (sem markdown, sem ```json) neste schema:
        {{
            "plan_title": "Titulo Criativo (Ex: Protocolo Beast)",
            "calories_total": 0, "protein_total": 0, "carbs_total": 0, "fat_total": 0,
            "meals": {{
                "cafe_da_manha": {{ "food": "Prato detalhado", "portion": "Qtd exata", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }},
                "almoco": {{ "food": "Prato detalhado", "portion": "Qtd exata", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }},
                "jantar": {{ "food": "Prato detalhado", "portion": "Qtd exata", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }}
            }},
            "notes": ["Dica 1", "Dica 2"]
        }}
        """

        response = model.generate_content(prompt)
        
        # Limpeza de segurança (Remove formatação Markdown se a IA mandar)
        cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
        data = json.loads(cleaned_text)
        
        print("✅ Sucesso! Plano gerado pela IA.")
        return DailyPlan(**data)

    except Exception as e:
        print(f"❌ Erro na IA: {e}")     
        return generate_diet_plan_mock(user_data)