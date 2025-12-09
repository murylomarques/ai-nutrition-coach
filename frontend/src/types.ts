// frontend/src/types.ts

// 1. O que enviamos para a API
export interface UserPreferences {
  age: number;
  weight: number;
  height: number;
  goal: string;
  activity_level: string;
  allergies: string[];
  food_preferences: string[];
}

// 2. Itens internos da dieta
export interface MealItem {
  food: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// 3. O ERRO ESTÁ AQUI: Você precisa exportar "DietPlan"
export interface DietPlan {
  plan_title: string;
  calories_total: number;
  protein_total: number; // Adicionei isso pois usamos no DietGenerator atualizado
  carbs_total: number;
  fat_total: number; 
  meals: Record<string, MealItem>;
  notes: string[];
}