import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });

  // Urgency timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev;
          return { m: prev.m - 1, s: 59 };
        }
        return { ...prev, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-quantum-900 via-quantum-900 to-black"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-accent/10 border border-quantum-accent/30 text-quantum-accent text-sm font-bold mb-8 animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-quantum-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-quantum-accent"></span>
          </span>
          Sistema V3.0 Ahora Activo
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
          Arbitraje Cripto <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent via-white to-purple-500 neon-text">
            Sin Riesgo Humano
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
          Nuestros bots analizan 50+ exchanges por milisegundo para encontrar ineficiencias de precio y ejecutar ganancias instantáneas antes de que el mercado reaccione.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <button className="group relative px-8 py-4 bg-quantum-accent text-quantum-900 text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <div className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left"></div>
            <span className="relative flex items-center gap-2">
              INVERTIR AHORA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-400">La oferta de acceso temprano termina en:</span>
            <div className="font-mono text-2xl font-bold text-quantum-danger">
              00:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-panel p-6 rounded-xl transform hover:-translate-y-1 transition-transform duration-300">
            <Zap className="h-10 w-10 text-quantum-gold mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Velocidad Cuántica</h3>
            <p className="text-gray-400 text-sm">Ejecución en nanosegundos. Entramos y salimos antes que las ballenas.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl transform hover:-translate-y-1 transition-transform duration-300">
            <ShieldCheck className="h-10 w-10 text-quantum-success mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Capital Asegurado</h3>
            <p className="text-gray-400 text-sm">Fondo de garantía SAFU protege el 100% de tu depósito inicial.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl transform hover:-translate-y-1 transition-transform duration-300">
            <Globe className="h-10 w-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Cobertura Global</h3>
            <p className="text-gray-400 text-sm">Operamos en Asia, Europa y América simultáneamente para maximizar el spread.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;