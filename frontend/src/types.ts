// frontend/src/types.ts

// 1. O que enviamos para a API (Formulário)
export interface UserPreferences {
  age: number;
  weight: number;
  height: number;
  goal: string;
  activity_level: string;
  allergies: string[];
  food_preferences: string[];
}

// 2. Itens internos da dieta (Refeição individual)
export interface MealItem {
  food: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// 3. O Plano completo (Resposta da IA)
export interface DietPlan {
  plan_title: string;
  calories_total: number;
  protein_total: number;
  carbs_total: number;
  fat_total: number;
  meals: Record<string, MealItem>;
  notes: string[];
}

// 4. Histórico (O que vem do Banco de Dados)
export interface DietHistoryItem {
  id: number;
  // Campos do usuário (snapshot)
  user_age: number;
  user_weight: number;
  user_goal: string;
  // Campos do plano
  plan_title: string;
  calories_total: number;
  protein_total: number;
  meals_json: Record<string, MealItem>; // O banco retorna como JSON
  notes_json: string[] | string;        // Pode vir string ou array
  created_at: string;
}