import React, { useState } from 'react';
import { Users, Copy, Award, TrendingUp, Lock, Unlock, CheckCircle, AlertCircle, Zap, Activity } from 'lucide-react';

const Referrals: React.FC = () => {
  // Simulación de estado del usuario (En backend esto vendría de la DB)
  // Configurado para mostrar: Nivel 2 desbloqueado, Nivel 3 bloqueado por mantenimiento (bots value), Nivel 4 bloqueado por referidos.
  const [userStats] = useState({
    totalReferrals: 12, 
    hasActiveDeposit: true,
    totalEarnings: 3850,
    networkVolume: 45200,
    activeBotsValue: 150 // Valor en bots activos (Simulación)
  });

  // Helper para calcular progreso
  const calcProgress = (current: number, target: number) => Math.min(100, (current / target) * 100);

  // Lógica de Niveles Actualizada
  const levels = [
    {
      level: 1,
      percentage: 7,
      isUnlocked: true, // Siempre activo
      activationMet: true,
      maintenanceMet: true,
      requirementText: "Nivel Base",
      maintenanceText: "Sin requisitos",
      description: "Comisión directa por referidos."
    },
    {
      level: 2,
      percentage: 3,
      // Se activa al usuario hacer al menos un depósito o tener 5 usuarios
      // Mantenimiento: > 50 USD en Bots activos
      activationMet: userStats.hasActiveDeposit || userStats.totalReferrals >= 5,
      maintenanceMet: userStats.activeBotsValue > 50,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Activo O 5 Referidos",
      maintenanceText: "> $50 en Bots Activos",
      progress: calcProgress(userStats.totalReferrals, 5),
      description: "Expande tus ganancias al segundo nivel."
    },
    {
      level: 3,
      percentage: 2, // Actualizado a 2%
      // Se activa al usuario hacer al menos un depósito y tener 10 usuarios
      // Mantenimiento: > 200 USD en Bots activos
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 10,
      maintenanceMet: userStats.activeBotsValue > 200,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y 10 Referidos",
      maintenanceText: "> $200 en Bots Activos",
      progress: userStats.hasActiveDeposit ? calcProgress(userStats.totalReferrals, 10) : 0,
      description: "Ingresos residuales de profundidad media."
    },
    {
      level: 4,
      percentage: 1, // Actualizado a 1%
      // Se activa al usuario hacer al menos un depósito y tener 15 usuarios
      // Mantenimiento: > 1000 USD en Bots activos
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 15,
      maintenanceMet: userStats.activeBotsValue > 1000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y 15 Referidos",
      maintenanceText: "> $1,000 en Bots Activos",
      progress: userStats.hasActiveDeposit ? calcProgress(userStats.totalReferrals, 15) : 0,
      description: "Nivel de liderazgo avanzado."
    },
    {
      level: 5,
      percentage: 0.5,
      // Se activa al usuario hacer al menos un depósito y tener 20 usuarios
      // Mantenimiento: > 5000 USD en Bots activos
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 20,
      maintenanceMet: userStats.activeBotsValue > 5000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y 20 Referidos",
      maintenanceText: "> $5,000 en Bots Activos",
      progress: userStats.hasActiveDeposit ? calcProgress(userStats.totalReferrals, 20) : 0,
      description: "Máxima profundidad de red."
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold text-white">Programa de Socios Multinivel</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-quantum-accent/10 border border-quantum-accent/20 rounded-full">
           <div className={`w-3 h-3 rounded-full ${userStats.hasActiveDeposit ? 'bg-quantum-success' : 'bg-gray-500'}`}></div>
           <span className="text-xs font-bold text-quantum-accent">
             {userStats.hasActiveDeposit ? 'CUENTA ACTIVA' : 'CUENTA INACTIVA'}
           </span>
        </div>
      </div>
      
      {/* Link Section */}
      <div className="glass-panel p-8 rounded-xl text-center border border-quantum-accent/30 bg-gradient-to-b from-quantum-900 to-black shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <h2 className="text-xl text-white mb-2 font-display">Tu Enlace Cuántico de Invitación</h2>
        <p className="text-gray-400 text-sm mb-6">Comparte este enlace para construir tu red de nodos de arbitraje.</p>
        
        <div className="max-w-2xl mx-auto flex gap-2">
          <input 
            type="text" 
            readOnly 
            value="https://quantumflex.io/ref/USER992" 
            className="flex-1 bg-black/50 border border-quantum-accent/50 rounded-lg px-4 py-3 text-quantum-accent font-mono text-sm focus:outline-none focus:ring-2 focus:ring-quantum-accent"
          />
          <button className="bg-quantum-accent text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-lg hover:shadow-quantum-accent/50">
            <Copy size={18} /> <span className="hidden sm:inline">Copiar</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-blue-500">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Users size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Socios Directos</p>
           </div>
           <p className="text-2xl font-bold text-white">{userStats.totalReferrals}</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-purple-500">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Zap size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Valor Bots Activos</p>
           </div>
           <p className="text-2xl font-bold text-white">${userStats.activeBotsValue}</p>
           <p className="text-[10px] text-gray-500">Clave para desbloquear niveles</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-quantum-success">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><TrendingUp size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Volumen Red</p>
           </div>
           <p className="text-2xl font-bold text-white">${userStats.networkVolume.toLocaleString()}</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-quantum-accent">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-cyan-500/20 p-2 rounded-lg text-quantum-accent"><Award size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Comisiones</p>
           </div>
           <p className="text-2xl font-bold text-quantum-accent">${userStats.totalEarnings.toLocaleString()}</p>
        </div>
      </div>

      {/* Level Progression System */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="text-quantum-gold" /> Estructura de Niveles & Requisitos
        </h3>
        
        <div className="grid gap-4">
          {levels.map((lvl) => (
            <div 
              key={lvl.level}
              className={`glass-panel p-6 rounded-xl border transition-all duration-300 relative overflow-hidden
                ${lvl.isUnlocked 
                  ? 'border-quantum-accent/50 bg-quantum-accent/5' 
                  : 'border-white/5 bg-black/40'
                }
              `}
            >
              {/* Background numeral */}
              <div className="absolute -right-4 -bottom-8 text-9xl font-black opacity-5 pointer-events-none select-none">
                {lvl.level}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                
                {/* Level Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2
                    ${lvl.isUnlocked 
                      ? 'bg-quantum-accent text-black border-quantum-accent' 
                      : 'bg-transparent text-gray-500 border-gray-600'}
                  `}>
                    {lvl.level}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold flex items-center gap-2 ${lvl.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                      Nivel {lvl.level}
                      {lvl.isUnlocked ? (
                        <span className="text-xs bg-quantum-success/20 text-quantum-success px-2 py-0.5 rounded border border-quantum-success/30 flex items-center gap-1">
                          <Unlock size={10} /> ACTIVO
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded flex items-center gap-1">
                          <Lock size={10} /> BLOQUEADO
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-400">{lvl.description}</p>
                  </div>
                </div>

                {/* Requirements & Progress */}
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                    {/* Activation Requirement */}
                   <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Activación: <span className="text-white font-medium">{lvl.requirementText}</span></span>
                          {lvl.activationMet ? <CheckCircle size={14} className="text-quantum-success"/> : <span className="text-gray-500 text-[10px]">Pendiente</span>}
                      </div>
                      {lvl.level > 1 && !lvl.activationMet && (
                         <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-2">
                           <div 
                              className="bg-blue-500 h-full transition-all duration-500" 
                              style={{ width: `${lvl.progress || 0}%` }}
                            ></div>
                         </div>
                      )}
                   </div>

                   {/* Maintenance Requirement */}
                   <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Mantenimiento: <span className="text-white font-medium">{lvl.maintenanceText}</span></span>
                          {lvl.maintenanceMet ? <CheckCircle size={14} className="text-quantum-success"/> : <AlertCircle size={14} className="text-quantum-danger"/>}
                      </div>
                      {!lvl.maintenanceMet && lvl.level > 1 && (
                          <p className="text-[10px] text-quantum-danger mt-1">
                             Tu saldo en bots (${userStats.activeBotsValue}) es insuficiente.
                          </p>
                      )}
                   </div>
                </div>

                {/* Reward Rate */}
                <div className="text-right min-w-[100px]">
                  <p className="text-xs text-gray-500 uppercase font-bold">Comisión</p>
                  <p className={`text-3xl font-display font-bold ${lvl.isUnlocked ? 'text-quantum-success' : 'text-gray-600'}`}>
                    {lvl.percentage}%
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10">
         <h3 className="text-lg font-bold text-white mb-4">Últimos Registros en tu Red</h3>
         <div className="glass-panel rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
               <thead className="bg-white/5 text-gray-200 uppercase text-xs">
                  <tr>
                     <th className="p-4">Usuario</th>
                     <th className="p-4">Nivel</th>
                     <th className="p-4">Fecha</th>
                     <th className="p-4">Estado</th>
                     <th className="p-4 text-right">Tu Comisión</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                     <td className="p-4">CryptoKing88</td>
                     <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">Nivel 1</span></td>
                     <td className="p-4">Hace 2 horas</td>
                     <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs">Activo</span></td>
                     <td className="p-4 text-right text-quantum-success font-bold">+$70.00</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                     <td className="p-4">Investor_Pro</td>
                     <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">Nivel 1</span></td>
                     <td className="p-4">Hace 5 horas</td>
                     <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs">Activo</span></td>
                     <td className="p-4 text-right text-quantum-success font-bold">+$35.50</td>
                  </tr>
                  {/* Ejemplo de nivel bloqueado que generaría ingresos si estuviera activo */}
                  <tr className="hover:bg-white/5 transition-colors opacity-50">
                     <td className="p-4">DeepNetworkUser (Referido de CryptoKing88)</td>
                     <td className="p-4"><span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs border border-purple-500/30">Nivel 2</span></td>
                     <td className="p-4">Ayer</td>
                     <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs">Activo</span></td>
                     <td className="p-4 text-right text-quantum-success font-bold">$12.50</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default Referrals;