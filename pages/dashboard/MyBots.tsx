
import React, { useState, useEffect } from 'react';
import { INVESTMENT_PLANS, STAKING_TIERS } from '../../constants';
import { Plan, BotModeConfig } from '../../types';
import { Play, Pause, AlertTriangle, Lock, Zap, Server, Info, X, Clock, DollarSign, CheckCircle, Timer } from 'lucide-react';

interface ActiveBot {
  id: string;
  planId: string;
  name: string;
  investment: number;
  profit: number;
  mode: 'standard' | 'semi' | 'perp';
  startTime: number;
  endTime: number;
  lastPayout: number;
  nextPayout: number;
  roiRange: string;
}

const MyBots: React.FC = () => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [balance, setBalance] = useState(12450.32);
  
  // ACTIVATION MODAL STATE
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedMode, setSelectedMode] = useState<BotModeConfig | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtraSlotPurchase, setIsExtraSlotPurchase] = useState(false);

  // COUNTDOWN STATE
  const [timeToReset, setTimeToReset] = useState<string>('');

  // MOCK ACTIVE BOTS
  const [activeBots, setActiveBots] = useState<ActiveBot[]>([
    { 
      id: 'b1', 
      planId: 'starter', 
      name: 'Bot Iniciante', 
      investment: 250, 
      profit: 4.5, 
      mode: 'standard', 
      startTime: Date.now() - (1000 * 60 * 60), 
      endTime: Date.now() + (1000 * 60 * 60 * 2), 
      lastPayout: Date.now() - (1000 * 60 * 60),
      nextPayout: Date.now() + (1000 * 60 * 60 * 2), 
      roiRange: '0.10% - 0.30%'
    },
    { 
      id: 'b2', 
      planId: 'pro', 
      name: 'Quantum V2', 
      investment: 1000, 
      profit: 145.00, 
      mode: 'perp', 
      startTime: Date.now() - (1000 * 60 * 60 * 24 * 5),
      endTime: Date.now() + (1000 * 60 * 60 * 24 * 25),
      lastPayout: Date.now() - (1000 * 60 * 10), 
      nextPayout: Date.now() + (1000 * 60 * 60 * 2.8),
      roiRange: '0.50% - 0.70%'
    }
  ]);

  // UPDATE TIMERS (Clock & Reset Countdown)
  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const updateTimers = () => {
      setNow(Date.now());

      // Calculate time to next 12:00 PM NY Time
      const now = new Date();
      // Get current time in NY
      const nyTimeString = now.toLocaleString("en-US", {timeZone: "America/New_York"});
      const nyDate = new Date(nyTimeString);
      
      const nextReset = new Date(nyDate);
      nextReset.setHours(12, 0, 0, 0);
      
      // If it's already past 12 PM in NY, target tomorrow 12 PM
      if (nyDate > nextReset) {
        nextReset.setDate(nextReset.getDate() + 1);
      }

      const diff = nextReset.getTime() - nyDate.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeToReset(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const interval = setInterval(updateTimers, 1000);
    updateTimers(); // Initial call
    return () => clearInterval(interval);
  }, []);

  // CALCULATE SLOTS
  const getCurrentSlots = (amount: number) => {
    const tier = [...STAKING_TIERS].reverse().find(t => amount >= t.amount);
    return tier ? tier.slots : 5;
  };
  const totalSlots = getCurrentSlots(stakedAmount);
  const usedSlots = activeBots.length;
  const freeSlots = totalSlots - usedSlots;
  const nextTier = STAKING_TIERS.find(t => t.amount > stakedAmount);

  // HANDLERS
  const openActivationModal = (plan: Plan, isExtra: boolean = false) => {
    setSelectedPlan(plan);
    setSelectedMode(plan.modes[0]); 
    setInvestmentAmount(plan.minInvestment.toString());
    setIsExtraSlotPurchase(isExtra);
    setIsModalOpen(true);
  };

  const closeActivationModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setSelectedMode(null);
    setIsExtraSlotPurchase(false);
  };

  const handleActivate = () => {
    if (!selectedPlan || !selectedMode) return;
    
    const amount = Number(investmentAmount);
    const modeCost = selectedMode.activationCost;
    const extraCost = isExtraSlotPurchase ? selectedPlan.extraSlotCost : 0;
    const totalCost = amount + modeCost + extraCost;

    if (amount < selectedPlan.minInvestment || amount > selectedPlan.maxInvestment) {
      alert(`La inversión debe estar entre $${selectedPlan.minInvestment} y $${selectedPlan.maxInvestment}`);
      return;
    }

    if (totalCost > balance) {
      alert("Saldo insuficiente");
      return;
    }

    // Create new bot
    const newBot: ActiveBot = {
      id: `bot-${Date.now()}`,
      planId: selectedPlan.id,
      name: selectedPlan.name,
      investment: amount,
      profit: 0,
      mode: selectedMode.id,
      startTime: Date.now(),
      endTime: Date.now() + (selectedMode.durationHours * 60 * 60 * 1000),
      lastPayout: Date.now(),
      nextPayout: Date.now() + (3 * 60 * 60 * 1000),
      roiRange: selectedMode.roiLabel
    };

    setActiveBots([...activeBots, newBot]);
    setBalance(prev => prev - totalCost);
    closeActivationModal();
  };

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return "Finalizado";
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-8 pb-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-display font-bold text-white">Gestión de Nodos & Slots</h1>
           <p className="text-gray-400 text-sm">Gestiona tu capacidad de cómputo y aumenta tus slots mediante Staking.</p>
        </div>
        <button 
           onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth'})}
           className="bg-quantum-accent text-quantum-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          + Contratar Nuevo Nodo
        </button>
      </div>

      {/* STAKING & SLOTS SYSTEM (Visuals Only) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Slot Visualization */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-quantum-accent/20 relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Server className="text-quantum-accent" /> Capacidad del Servidor
              </h2>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300 border border-gray-700">
                 {usedSlots} / {totalSlots} Slots Usados
              </span>
           </div>

           <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, index) => {
                 const slotNum = index + 1;
                 const isActive = index < usedSlots;
                 const isUnlocked = slotNum <= totalSlots;
                 const isLocked = !isUnlocked;
                 
                 return (
                    <div 
                      key={index} 
                      className={`
                        aspect-square rounded-lg border flex flex-col items-center justify-center relative group
                        ${isActive 
                           ? 'bg-quantum-success/10 border-quantum-success shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                           : isLocked 
                              ? 'bg-black/40 border-gray-800 opacity-50' 
                              : 'bg-quantum-accent/5 border-quantum-accent/30 border-dashed'
                        }
                      `}
                    >
                       {isActive ? (
                          <>
                             <div className="w-2 h-2 rounded-full bg-quantum-success absolute top-2 right-2 animate-pulse"></div>
                             <Zap size={20} className="text-quantum-success mb-1" />
                             <span className="text-[10px] font-bold text-white">RUNNING</span>
                          </>
                       ) : isLocked ? (
                          <>
                             <Lock size={18} className="text-gray-600 mb-1" />
                             <span className="text-[10px] text-gray-600">LOCKED</span>
                          </>
                       ) : (
                          <>
                             <span className="text-xs text-quantum-accent/50 font-mono">VACÍO</span>
                             <span className="text-[9px] text-gray-500">Slot #{slotNum}</span>
                          </>
                       )}
                    </div>
                 );
              })}
           </div>
        </div>

        {/* Staking Controls */}
        <div className="glass-panel p-6 rounded-xl border border-purple-500/20 bg-gradient-to-b from-quantum-900 to-purple-900/20">
           <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Zap className="text-purple-500" /> Stake & Upgrade
           </h2>

           <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                 <span>Stake Actual</span>
                 <span className="text-white font-bold">${stakedAmount} USD</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                 <div 
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${(stakedAmount / 10000) * 100}%` }}
                 ></div>
              </div>
              <p className="text-xs text-purple-400 mt-2 flex items-center gap-1">
                 Retorno Fijo del 1% Diario sobre Stake
              </p>
           </div>

           <div className="space-y-4">
              <label className="text-sm text-gray-300">Aumentar Stake</label>
              <input 
                 type="range" 
                 min="0" 
                 max="10000" 
                 step="100"
                 value={stakedAmount}
                 onChange={(e) => setStakedAmount(Number(e.target.value))}
                 className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 font-mono">
                 <span>$0</span>
                 <span>$10k</span>
              </div>
           </div>

           {nextTier && (
              <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                 <p className="text-xs text-gray-400">Próximo desbloqueo:</p>
                 <p className="text-sm font-bold text-white">Slot #{nextTier.slots}</p>
                 <p className="text-xs text-quantum-accent">Requiere ${nextTier.amount} Stake Total</p>
              </div>
           )}
        </div>
      </div>

      {/* ACTIVE BOTS LIST */}
      <h2 className="text-lg font-bold text-gray-300 mt-8 mb-4 border-b border-gray-800 pb-2">Bots Operando Actualmente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeBots.map((bot) => {
          const cycleDuration = 3 * 60 * 60 * 1000;
          const timeSincePayout = now - bot.lastPayout;
          const progressPercent = Math.min(100, (timeSincePayout / cycleDuration) * 100);
          
          return (
           <div key={bot.id} className="glass-panel p-5 rounded-xl border border-quantum-success/30 relative group">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-white">{bot.name}</h3>
                 <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase
                   ${bot.mode === 'standard' ? 'bg-gray-700 text-gray-300' : 
                     bot.mode === 'semi' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}
                 `}>
                   {bot.mode === 'standard' ? 'Ciclo Único' : bot.mode === 'semi' ? 'Semi-Perp' : 'Perpetuo'}
                 </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                 <div>Inv: <span className="text-white">${bot.investment}</span></div>
                 <div className="text-right">ROI: <span className="text-quantum-success">{bot.roiRange}</span></div>
              </div>

              <div className="mb-4">
                 <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Ciclo 3h (Pago)</span>
                    <span className="text-quantum-accent">{formatTimeLeft(bot.nextPayout - now)}</span>
                 </div>
                 <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                       className="bg-quantum-accent h-full transition-all duration-1000" 
                       style={{ width: `${progressPercent}%` }}
                    ></div>
                 </div>
              </div>

              {bot.mode !== 'standard' && (
                 <div className="bg-black/30 p-2 rounded text-xs text-center text-gray-500 mb-3">
                    Expira en: <span className="text-white">{formatTimeLeft(bot.endTime - now)}</span>
                 </div>
              )}
              
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                 <span className="text-xs text-gray-400">Profit Generado</span>
                 <span className="text-lg font-bold text-quantum-success font-mono">+${bot.profit.toFixed(2)}</span>
              </div>
           </div>
        )})}
        
        {Array.from({ length: Math.max(0, freeSlots) }).map((_, i) => (
           <div key={`free-${i}`} className="border-2 border-dashed border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-gray-600 hover:border-quantum-accent/30 hover:text-quantum-accent transition-colors cursor-pointer"
             onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth'})}
           >
              <Zap size={24} className="mb-2 opacity-50" />
              <span className="text-sm font-bold">Slot Disponible</span>
              <span className="text-xs">+ Activar Bot</span>
           </div>
        ))}
      </div>

      {/* MARKETPLACE */}
      <div id="market" className="pt-10">
         <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-white">Mercado de Algoritmos</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {INVESTMENT_PLANS.map((plan) => {
             const spotsLeft = plan.dailyLimit - plan.consumed;
             const isSoldOut = spotsLeft <= 0;

             return (
               <div key={plan.id} className={`glass-panel p-6 rounded-xl border relative
                  ${isSoldOut ? 'border-yellow-900/50 bg-yellow-900/5' : 'border-gray-700 hover:border-quantum-accent/50'}
               `}>
                 <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                      Rango: ${plan.minInvestment} - ${plan.maxInvestment}
                    </span>
                 </div>

                 <div className="space-y-3 mb-6">
                    {plan.modes.map((mode, idx) => (
                       <div key={mode.id} className="text-xs flex justify-between items-center border-b border-gray-800 pb-1 last:border-0">
                          <span className="text-gray-400">{mode.name}</span>
                          <span className="text-quantum-success font-mono">{mode.roiLabel}</span>
                       </div>
                    ))}
                 </div>

                 <div className="flex flex-col gap-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Cupos Hoy</span>
                      <span className={isSoldOut ? 'text-yellow-500 font-bold' : 'text-quantum-accent'}>
                        {isSoldOut ? 'AGOTADO' : `${spotsLeft} disponibles`}
                      </span>
                    </div>
                    {isSoldOut && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2 flex items-center gap-2">
                        <Timer size={14} className="text-yellow-500" />
                        <span className="text-xs text-yellow-200">Reseteo en: <span className="font-mono font-bold">{timeToReset}</span> (NY)</span>
                      </div>
                    )}
                 </div>

                 <button 
                   onClick={() => freeSlots > 0 && openActivationModal(plan, isSoldOut)}
                   disabled={freeSlots <= 0}
                   className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2
                     ${freeSlots <= 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : isSoldOut 
                          ? 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_15px_rgba(202,138,4,0.3)]' 
                          : 'bg-white/10 hover:bg-quantum-accent hover:text-black text-white'
                     }
                   `}
                 >
                   {freeSlots <= 0 ? (
                      'Sin Slots Libres'
                   ) : isSoldOut ? (
                      <><DollarSign size={16} /> Comprar Cupo Extra (+${plan.extraSlotCost})</>
                   ) : (
                      <><Play size={16} /> Configurar & Activar</>
                   )}
                 </button>
               </div>
             );
           })}
         </div>
      </div>

      {/* ACTIVATION MODAL */}
      {isModalOpen && selectedPlan && selectedMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeActivationModal}></div>
           <div className="relative glass-panel w-full max-w-lg rounded-2xl border border-quantum-accent/30 overflow-hidden animate-fade-in-up">
              <div className="bg-quantum-900/80 p-6 border-b border-white/10 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="text-quantum-accent" /> Activar {selectedPlan.name}
                 </h3>
                 <button onClick={closeActivationModal} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>
              
              <div className="p-6 space-y-6">
                 {/* Mode Selection */}
                 <div>
                    <label className="block text-sm text-gray-400 mb-3">Selecciona Modo de Operación</label>
                    <div className="grid grid-cols-3 gap-2">
                       {selectedPlan.modes.map(mode => (
                          <button
                             key={mode.id}
                             onClick={() => setSelectedMode(mode)}
                             className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden
                                ${selectedMode.id === mode.id 
                                   ? 'bg-quantum-accent/20 border-quantum-accent text-white' 
                                   : 'bg-black/30 border-gray-700 text-gray-400 hover:bg-white/5'}
                             `}
                          >
                             <div className="text-xs font-bold mb-1">{mode.durationLabel}</div>
                             <div className="text-[10px] opacity-80 mb-1">{mode.id === 'standard' ? 'Estándar' : mode.id === 'semi' ? 'Semi-Perp' : 'Perpetuo'}</div>
                             <div className="text-[10px] text-quantum-success font-mono">{mode.roiLabel}</div>
                             {selectedMode.id === mode.id && (
                                <div className="absolute top-1 right-1 text-quantum-accent"><CheckCircle size={12} /></div>
                             )}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Investment Input */}
                 <div>
                    <label className="block text-sm text-gray-400 mb-2">Monto de Inversión (USDT)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-3.5 text-gray-500">$</span>
                       <input 
                          type="number" 
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                          className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 pl-7 text-white focus:border-quantum-accent outline-none font-mono text-lg"
                       />
                       <span className="absolute right-3 top-4 text-xs text-gray-500">
                          Min: ${selectedPlan.minInvestment} - Max: ${selectedPlan.maxInvestment}
                       </span>
                    </div>
                 </div>

                 {/* Summary */}
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-400">Costo de Modo (Fee):</span>
                       <span className="text-white font-bold">${selectedMode.activationCost} USD</span>
                    </div>
                    {isExtraSlotPurchase && (
                       <div className="flex justify-between text-sm text-yellow-500">
                          <span className="flex items-center gap-1"><AlertTriangle size={12}/> Sobrecosto (Cupo Extra):</span>
                          <span className="font-bold">+${selectedPlan.extraSlotCost} USD</span>
                       </div>
                    )}
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-400">Capital a Invertir:</span>
                       <span className="text-white font-bold">${Number(investmentAmount) || 0} USD</span>
                    </div>
                    <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-base">
                       <span className="text-gray-300">Total a Descontar:</span>
                       <span className="text-quantum-accent font-bold">
                          ${(Number(investmentAmount) || 0) + selectedMode.activationCost + (isExtraSlotPurchase ? selectedPlan.extraSlotCost : 0)} USD
                       </span>
                    </div>
                 </div>

                 {/* Info Alert */}
                 <div className="flex gap-3 p-3 bg-blue-900/20 border border-blue-900/50 rounded-lg">
                    <Info size={18} className="text-blue-400 flex-shrink-0" />
                    <p className="text-xs text-blue-200">
                       {selectedMode.id === 'standard' 
                          ? 'El capital y ganancias se retornan automáticamente al finalizar el ciclo de 3 horas.' 
                          : `Las ganancias se pagan cada 3 horas. El capital base se libera al finalizar los ${selectedMode.durationLabel}.`}
                    </p>
                 </div>

                 <button 
                    onClick={handleActivate}
                    className="w-full py-4 bg-quantum-accent hover:bg-white text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                 >
                    <Zap size={20} /> CONFIRMAR ACTIVACIÓN
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MyBots;
