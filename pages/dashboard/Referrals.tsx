import React, { useState } from 'react';
import { Users, Copy, Award, TrendingUp, Lock, Unlock, CheckCircle, AlertCircle, Zap, Activity, BarChart3 } from 'lucide-react';

const Referrals: React.FC = () => {
  // Simulación de estado del usuario (En backend esto vendría de la DB)
  // Configurado para: 
  // - Nivel 2: DESBLOQUEADO (Cumple activación y mantenimiento > $100)
  // - Nivel 3: BLOQUEADO POR MANTENIMIENTO (Cumple activación referidos, pero falla saldo propio < $200)
  // - Nivel 4: BLOQUEADO POR REQUISITOS (Faltan referidos o volumen)
  const [userStats] = useState({
    totalReferrals: 12, 
    hasActiveDeposit: true,
    totalEarnings: 3850,
    networkVolume: 45200, // Volumen total histórico
    directReferralsVolume: 850, // Volumen activo de referidos directos (Nivel 1)
    activeBotsValue: 150 // Valor en bots activos propios
  });

  // Helper para calcular progreso
  const calcProgress = (current: number, target: number) => Math.min(100, (current / target) * 100);

  // Lógica de Niveles Actualizada (8 Niveles)
  const levels = [
    {
      level: 1,
      percentage: 5,
      activationMet: true,
      maintenanceMet: true,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Nivel Base",
      maintenanceText: "Sin requisitos",
      description: "Comisión directa por referidos."
    },
    {
      level: 2,
      percentage: 4,
      // Activación: Depósito O (5 Refs + $200 Vol Refs)
      // Mantenimiento: > $100 Bots Propios
      activationMet: userStats.hasActiveDeposit || (userStats.totalReferrals >= 5 && userStats.directReferralsVolume >= 200),
      maintenanceMet: userStats.activeBotsValue > 100,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito O (5 Ref + $200 Vol)",
      maintenanceText: "> $100 Bots Propios",
      progress: Math.max(
        userStats.hasActiveDeposit ? 100 : 0, 
        (calcProgress(userStats.totalReferrals, 5) + calcProgress(userStats.directReferralsVolume, 200)) / 2
      ),
      description: "Expansión inicial de red."
    },
    {
      level: 3,
      percentage: 3,
      // Activación: Depósito Y (10 Refs + $500 Vol Refs)
      // Mantenimiento: > $200 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 10 && userStats.directReferralsVolume >= 500,
      maintenanceMet: userStats.activeBotsValue > 200,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (10 Ref + $500 Vol)",
      maintenanceText: "> $200 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 10) + calcProgress(userStats.directReferralsVolume, 500)) / 2 : 0,
      description: "Profundidad media."
    },
    {
      level: 4,
      percentage: 2,
      // Activación: Depósito Y (15 Refs + $3000 Vol Refs)
      // Mantenimiento: > $1000 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 15 && userStats.directReferralsVolume >= 3000,
      maintenanceMet: userStats.activeBotsValue > 1000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (15 Ref + $3k Vol)",
      maintenanceText: "> $1,000 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 15) + calcProgress(userStats.directReferralsVolume, 3000)) / 2 : 0,
      description: "Nivel de liderazgo."
    },
    {
      level: 5,
      percentage: 1,
      // Activación: Depósito Y (20 Refs + $10000 Vol Refs)
      // Mantenimiento: > $5000 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 20 && userStats.directReferralsVolume >= 10000,
      maintenanceMet: userStats.activeBotsValue > 5000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (20 Ref + $10k Vol)",
      maintenanceText: "> $5,000 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 20) + calcProgress(userStats.directReferralsVolume, 10000)) / 2 : 0,
      description: "Liderazgo Senior."
    },
    {
      level: 6,
      percentage: 1,
      // Activación: Depósito Y (30 Refs + $20000 Vol Refs)
      // Mantenimiento: > $10000 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 30 && userStats.directReferralsVolume >= 20000,
      maintenanceMet: userStats.activeBotsValue > 10000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (30 Ref + $20k Vol)",
      maintenanceText: "> $10,000 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 30) + calcProgress(userStats.directReferralsVolume, 20000)) / 2 : 0,
      description: "Director Regional."
    },
    {
      level: 7,
      percentage: 1,
      // Activación: Depósito Y (50 Refs + $50000 Vol Refs)
      // Mantenimiento: > $15000 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 50 && userStats.directReferralsVolume >= 50000,
      maintenanceMet: userStats.activeBotsValue > 15000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (50 Ref + $50k Vol)",
      maintenanceText: "> $15,000 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 50) + calcProgress(userStats.directReferralsVolume, 50000)) / 2 : 0,
      description: "Director Global."
    },
    {
      level: 8,
      percentage: 1,
      // Activación: Depósito Y (100 Refs + $100000 Vol Refs)
      // Mantenimiento: > $20000 Bots Propios
      activationMet: userStats.hasActiveDeposit && userStats.totalReferrals >= 100 && userStats.directReferralsVolume >= 100000,
      maintenanceMet: userStats.activeBotsValue > 20000,
      get isUnlocked() { return this.activationMet && this.maintenanceMet },
      requirementText: "Depósito Y (100 Ref + $100k Vol)",
      maintenanceText: "> $20,000 Bots Propios",
      progress: userStats.hasActiveDeposit ? (calcProgress(userStats.totalReferrals, 100) + calcProgress(userStats.directReferralsVolume, 100000)) / 2 : 0,
      description: "Socio Fundador."
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold text-white">Programa de Socios (8 Niveles)</h1>
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
             <p className="text-gray-400 text-xs font-bold uppercase">Tu Inversión Activa</p>
           </div>
           <p className="text-2xl font-bold text-white">${userStats.activeBotsValue}</p>
           <p className="text-[10px] text-gray-500">Req. para mantenimiento</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-quantum-success">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><BarChart3 size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Volumen Referidos (N1)</p>
           </div>
           <p className="text-2xl font-bold text-white">${userStats.directReferralsVolume.toLocaleString()}</p>
           <p className="text-[10px] text-gray-500">Req. para desbloqueo</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-quantum-accent">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-cyan-500/20 p-2 rounded-lg text-quantum-accent"><Award size={20} /></div>
             <p className="text-gray-400 text-xs font-bold uppercase">Comisiones Totales</p>
           </div>
           <p className="text-2xl font-bold text-quantum-accent">${userStats.totalEarnings.toLocaleString()}</p>
        </div>
      </div>

      {/* Level Progression System */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="text-quantum-gold" /> Mapa de Niveles y Requisitos
        </h3>
        
        <div className="grid gap-4">
          {levels.map((lvl) => (
            <div 
              key={lvl.level}
              className={`glass-panel p-4 md:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden
                ${lvl.isUnlocked 
                  ? 'border-quantum-accent/50 bg-quantum-accent/5' 
                  : 'border-white/5 bg-black/40'
                }
              `}
            >
              {/* Background numeral */}
              <div className="absolute -right-4 -bottom-8 text-8xl font-black opacity-5 pointer-events-none select-none">
                {lvl.level}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                
                {/* Level Info */}
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-2 shrink-0
                    ${lvl.isUnlocked 
                      ? 'bg-quantum-accent text-black border-quantum-accent' 
                      : 'bg-transparent text-gray-500 border-gray-600'}
                  `}>
                    {lvl.level}
                  </div>
                  <div>
                    <h4 className={`text-base md:text-lg font-bold flex flex-wrap items-center gap-2 ${lvl.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                      Nivel {lvl.level}
                      {lvl.isUnlocked ? (
                        <span className="text-[10px] md:text-xs bg-quantum-success/20 text-quantum-success px-2 py-0.5 rounded border border-quantum-success/30 flex items-center gap-1">
                          <Unlock size={10} /> ACTIVO
                        </span>
                      ) : (
                        <span className="text-[10px] md:text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded flex items-center gap-1">
                          <Lock size={10} /> BLOQUEADO
                        </span>
                      )}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-400">{lvl.description}</p>
                  </div>
                </div>

                {/* Requirements & Progress */}
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    {/* Activation Requirement */}
                   <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400 truncate pr-2" title={lvl.requirementText}>Req. Red: <span className="text-white font-medium">{lvl.requirementText}</span></span>
                          {lvl.activationMet ? <CheckCircle size={14} className="text-quantum-success shrink-0"/> : <span className="text-gray-500 text-[10px] shrink-0">Pendiente</span>}
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
                          <span className="text-gray-400 truncate pr-2" title={lvl.maintenanceText}>Mantenimiento: <span className="text-white font-medium">{lvl.maintenanceText}</span></span>
                          {lvl.maintenanceMet ? <CheckCircle size={14} className="text-quantum-success shrink-0"/> : <AlertCircle size={14} className="text-quantum-danger shrink-0"/>}
                      </div>
                      {!lvl.maintenanceMet && lvl.level > 1 && (
                          <p className="text-[10px] text-quantum-danger mt-1">
                             Saldo insuficiente (${userStats.activeBotsValue})
                          </p>
                      )}
                   </div>
                </div>

                {/* Reward Rate */}
                <div className="text-right min-w-[80px]">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Comisión</p>
                  <p className={`text-2xl md:text-3xl font-display font-bold ${lvl.isUnlocked ? 'text-quantum-success' : 'text-gray-600'}`}>
                    {lvl.percentage}%
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referrals;