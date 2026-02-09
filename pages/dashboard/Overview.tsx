import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, DollarSign, Activity, Clock } from 'lucide-react';
import LiveTicker from '../../components/LiveTicker';

const data = [
  { name: 'Lun', value: 4000 },
  { name: 'Mar', value: 4250 },
  { name: 'Mie', value: 4100 },
  { name: 'Jue', value: 4800 },
  { name: 'Vie', value: 5100 },
  { name: 'Sab', value: 5900 },
  { name: 'Dom', value: 6400 },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Panel de Control</h1>
          <p className="text-gray-400 text-sm">Bienvenido de nuevo. Tus bots han estado trabajando.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 rounded-full bg-quantum-success/10 text-quantum-success text-xs font-bold border border-quantum-success/20 flex items-center gap-1 animate-pulse">
             <div className="w-2 h-2 bg-quantum-success rounded-full"></div>
             SISTEMA OPERATIVO
           </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-quantum-accent relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <DollarSign size={64} />
          </div>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Saldo Total</p>
          <h3 className="text-2xl font-bold text-white mt-1">$12,450.32</h3>
          <p className="text-quantum-success text-xs flex items-center mt-2">
            <TrendingUp size={12} className="mr-1" /> +$342.50 (24h)
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-purple-500 relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <Activity size={64} />
          </div>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Bots Activos</p>
          <h3 className="text-2xl font-bold text-white mt-1">3 <span className="text-sm text-gray-500 font-normal">/ 5 Slots</span></h3>
          <p className="text-purple-400 text-xs mt-2">Próximo ciclo: 2m 15s</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-quantum-gold relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <Clock size={64} />
          </div>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Ganancia Pendiente</p>
          <h3 className="text-2xl font-bold text-white mt-1">$45.20</h3>
          <p className="text-gray-400 text-xs mt-2">Se acredita en 00:59:00</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-quantum-danger relative overflow-hidden group">
          <div className="bg-quantum-danger/10 absolute inset-0 animate-pulse-fast opacity-20"></div>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Oportunidades Perdidas</p>
          <h3 className="text-xl font-bold text-gray-300 mt-1">$1,204.00</h3>
          <p className="text-quantum-danger text-xs mt-2">Actualiza a Plan Whale</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-6">Rendimiento de Arbitraje (7 Días)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#06b6d4' }}
              />
              <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Ticker Inline */}
      <div className="glass-panel rounded-xl overflow-hidden border border-quantum-accent/20">
        <div className="bg-quantum-800 px-4 py-2 text-xs font-bold text-quantum-accent uppercase tracking-wider">
          Ejecuciones de Mercado en Vivo
        </div>
        <LiveTicker />
      </div>
    </div>
  );
};

export default Overview;