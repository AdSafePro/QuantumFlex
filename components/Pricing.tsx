
import React from 'react';
import { INVESTMENT_PLANS } from '../constants';
import { Check, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div id="plans" className="py-20 px-4 bg-gray-50 dark:bg-black relative transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum-accent blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            {t('pricing_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent to-purple-500">Quantum</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t('pricing_desc')}
            <br/>
            <span className="text-quantum-danger font-bold flex items-center justify-center gap-2 mt-2">
              <AlertTriangle className="h-4 w-4" />
              {t('pricing_alert')}
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {INVESTMENT_PLANS.map((plan, index) => {
            const isPopular = plan.id === 'pro';
            const spotsLeft = plan.dailyLimit - plan.consumed;

            // Resolve localized plan name
            const localizedName = t(`plan_${plan.id}`) !== `plan_${plan.id}` ? t(`plan_${plan.id}`) : plan.name;

            return (
              <div 
                key={plan.id}
                className={`relative group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2
                  ${isPopular 
                    ? 'bg-white dark:bg-gradient-to-b dark:from-quantum-800 dark:to-quantum-900 border-2 border-quantum-accent shadow-xl dark:shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                    : 'bg-white dark:bg-quantum-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 shadow-md'
                  }
                `}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-quantum-accent text-quantum-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse whitespace-nowrap">
                    {t('plan_most_popular')}
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Cpu className={`h-5 w-5 ${isPopular ? 'text-quantum-accent' : 'text-gray-500'}`} />
                    {localizedName}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.minInvestment}</span>
                    <span className="text-gray-500">{t('plan_min_dep')}</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('plan_daily_roi')}</p>
                    <p className={`text-xl font-bold ${isPopular ? 'text-quantum-success' : 'text-gray-900 dark:text-white'}`}>
                      {plan.dailyRoi}
                    </p>
                  </div>
                </div>

                <div className="mb-8 space-y-4">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check className="h-5 w-5 text-quantum-accent mr-3 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{t('plan_server_cap')}</span>
                    <span className={spotsLeft < 20 ? 'text-quantum-danger font-bold' : 'text-quantum-success'}>
                      {spotsLeft} {t('plan_spots_left')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${spotsLeft < 20 ? 'bg-quantum-danger' : 'bg-quantum-accent'}`}
                      style={{ width: `${Math.max(10, 100 - (spotsLeft * 2))}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/register')}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300
                  ${isPopular 
                    ? 'bg-quantum-accent text-quantum-900 hover:bg-cyan-300 dark:hover:bg-white dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] shadow-lg' 
                    : 'bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-800 dark:hover:bg-white/20'
                  }
                `}>
                  {t('plan_btn')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
