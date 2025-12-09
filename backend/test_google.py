import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega a chave
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

print("🔍 Perguntando ao Google quais modelos você tem acesso...")

try:
    available_models = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"✅ Disponível: {m.name}")
            available_models.append(m.name)
            
    if not available_models:
        print("❌ Nenhum modelo de texto encontrado. Verifique se a API Generativa está ativada no Google Cloud Console.")
    else:
        print(f"\n🚀 RECOMENDAÇÃO: Use o modelo '{available_models[0]}' no seu código.")
        
except Exception as e:
    print(f"❌ Erro de conexão: {e}")