import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-white">Historial de Transacciones</h1>
      
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 overflow-x-auto">
          <button className="px-4 py-2 bg-quantum-accent/10 text-quantum-accent rounded-lg text-sm font-bold whitespace-nowrap">Todas</button>
          <button className="px-4 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm font-bold whitespace-nowrap">Depósitos</button>
          <button className="px-4 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm font-bold whitespace-nowrap">Retiros</button>
          <button className="px-4 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm font-bold whitespace-nowrap">Rendimientos</button>
        </div>

        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 uppercase text-xs">
            <tr>
              <th className="p-4">Tipo</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Hash / ID</th>
              <th className="p-4">Fecha</th>
              <th className="p-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-quantum-success flex items-center gap-2">
                <ArrowDownLeft size={16} /> Depósito
              </td>
              <td className="p-4 text-white">USDT (TRC20) Funding</td>
              <td className="p-4 font-mono text-xs">8f3a...9c21</td>
              <td className="p-4">25 Oct, 10:30 AM</td>
              <td className="p-4 text-right text-quantum-success font-bold">+$5,000.00</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-quantum-accent flex items-center gap-2">
                <Activity size={16} /> Profit
              </td>
              <td className="p-4 text-white">Daily Arbitrage Yield</td>
              <td className="p-4 font-mono text-xs">System</td>
              <td className="p-4">26 Oct, 00:00 AM</td>
              <td className="p-4 text-right text-quantum-accent font-bold">+$125.50</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-quantum-danger flex items-center gap-2">
                <ArrowUpRight size={16} /> Retiro
              </td>
              <td className="p-4 text-white">Withdrawal to External</td>
              <td className="p-4 font-mono text-xs">Wait...</td>
              <td className="p-4">27 Oct, 09:15 AM</td>
              <td className="p-4 text-right text-white font-bold">-$500.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;