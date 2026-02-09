import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-quantum-accent font-display font-bold text-2xl mb-4">{APP_NAME}</p>
        <p className="text-gray-500 text-sm mb-8">
          Inversión de alto riesgo/recompensa. Los rendimientos pasados no garantizan resultados futuros.
          <br/>
          QuantumFlex opera bajo jurisdicción descentralizada.
        </p>
        <div className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} {APP_NAME} Technologies. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;