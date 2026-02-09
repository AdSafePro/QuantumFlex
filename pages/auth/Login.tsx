
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '../../constants';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      
      // ADMIN CHECK
      if (formData.username === 'admin' && formData.password === 'Millonarios2026**') {
        // Set a mock session flag
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        // Standard User Login
        localStorage.removeItem('isAdmin');
        navigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-quantum-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-quantum-accent/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-quantum-accent font-display font-bold text-2xl mb-2 hover:scale-105 transition-transform">
            <Activity className="h-8 w-8" />
            {APP_NAME}
          </Link>
          <h2 className="text-white text-xl font-bold">Acceso Seguro al Terminal</h2>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-t border-white/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Usuario / Email</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent focus:ring-1 focus:ring-quantum-accent outline-none transition-all"
                placeholder="inversor@quantum.io"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Contraseña</label>
                <a href="#" className="text-xs text-quantum-accent hover:text-white transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-quantum-accent focus:ring-1 focus:ring-quantum-accent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-quantum-accent text-quantum-900 font-bold py-3 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-quantum-900 border-t-transparent rounded-full animate-spin"></div>
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock size={18} /> INICIAR SESIÓN <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta? <Link to="/register" className="text-quantum-accent font-bold hover:underline">Solicitar Acceso</Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={14} className="text-quantum-success" />
          <span>Conexión Encriptada TLS 1.3 | Server Node: US-EAST-4</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
