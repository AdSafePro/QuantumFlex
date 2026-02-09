import React, { useState } from 'react';
import { Menu, X, Activity, Lock, TrendingUp } from 'lucide-react';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-quantum-accent font-display font-bold text-xl flex items-center gap-2">
              <Activity className="h-6 w-6 animate-pulse" />
              {APP_NAME}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Tecnología</a>
              <a href="#plans" className="hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Bots Disponibles</a>
              <a href="#calculator" className="hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Calculadora</a>
              <button className="bg-quantum-accent/10 text-quantum-accent border border-quantum-accent/50 hover:bg-quantum-accent hover:text-white px-4 py-2 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Acceso Cliente
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden glass-panel">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Tecnología</a>
            <a href="#plans" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Bots</a>
            <button className="w-full text-left bg-quantum-accent text-white px-3 py-2 rounded-md text-base font-medium mt-4">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;