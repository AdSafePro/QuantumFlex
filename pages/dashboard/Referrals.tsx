import React from 'react';
import { Users, Copy, Award, TrendingUp } from 'lucide-react';

const Referrals: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-white">Programa de Socios</h1>
      
      <div className="glass-panel p-8 rounded-xl text-center border border-quantum-accent/30 bg-gradient-to-b from-quantum-900 to-black">
        <h2 className="text-xl text-white mb-2">Tu Enlace Único de Invitación</h2>
        <p className="text-gray-400 text-sm mb-6">Gana hasta un 12% de las inversiones de tus referidos directos.</p>
        
        <div className="max-w-2xl mx-auto flex gap-2">
          <input 
            type="text" 
            readOnly 
            value="https://quantumflex.io/ref/USER992" 
            className="flex-1 bg-black/50 border border-quantum-accent/50 rounded-lg px-4 py-3 text-quantum-accent font-mono text-sm"
          />
          <button className="bg-quantum-accent text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors flex items-center gap-2">
            <Copy size={18} /> Copiar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Users size={20} /></div>
             <p className="text-gray-400 text-sm">Total Referidos</p>
           </div>
           <p className="text-3xl font-bold text-white">142</p>
        </div>
        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><TrendingUp size={20} /></div>
             <p className="text-gray-400 text-sm">Volumen de Equipo</p>
           </div>
           <p className="text-3xl font-bold text-white">$45,200</p>
        </div>
        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Award size={20} /></div>
             <p className="text-gray-400 text-sm">Comisiones Ganadas</p>
           </div>
           <p className="text-3xl font-bold text-quantum-accent">$3,850</p>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mt-4">Últimos Registros</h3>
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 uppercase text-xs">
            <tr>
              <th className="p-4">Usuario</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Inversión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4">CryptoKing{i}**</td>
                <td className="p-4">Hace {i} horas</td>
                <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs">Activo</span></td>
                <td className="p-4 text-right text-white font-mono">$1,000.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referrals;