import { useState } from 'react';
import axios from 'axios';
import { Loader2, ChefHat, CheckCircle, AlertCircle } from 'lucide-react';

// --- DEFINIÇÃO DOS TIPOS (Colocamos aqui para resolver o erro de import) ---

export interface UserPreferences {
  age: number;
  weight: number;
  height: number;
  goal: string;
  activity_level: string;
  allergies: string[];
  food_preferences: string[];
}

export interface MealItem {
  food: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DietPlan {
  plan_title: string;
  calories_total: number;
  protein_total: number;
  carbs_total: number;
  fat_total: number;
  meals: Record<string, MealItem>;
  notes: string[];
}

// --- FIM DOS TIPOS ---

export function DietGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<DietPlan | null>(null);

  // Estado do formulário
  const [formData, setFormData] = useState<UserPreferences>({
    age: 25,
    weight: 70,
    height: 175,
    goal: 'hipertrofia',
    activity_level: 'moderado',
    allergies: [],
    food_preferences: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      // Chamada para o seu Backend Python
      const response = await axios.post('http://127.0.0.1:8000/api/generate', formData);
      setPlan(response.data);
    } catch (err) {
      console.error("Erro ao gerar dieta:", err);
      setError("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* --- LADO ESQUERDO: FORMULÁRIO --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
          <ChefHat className="text-teal-600" /> Seus Dados
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid para inputs numéricos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
              <input 
                type="number" 
                value={formData.age}
                onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Ex: 25"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
              <input 
                type="number" 
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Ex: 70"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
              <input 
                type="number" 
                value={formData.height}
                onChange={e => setFormData({...formData, height: Number(e.target.value)})}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Ex: 175"
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nível de Atividade</label>
              <select 
                value={formData.activity_level}
                onChange={e => setFormData({...formData, activity_level: e.target.value})}
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="sedentario">Sedentário</option>
                <option value="leve">Leve (1-3x/sem)</option>
                <option value="moderado">Moderado (3-5x/sem)</option>
                <option value="intenso">Intenso (Todo dia)</option>
              </select>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Qual seu objetivo?</label>
            <select 
              value={formData.goal}
              onChange={e => setFormData({...formData, goal: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="emagrecimento">Perder Peso (Definição)</option>
              <option value="hipertrofia">Ganhar Massa Muscular</option>
              <option value="saude">Reeducação Alimentar</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 active:scale-95 transition-all flex justify-center items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Gerando Plano...
              </>
            ) : (
              'Gerar Dieta com IA'
            )}
          </button>
        </form>
      </div>

      {/* --- LADO DIREITO: RESULTADO --- */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[400px] flex flex-col">
        
        {/* Estado: Erro */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-100 mb-4">
            <AlertCircle size={24} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Estado: Vazio (Inicial) */}
        {!plan && !loading && !error && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <ChefHat size={48} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-600">Seu plano aparecerá aqui</h3>
            <p className="text-sm mt-1">Preencha seus dados ao lado e a IA criará uma rotina personalizada.</p>
          </div>
        )}

        {/* Estado: Loading (Esqueleto simples) */}
        {loading && (
          <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
            <div className="h-8 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-32 w-full bg-slate-200 rounded"></div>
            <div className="h-32 w-full bg-slate-200 rounded"></div>
          </div>
        )}

        {/* Estado: Sucesso (Mostra o Plano) */}
        {plan && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-2xl font-bold text-teal-800 leading-tight">{plan.plan_title}</h3>
              <div className="flex gap-4 mt-3 text-sm font-medium text-slate-600 bg-white p-3 rounded-lg border border-slate-100 inline-flex shadow-sm">
                <span className="flex items-center gap-1">🔥 {plan.calories_total} kcal</span>
                <span className="w-px h-4 bg-slate-300"></span>
                <span className="flex items-center gap-1">🥩 {plan.protein_total}g Prot</span>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(plan.meals).map(([key, meal]) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-teal-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">
                      {key.replace(/_/g, " ")}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400">{meal.calories} kcal</span>
                  </div>
                  <p className="font-medium text-slate-800 text-lg">{meal.food}</p>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                    🍽️ {meal.portion}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Notas / Disclaimer */}
            <div className="mt-8 bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
              <div className="flex gap-2 text-yellow-800 font-semibold text-sm mb-2">
                <CheckCircle size={16} />
                <span>Observações Importantes</span>
              </div>
              <ul className="list-disc list-inside text-xs text-yellow-700 space-y-1 ml-1">
                {plan.notes.map((note, idx) => (
                  <li key={idx}>{note}</li> 
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}