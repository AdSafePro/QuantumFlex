
import React, { useState } from 'react';
import { Menu, X, Activity, ChevronRight, LogIn, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleScroll = (id: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-panel border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 text-quantum-accent font-display font-bold text-xl flex items-center gap-2 z-50 relative">
                <Activity className="h-6 w-6 animate-pulse" />
                {APP_NAME}
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <button onClick={() => handleScroll('features')} className="text-gray-600 dark:text-gray-300 hover:text-quantum-accent dark:hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">Tecnología</button>
                <button onClick={() => handleScroll('plans')} className="text-gray-600 dark:text-gray-300 hover:text-quantum-accent dark:hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">Bots Disponibles</button>
                <button onClick={() => handleScroll('calculator')} className="text-gray-600 dark:text-gray-300 hover:text-quantum-accent dark:hover:text-quantum-accent px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">Calculadora</button>
                
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button 
                  onClick={() => navigate('/login')}
                  className="bg-quantum-accent/10 text-quantum-accent border border-quantum-accent/50 hover:bg-quantum-accent hover:text-white px-4 py-2 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer flex items-center gap-2"
                >
                  <LogIn size={16} /> Acceso Cliente
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden gap-2">
               <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none z-50 relative"
              >
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        <div 
          className={`absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white dark:bg-quantum-900 border-l border-gray-200 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
            <span className="text-gray-900 dark:text-white font-display font-bold text-lg">Menú</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
            <button onClick={() => handleScroll('features')} className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg group">
              Tecnología <ChevronRight size={16} className="text-gray-400 group-hover:text-quantum-accent" />
            </button>
            <button onClick={() => handleScroll('plans')} className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg group">
              Bots Disponibles <ChevronRight size={16} className="text-gray-400 group-hover:text-quantum-accent" />
            </button>
            <button onClick={() => handleScroll('calculator')} className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg group">
              Calculadora ROI <ChevronRight size={16} className="text-gray-400 group-hover:text-quantum-accent" />
            </button>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-3">
             <button 
                onClick={() => { setIsOpen(false); navigate('/login'); }}
                className="w-full bg-quantum-accent text-quantum-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                <LogIn size={18} /> Iniciar Sesión
              </button>
              <button 
                onClick={() => { setIsOpen(false); navigate('/register'); }}
                className="w-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                Crear Cuenta
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
