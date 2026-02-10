
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveTicker from '../components/LiveTicker';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-quantum-900 text-gray-900 dark:text-white font-sans selection:bg-quantum-accent selection:text-quantum-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      
      {/* Spacer / Separator */}
      <div className="py-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-quantum-900 border-t border-gray-200 dark:border-white/5 transition-colors">
         <LiveTicker />
      </div>

      <div id="features" className="py-20 bg-gray-100 dark:bg-quantum-900 transition-colors">
         <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">¿Por qué los bancos no quieren que sepas esto?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              El arbitraje financiero ha sido exclusivo de Wall Street durante décadas. 
              <span className="text-quantum-accent font-bold"> QuantumFlex</span> democratiza este acceso usando IA para encontrar brechas que los humanos no pueden ver.
              Mientras tú duermes, tu dinero trabaja a la velocidad de la luz.
            </p>
         </div>
      </div>
      <Pricing />
      <ROICalculator />
      <div className="bg-quantum-accent/10 py-16 text-center border-y border-quantum-accent/20">
        <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-4">No dejes que la inflación devore tus ahorros</h3>
        <button 
          onClick={() => navigate('/register')}
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
        >
          Crear Cuenta Gratuita
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
