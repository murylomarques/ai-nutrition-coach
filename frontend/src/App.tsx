import { DietGenerator } from './components/DietGenerator';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          AI Nutrition <span className="text-teal-600">Coach</span>
        </h1>
        <p className="text-slate-600 text-lg">
          Seu plano alimentar personalizado gerado por inteligência artificial.
        </p>
      </header>

      <main>
        <DietGenerator />
      </main>

      <footer className="max-w-4xl mx-auto mt-12 text-center text-slate-400 text-sm">
        <p>Desenvolvido como MVP de Portfólio • 2025</p>
      </footer>
    </div>
  )
}

export default App