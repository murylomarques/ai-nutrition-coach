import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, Clock, ChevronRight } from 'lucide-react';
import type { DietHistoryItem } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: DietHistoryItem) => void;
}

export function HistorySidebar({ isOpen, onClose, onSelect }: HistorySidebarProps) {
  const [history, setHistory] = useState<DietHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Busca o histórico sempre que a sidebar abre
  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay Escuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Painel Lateral */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Clock size={20} className="text-teal-600" /> Histórico
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {loading && <p className="text-center text-slate-400 py-4">Carregando...</p>}
            
            {!loading && history.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                <p>Nenhuma dieta salva ainda.</p>
              </div>
            )}

            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="group p-4 border border-slate-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{item.plan_title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(item.created_at).toLocaleDateString('pt-BR')} às {new Date(item.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-600" />
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                    🔥 {item.calories_total} kcal
                  </span>
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                    🥩 {item.protein_total}g Prot
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}