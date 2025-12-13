import { useState } from 'react';
import { DietGenerator } from './components/DietGenerator';
import { HistorySidebar } from './components/HistorySidebar';
import { History } from 'lucide-react';
import type { DietHistoryItem } from './types'; // Importando o tipo correto
 // Importando o tipo correto

function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<DietHistoryItem | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-900">
      
      {/* Botão Flutuante de Histórico (Canto Superior Direito) */}
      <button 
        onClick={() => setIsHistoryOpen(true)}
        className="fixed top-6 right-6 z-30 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-200 hover:shadow-xl transition-all font-semibold text-sm group"
      >
        <History size={18} className="group-hover:-rotate-12 transition-transform" />
        <span className="hidden md:inline">Histórico de Dietas</span>
      </button>

      <div className="py-12 px-4">
        <header className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            AI Nutrition <span className="text-teal-600">Coach</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Gere planos alimentares personalizados com inteligência artificial e mantenha seu histórico salvo.
          </p>
        </header>

        <main>
          {/* O Gerador recebe o histórico selecionado (se houver) */}
          <DietGenerator historyData={selectedHistory} />
        </main>

        <footer className="max-w-4xl mx-auto mt-16 text-center text-slate-400 text-sm border-t border-slate-200 pt-8">
          <p>© 2025 AI Nutrition Coach • Desenvolvido como MVP Enterprise</p>
        </footer>
      </div>

      {/* A Barra Lateral */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
        onSelect={(item) => setSelectedHistory(item)}
      />
    </div>
  )
}

export default App