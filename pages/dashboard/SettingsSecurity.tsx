import React from 'react';
import { Shield, Lock, Smartphone, Mail, Save } from 'lucide-react';

const SettingsSecurity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-display font-bold text-white">Seguridad & Configuración</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail size={18} className="text-quantum-accent" /> Perfil
          </h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Registrado</label>
            <input type="email" value="investor@quantumflex.io" readOnly className="w-full bg-black/50 border border-gray-700 rounded p-2 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre de Usuario</label>
            <input type="text" defaultValue="AlphaInvestor" className="w-full bg-black/50 border border-gray-600 rounded p-2 text-white focus:border-quantum-accent outline-none" />
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2">
            <Save size={16} /> Guardar Cambios
          </button>
        </div>

        {/* 2FA Section */}
        <div className="glass-panel p-6 rounded-xl space-y-4 border border-quantum-success/20">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Smartphone size={18} className="text-quantum-success" /> Autenticación 2FA
          </h2>
          <p className="text-sm text-gray-400">
            Protege tu cuenta utilizando Google Authenticator. Los retiros requieren obligatoriamente 2FA.
          </p>
          <div className="bg-quantum-success/10 p-4 rounded-lg flex items-center justify-between">
            <span className="text-quantum-success font-bold text-sm">Estado: ACTIVO</span>
            <button className="text-xs bg-black/30 hover:bg-black/50 text-white px-3 py-1 rounded">Desactivar</button>
          </div>
        </div>

        {/* Password Change */}
        <div className="glass-panel p-6 rounded-xl space-y-4 md:col-span-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={18} className="text-quantum-danger" /> Cambiar Contraseña
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input type="password" placeholder="Contraseña Actual" className="bg-black/50 border border-gray-600 rounded p-3 text-white outline-none focus:border-quantum-danger" />
            <input type="password" placeholder="Nueva Contraseña" className="bg-black/50 border border-gray-600 rounded p-3 text-white outline-none focus:border-quantum-danger" />
            <input type="password" placeholder="Confirmar Contraseña" className="bg-black/50 border border-gray-600 rounded p-3 text-white outline-none focus:border-quantum-danger" />
          </div>
          <button className="bg-quantum-danger hover:bg-red-600 text-white px-6 py-2 rounded font-bold transition-colors">
            Actualizar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSecurity;