import React from 'react';
import { INVESTMENT_PLANS } from '../constants';
import { Check, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div id="plans" className="py-20 px-4 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum-accent blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Niveles de Acceso <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent to-purple-500">Quantum</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Nuestros servidores tienen capacidad limitada para garantizar la latencia cero.
            <br/>
            <span className="text-quantum-danger font-bold flex items-center justify-center gap-2 mt-2">
              <AlertTriangle className="h-4 w-4" />
              Alta demanda detectada. Los cupos se están agotando.
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {INVESTMENT_PLANS.map((plan, index) => {
            const isPopular = plan.id === 'pro';
            return (
              <div 
                key={plan.id}
                className={`relative group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2
                  ${isPopular 
                    ? 'bg-gradient-to-b from-quantum-800 to-quantum-900 border-2 border-quantum-accent shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                    : 'bg-quantum-900/50 border border-gray-800 hover:border-gray-600'
                  }
                `}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-quantum-accent text-quantum-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    MÁS RENTABLE
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                    <Cpu className={`h-5 w-5 ${isPopular ? 'text-quantum-accent' : 'text-gray-500'}`} />
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${plan.minInvestment}</span>
                    <span className="text-gray-500">Min. Depósito</span>
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400">Retorno Diario Estimado</p>
                    <p className={`text-xl font-bold ${isPopular ? 'text-quantum-success' : 'text-white'}`}>
                      {plan.dailyRoi}
                    </p>
                  </div>
                </div>

                <div className="mb-8 space-y-4">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-300">
                      <Check className="h-5 w-5 text-quantum-accent mr-3 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Capacidad del Servidor</span>
                    <span className={plan.spotsLeft < 20 ? 'text-quantum-danger font-bold' : 'text-quantum-success'}>
                      {plan.spotsLeft} cupos restantes
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${plan.spotsLeft < 20 ? 'bg-quantum-danger' : 'bg-quantum-accent'}`}
                      style={{ width: `${Math.max(10, 100 - (plan.spotsLeft * 2))}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/register')}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300
                  ${isPopular 
                    ? 'bg-quantum-accent text-quantum-900 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}>
                  COMENZAR AHORA
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