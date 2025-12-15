import axios from 'axios';

// Detecta se estamos rodando local ou na nuvem
// Se for produção (Vercel), usa o link do Render. Se for local, usa localhost.
const API_URL = import.meta.env.PROD 
  ? 'https://ai-nutrition-coach-api.onrender.com/api'  // <--- SEU LINK DO RENDER AQUI
  : 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
});