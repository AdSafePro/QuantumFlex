
import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(1000);
  const [days, setDays] = useState(30);
  const dailyRate = 0.025; // 2.5% average
  const { t } = useLanguage();

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
    <div id="calculator" className="py-20 px-4 bg-gradient-to-b from-gray-200 to-gray-50 dark:from-quantum-900 dark:to-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
             {t('calc_title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             {t('calc_desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 glass-panel p-8 rounded-2xl border border-gray-200 dark:border-quantum-accent/20 shadow-lg dark:shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t('calc_input_inv')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-quantum-accent" />
                </div>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-quantum-accent focus:border-transparent font-display text-lg"
                />
              </div>
              <input
                type="range"
                min="50"
                max="50000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full mt-4 h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-quantum-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t('calc_input_days')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-quantum-accent" />
                </div>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-quantum-accent focus:border-transparent font-display text-lg"
                />
              </div>
              <input
                type="range"
                min="1"
                max="365"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full mt-4 h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-quantum-accent"
              />
            </div>

            <div className="bg-quantum-success/10 p-4 rounded-lg border border-quantum-success/30">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('calc_profit')}</p>
                  <p className="text-3xl font-bold text-quantum-success">+${finalProfit.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('calc_total')}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">${(investment + finalProfit).toLocaleString()}</p>
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
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#06b6d4" fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-500 mt-2">
              {t('calc_disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
