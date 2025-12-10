# 🥗 AI Nutrition Coach

![Status](https://img.shields.io/badge/STATUS-MVP_COMPLETO-green?style=for-the-badge&logo=github)
![AI](https://img.shields.io/badge/AI-GEMINI_2.5-blue?style=for-the-badge&logo=google)
![Stack](https://img.shields.io/badge/STACK-FASTAPI_REACT-orange?style=for-the-badge)

> **Sua dieta personalizada gerada por Inteligência Artificial em segundos.**

Uma aplicação Full-Stack que utiliza a mais recente tecnologia de LLMs (Google Gemini 2.5) para criar planos alimentares baseados em dados metabólicos reais.

## 🎯 Por que este projeto é importante?
A maioria dos aplicativos de dieta ou são genéricos demais ou exigem inputs manuais exaustivos. O **AI Nutrition Coach** resolve isso combinando:
1.  **Ciência Nutricional:** Cálculos de TMB (Taxa Metabólica Basal) e macros.
2.  **Personalização via IA:** Adaptação criativa de pratos baseada em gostos e objetivos.
3.  **Escalabilidade:** Capacidade de gerar milhares de planos únicos sem intervenção humana.

---

## 📸 Demonstração
![Demo do Projeto](assets/demo.gif)
*(Se a imagem não carregar, verifique a pasta assets)*

---

## 🏗️ Arquitetura do Sistema
O projeto segue uma arquitetura baseada em **Serviços**, separando a lógica de negócio (Regras de Dieta) da camada de transporte (API).

### Fluxo de Dados Inteligente (Diagrama)
```
graph TD
    A[👤 Usuário] -->|Input Dados| B(🖥️ Frontend React)
    B -->|POST JSON| C{⚙️ Backend FastAPI}
    C -->|Validação Pydantic| D[📂 Diet Service]
    
    subgraph "Núcleo de Inteligência"
    D -->|Tenta Conectar| E[🤖 Google Gemini 2.5]
    E -->|Sucesso?| F[✅ Retorna Plano JSON]
    E -.->|Falha/Timeout| G[⚠️ Algoritmo Fallback]
    G -->|Cálculo Matemático| F
    end
    
    F --> C
    C --> B
    B -->|Renderiza| A
```

---

## 🚀 Tecnologias Utilizadas

### Backend (API & Lógica)
- **FastAPI:** Para endpoints assíncronos de alta performance.
- **Python 3.10+:** Linguagem base.
- **Google Generative AI:** SDK oficial para comunicação com LLM.
- **Pydantic:** Garante que os dados de entrada e saída sigam um contrato estrito.
- **Service Pattern:** Isolamento da lógica da IA para facilitar testes e manutenção.

### Frontend (Interface)
- **React (Vite):** SPA rápida e modular.
- **TypeScript:** Segurança de tipos para evitar erros em runtime.
- **Tailwind CSS:** Estilização utility-first para UI moderna.
- **Axios:** Cliente HTTP robusto.

---

## ⚙️ Instalação e Execução

### Pré-requisitos
- Python 3.x
- Node.js
- Chave de API do Google (Gratuita no AI Studio)

### 1. Backend
```bash
cd backend
# Criar ambiente virtual
python -m venv .venv
# Ativar (Windows)
.venv\Scripts\activate
# Ativar (Mac/Linux)
source .venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar Chave
# Crie um arquivo .env na pasta backend e adicione:
# GOOGLE_API_KEY=sua_chave_aqui

# Rodar
uvicorn app.main:app --reload --host 0.0.0.0
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
O projeto estará rodando em: `http://localhost:5173`

---

## 🛡️ Robustez e Fallback
Um diferencial deste projeto é o sistema de **Fallback**. 
Depender de APIs externas (como OpenAI ou Google) traz riscos de indisponibilidade. Implementei um sistema que:
1. Tenta gerar a dieta via IA.
2. Se houver erro de rede, bloqueio de segurança ou timeout...
3. O sistema **automaticamente** ativa um algoritmo local (Mock Inteligente) que calcula as calorias e entrega uma dieta baseada em padrões matemáticos.
**Resultado:** O usuário nunca fica sem resposta.

---

## 👨‍💻 Autor
Desenvolvido como projeto de portfólio focado em Engenharia de Software e IA.