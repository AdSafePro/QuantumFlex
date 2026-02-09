import React from 'react';
import { INVESTMENT_PLANS } from '../../constants';
import { Play, Pause, AlertTriangle, Battery } from 'lucide-react';

const MyBots: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-white">Gestión de Bots</h1>
        <button className="bg-quantum-accent text-quantum-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
          + Contratar Nuevo Nodo
        </button>
      </div>

      {/* Active Bots */}
      <h2 className="text-lg font-bold text-gray-300 mt-8 mb-4">Bots Activos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-6 rounded-xl border border-quantum-success/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-quantum-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-quantum-success"></span>
            </span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Quantum Arbitrage V2</h3>
              <p className="text-xs text-gray-400">ID: #BOT-8842-X</p>
            </div>
            <div className="bg-quantum-800 p-2 rounded-lg">
               <Battery className="text-quantum-success" size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/30 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Beneficio Total</p>
              <p className="text-lg font-bold text-quantum-success">+$1,240.50</p>
            </div>
            <div className="bg-black/30 p-3 rounded-lg">
              <p className="text-gray-500 text-xs">Tiempo Activo</p>
              <p className="text-lg font-bold text-white">14d 2h</p>
            </div>
          </div>

          <div className="flex gap-2">
             <button className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-lg font-medium hover:bg-red-500/20 flex items-center justify-center gap-2">
               <Pause size={16} /> Pausar
             </button>
             <button className="flex-1 bg-quantum-accent/10 text-quantum-accent py-2 rounded-lg font-medium border border-quantum-accent/20 cursor-not-allowed opacity-50 flex items-center justify-center gap-2">
               Configurar
             </button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className="text-lg font-bold text-gray-300 mt-8 mb-4">Mercado de Algoritmos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INVESTMENT_PLANS.map((plan) => (
          <div key={plan.id} className="glass-panel p-6 rounded-xl border border-gray-700 hover:border-quantum-accent/50 transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold text-quantum-accent mb-4">${plan.minInvestment} <span className="text-sm text-gray-500 font-normal">min</span></p>
            
            <div className="space-y-2 mb-6">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400">ROI Diario</span>
                 <span className="text-white font-bold">{plan.dailyRoi}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400">Riesgo</span>
                 <span className={plan.riskLevel === 'Alto' ? 'text-quantum-danger' : 'text-quantum-success'}>{plan.riskLevel}</span>
               </div>
            </div>

            <div className="mb-4">
               <div className="flex justify-between text-xs text-gray-400 mb-1">
                 <span>Disponibilidad</span>
                 <span className="text-quantum-danger">{plan.spotsLeft} left</span>
               </div>
               <div className="w-full bg-gray-700 h-1 rounded-full">
                 <div className="bg-quantum-danger h-1 rounded-full" style={{ width: '85%' }}></div>
               </div>
            </div>

            <button className="w-full bg-white/10 hover:bg-quantum-accent hover:text-black text-white py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
              <Play size={16} /> Activar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBots;