import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(1000);
  const [days, setDays] = useState(30);
  const dailyRate = 0.025; // 2.5% average

  const data = useMemo(() => {
    let currentBalance = investment;
    const chartData = [];
    for (let i = 0; i <= days; i++) {
      chartData.push({
        day: `Día ${i}`,
        balance: Math.round(currentBalance),
        profit: Math.round(currentBalance - investment)
      });
      currentBalance = currentBalance * (1 + dailyRate);
    }
    return chartData;
  }, [investment, days]);

  const finalProfit = data[data.length - 1].balance - investment;

  return (
    <div id="calculator" className="py-20 px-4 bg-gradient-to-b from-quantum-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Simulador de <span className="text-quantum-success">Ganancias Cuánticas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre el poder del interés compuesto diario. Nuestros bots nunca duermen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 glass-panel p-8 rounded-2xl border border-quantum-accent/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Inversión Inicial (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-quantum-accent" />
                </div>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="block w-full pl-10 pr-12 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-quantum-accent focus:border-transparent font-display text-lg"
                />
              </div>
              <input
                type="range"
                min="50"
                max="50000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full mt-4 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-quantum-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duración (Días)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-quantum-accent" />
                </div>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="block w-full pl-10 pr-12 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-quantum-accent focus:border-transparent font-display text-lg"
                />
              </div>
              <input
                type="range"
                min="1"
                max="365"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full mt-4 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-quantum-accent"
              />
            </div>

            <div className="bg-quantum-success/10 p-4 rounded-lg border border-quantum-success/30">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-400">Ganancia Estimada</p>
                  <p className="text-3xl font-bold text-quantum-success">+${finalProfit.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Retorno Total</p>
                  <p className="text-xl font-bold text-white">${(investment + finalProfit).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#06b6d4" fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-500 mt-2">
              *Proyección basada en rendimiento histórico de los últimos 90 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;