import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, UserPlus, ArrowRight, AlertTriangle } from 'lucide-react';
import { APP_NAME } from '../../constants';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call - Reduced time
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-quantum-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-quantum-accent/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-quantum-accent font-display font-bold text-2xl mb-2 hover:scale-105 transition-transform">
            <Activity className="h-8 w-8" />
            {APP_NAME}
          </Link>
          <h2 className="text-white text-xl font-bold">Solicitud de Alta Nueva</h2>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-t border-white/20 shadow-2xl relative">
          {/* Urgency Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-quantum-danger text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <AlertTriangle size={12} /> Solo 3 cupos disponibles hoy
          </div>

          <form onSubmit={handleRegister} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Código de Invitación</label>
              <input 
                type="text" 
                value="VIP-ACCESS-2024"
                readOnly
                className="w-full bg-quantum-accent/10 border border-quantum-accent/50 rounded-lg px-4 py-3 text-quantum-accent font-mono text-center font-bold outline-none cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                <input type="text" required className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent outline-none" placeholder="Juan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Apellido</label>
                <input type="text" required className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent outline-none" placeholder="Pérez" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent outline-none"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Contraseña</label>
              <input 
                type="password" 
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-2 text-xs text-gray-400 mt-2">
              <input type="checkbox" required className="mt-1 accent-quantum-accent" />
              <p>Acepto los Términos de Servicio y entiendo los riesgos asociados con el arbitraje de criptomonedas de alta frecuencia.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Creando cuenta...' : (
                <>
                  <UserPlus size={18} /> CREAR CUENTA GRATUITA
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya eres socio? <Link to="/login" className="text-quantum-accent font-bold hover:underline">Ingresar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;