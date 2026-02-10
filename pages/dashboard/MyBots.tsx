
import React, { useState, useEffect, useRef } from 'react';
import { INVESTMENT_PLANS, STAKING_TIERS, TRADING_PAIRS, EXCHANGES } from '../../constants';
import { Plan, BotModeConfig, BotOperation } from '../../types';
import { Play, Pause, AlertTriangle, Lock, Zap, Server, Info, X, Clock, DollarSign, CheckCircle, Timer, Activity, TrendingUp, Eye, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ActiveBot {
  id: string;
  planId: string;
  name: string;
  investment: number;
  profit: number; // Current accumulated profit
  totalExpectedProfit: number; // The target profit for this cycle/period
  mode: 'standard' | 'semi' | 'perp';
  startTime: number;
  endTime: number;
  lastPayout: number;
  nextPayout: number;
  roiRange: string;
  operations: BotOperation[];
  nextOperationTime: number; // Timestamp for the next simulated trade
}

interface Notification {
  id: number;
  botName: string;
  pair: string;
  profit: number;
  profitPercent: number;
  exchangeA: string;
  exchangeB: string;
}

const MyBots: React.FC = () => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [balance, setBalance] = useState(12450.32);
  const { t } = useLanguage();
  
  // ACTIVATION MODAL STATE
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedMode, setSelectedMode] = useState<BotModeConfig | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtraSlotPurchase, setIsExtraSlotPurchase] = useState(false);

  // OPERATIONS HISTORY MODAL
  const [historyBot, setHistoryBot] = useState<ActiveBot | null>(null);

  // NOTIFICATIONS STATE
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // COUNTDOWN STATE
  const [timeToReset, setTimeToReset] = useState<string>('');

  // HELPER FOR SKEWED RANDOM (75% Low, 25% High)
  const calculateSkewedProfit = (min: number, max: number) => {
    const mean = (min + max) / 2;
    const isLowRange = Math.random() < 0.75;
    return isLowRange 
      ? min + Math.random() * (mean - min) 
      : mean + Math.random() * (max - mean);
  };

  // MOCK ACTIVE BOTS
  const [activeBots, setActiveBots] = useState<ActiveBot[]>([
    { 
      id: 'b1', 
      planId: 'starter', 
      name: 'Bot Iniciante', 
      investment: 250, 
      profit: 0.45, // Starts with some profit
      totalExpectedProfit: 250 * (0.20 / 100), // example target
      mode: 'standard', 
      startTime: Date.now() - (1000 * 60 * 30), // Started 30 mins ago
      endTime: Date.now() + (1000 * 60 * 60 * 2.5), 
      lastPayout: Date.now() - (1000 * 60 * 30),
      nextPayout: Date.now() + (1000 * 60 * 60 * 2.5), 
      roiRange: '0.10% - 0.30%',
      operations: [],
      nextOperationTime: Date.now() + 5000 // In 5 seconds
    }
  ]);

  // UPDATE TIMERS (Clock & Reset Countdown)
  const [now, setNow] = useState(Date.now());
  
  // SIMULATION ENGINE
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);

      setActiveBots(prevBots => {
        return prevBots.map(bot => {
          // If bot has ended, stop simulating
          if (currentTime > bot.endTime) return bot;

          // Check if it's time for a new operation
          if (currentTime >= bot.nextOperationTime) {
            // Generate Operation
            const pair = TRADING_PAIRS[Math.floor(Math.random() * TRADING_PAIRS.length)];
            const exA = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
            let exB = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
            while (exB === exA) exB = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
            
            // Calculate a realistic small profit chunk
            const estimatedOps = 10;
            const baseOpProfit = bot.totalExpectedProfit / estimatedOps;
            const actualOpProfit = baseOpProfit * (0.5 + Math.random()); // Randomize between 0.5x and 1.5x of base
            
            // Generate hash
            const hash = Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');

            const newOp: BotOperation = {
              id: `op-${currentTime}`,
              timestamp: currentTime,
              pair,
              type: Math.random() > 0.8 ? 'Triangular' : 'Arbitrage',
              exchangeA: exA,
              exchangeB: exB,
              investmentUsed: bot.investment, // Simulating utilizing full capital
              profit: actualOpProfit,
              profitPercent: (actualOpProfit / bot.investment) * 100,
              hash: `0x${hash}...`
            };

            // Schedule next operation (1 to 30 minutes from now)
            const nextTime = currentTime + (Math.floor(Math.random() * 29) + 1) * 60 * 1000;

            // Trigger Notification
            const newNotification: Notification = {
              id: currentTime,
              botName: bot.name,
              pair,
              profit: actualOpProfit,
              profitPercent: newOp.profitPercent,
              exchangeA: exA,
              exchangeB: exB
            };
            setNotifications(prev => [...prev, newNotification]);
            
            // Clear notification after 5 seconds
            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
            }, 5000);

            return {
              ...bot,
              profit: bot.profit + actualOpProfit,
              operations: [newOp, ...bot.operations],
              nextOperationTime: nextTime
            };
          }
          return bot;
        });
      });

    }, 10000); // Check every 10 seconds

    return () => clearInterval(simulationInterval);
  }, []);

  // CLOCK LOGIC
  useEffect(() => {
    const updateTimers = () => {
      const now = new Date();
      const nyTimeString = now.toLocaleString("en-US", {timeZone: "America/New_York"});
      const nyDate = new Date(nyTimeString);
      const nextReset = new Date(nyDate);
      nextReset.setHours(12, 0, 0, 0);
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
    updateTimers(); 
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
      alert(`Investment must be between $${selectedPlan.minInvestment} and $${selectedPlan.maxInvestment}`);
      return;
    }

    if (totalCost > balance) {
      alert("Insufficient balance");
      return;
    }

    // Calculate Target ROI Percentage based on skew logic
    const targetRoiPercent = calculateSkewedProfit(selectedMode.minRoi, selectedMode.maxRoi);
    // Convert to dollar amount
    const totalExpectedProfit = amount * (targetRoiPercent / 100);

    // Create new bot
    const newBot: ActiveBot = {
      id: `bot-${Date.now()}`,
      planId: selectedPlan.id,
      name: selectedPlan.name,
      investment: amount,
      profit: 0,
      totalExpectedProfit: totalExpectedProfit,
      mode: selectedMode.id,
      startTime: Date.now(),
      endTime: Date.now() + (selectedMode.durationHours * 60 * 60 * 1000),
      lastPayout: Date.now(),
      nextPayout: Date.now() + (3 * 60 * 60 * 1000),
      roiRange: selectedMode.roiLabel,
      operations: [],
      nextOperationTime: Date.now() + (Math.floor(Math.random() * 5) + 1) * 60 * 1000 // Start trading in 1-5 mins
    };

    setActiveBots([...activeBots, newBot]);
    setBalance(prev => prev - totalCost);
    closeActivationModal();
  };

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return "Done";
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* PUSH NOTIFICATIONS CONTAINER */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {notifications.map(notif => (
          <div key={notif.id} className="pointer-events-auto bg-quantum-900/90 backdrop-blur-md border border-quantum-accent/30 p-4 rounded-xl shadow-2xl animate-fade-in-up w-80 flex gap-3">
             <div className="bg-quantum-success/20 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
               <Zap className="text-quantum-success" size={20} />
             </div>
             <div>
               <p className="text-xs text-quantum-accent font-bold uppercase">{notif.botName}</p>
               <p className="text-sm text-white font-bold">
                 Profit <span className="text-quantum-success">+{notif.profitPercent.toFixed(4)}%</span>
               </p>
               <div className="text-[10px] text-gray-400 mt-1 flex flex-wrap gap-1">
                 <span className="text-white">{notif.pair}</span>
                 <span>|</span>
                 <span>{notif.exchangeA} → {notif.exchangeB}</span>
               </div>
               <p className="text-xs text-quantum-success font-mono mt-1">+${notif.profit.toFixed(4)} USD</p>
             </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-display font-bold text-white">{t('bots_mgmt_title')}</h1>
           <p className="text-gray-400 text-sm">{t('bots_mgmt_desc')}</p>
        </div>
        <button 
           onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth'})}
           className="bg-quantum-accent text-quantum-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          {t('bots_btn_new_node')}
        </button>
      </div>

      {/* STAKING & SLOTS SYSTEM */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-quantum-accent/20 relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Server className="text-quantum-accent" /> {t('bots_cap_title')}
              </h2>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300 border border-gray-700">
                 {usedSlots} / {totalSlots} {t('bots_slots_used')}
              </span>
           </div>
           <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, index) => {
                 const slotNum = index + 1;
                 const isActive = index < usedSlots;
                 const isUnlocked = slotNum <= totalSlots;
                 return (
                    <div 
                      key={index} 
                      className={`
                        aspect-square rounded-lg border flex flex-col items-center justify-center relative group
                        ${isActive 
                           ? 'bg-quantum-success/10 border-quantum-success shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                           : !isUnlocked 
                              ? 'bg-black/40 border-gray-800 opacity-50' 
                              : 'bg-quantum-accent/5 border-quantum-accent/30 border-dashed'
                        }
                      `}
                    >
                       {isActive ? (
                          <>
                             <div className="w-2 h-2 rounded-full bg-quantum-success absolute top-2 right-2 animate-pulse"></div>
                             <Zap size={20} className="text-quantum-success mb-1" />
                             <span className="text-[10px] font-bold text-white">{t('bots_running')}</span>
                          </>
                       ) : !isUnlocked ? (
                          <>
                             <Lock size={18} className="text-gray-600 mb-1" />
                             <span className="text-[10px] text-gray-600">{t('bots_locked')}</span>
                          </>
                       ) : (
                          <>
                             <span className="text-xs text-quantum-accent/50 font-mono">{t('bots_empty')}</span>
                             <span className="text-[9px] text-gray-500">Slot #{slotNum}</span>
                          </>
                       )}
                    </div>
                 );
              })}
           </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-purple-500/20 bg-gradient-to-b from-quantum-900 to-purple-900/20">
           <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Zap className="text-purple-500" /> {t('bots_stake_title')}
           </h2>
           <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                 <span>{t('bots_stake_current')}</span>
                 <span className="text-white font-bold">${stakedAmount} USD</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                 <div 
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${(stakedAmount / 10000) * 100}%` }}
                 ></div>
              </div>
              <p className="text-xs text-purple-400 mt-2 flex items-center gap-1">
                 {t('bots_stake_desc')}
              </p>
           </div>
           <div className="space-y-4">
              <label className="text-sm text-gray-300">{t('bots_stake_increase')}</label>
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
                 <p className="text-xs text-gray-400">{t('bots_next_unlock')}:</p>
                 <p className="text-sm font-bold text-white">Slot #{nextTier.slots}</p>
                 <p className="text-xs text-quantum-accent">{t('bots_req_stake')} ${nextTier.amount}</p>
              </div>
           )}
        </div>
      </div>

      {/* ACTIVE BOTS LIST */}
      <h2 className="text-lg font-bold text-gray-300 mt-8 mb-4 border-b border-gray-800 pb-2">{t('bots_active_list_title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeBots.map((bot) => {
          const cycleDuration = 3 * 60 * 60 * 1000;
          const timeSincePayout = now - bot.lastPayout;
          const progressPercent = Math.min(100, (timeSincePayout / cycleDuration) * 100);
          
          return (
           <div key={bot.id} className="glass-panel p-5 rounded-xl border border-quantum-success/30 relative group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-white">{bot.name}</h3>
                   <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase
                     ${bot.mode === 'standard' ? 'bg-gray-700 text-gray-300' : 
                       bot.mode === 'semi' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}
                   `}>
                     {bot.mode === 'standard' ? t('bots_cycle_single') : bot.mode === 'semi' ? t('bots_cycle_semi') : t('bots_cycle_perp')}
                   </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                   <div>Inv: <span className="text-white">${bot.investment}</span></div>
                   <div className="text-right">ROI: <span className="text-quantum-success">{bot.roiRange}</span></div>
                </div>

                <div className="mb-4">
                   <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>{t('bots_cycle_payout')}</span>
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
                      {t('bots_expire_in')}: <span className="text-white">{formatTimeLeft(bot.endTime - now)}</span>
                   </div>
                )}
                
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5 mb-3">
                   <span className="text-xs text-gray-400">{t('bots_profit_gen')}</span>
                   <span className="text-lg font-bold text-quantum-success font-mono">+${bot.profit.toFixed(4)}</span>
                </div>
              </div>

              <button 
                onClick={() => setHistoryBot(bot)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-gray-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Eye size={14} /> {t('bots_view_ops')} ({bot.operations.length})
              </button>
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
            <h2 className="text-2xl font-bold text-white">{t('bots_market_title')}</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {INVESTMENT_PLANS.map((plan) => {
             const spotsLeft = plan.dailyLimit - plan.consumed;
             const isSoldOut = spotsLeft <= 0;
             const localizedName = t(`plan_${plan.id}`) !== `plan_${plan.id}` ? t(`plan_${plan.id}`) : plan.name;

             return (
               <div key={plan.id} className={`glass-panel p-6 rounded-xl border relative
                  ${isSoldOut ? 'border-yellow-900/50 bg-yellow-900/5' : 'border-gray-700 hover:border-quantum-accent/50'}
               `}>
                 <h3 className="text-lg font-bold text-white mb-1">{localizedName}</h3>
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                      {t('bots_range')}: ${plan.minInvestment} - ${plan.maxInvestment}
                    </span>
                 </div>
                 <div className="flex flex-col gap-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{t('bots_spots_today')}</span>
                      <span className={isSoldOut ? 'text-yellow-500 font-bold' : 'text-quantum-accent'}>
                        {isSoldOut ? t('bots_sold_out') : `${spotsLeft} ${t('bots_available')}`}
                      </span>
                    </div>
                    {isSoldOut && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2 flex items-center gap-2">
                        <Timer size={14} className="text-yellow-500" />
                        <span className="text-xs text-yellow-200">{t('bots_reset_in')}: <span className="font-mono font-bold">{timeToReset}</span> (NY)</span>
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
                      t('bots_no_slots')
                   ) : isSoldOut ? (
                      <><DollarSign size={16} /> {t('bots_buy_slot')} (+${plan.extraSlotCost})</>
                   ) : (
                      <><Play size={16} /> {t('bots_config_activate')}</>
                   )}
                 </button>
               </div>
             );
           })}
         </div>
      </div>

      {/* OPERATIONS HISTORY MODAL */}
      {historyBot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setHistoryBot(null)}></div>
           <div className="relative glass-panel w-full max-w-2xl rounded-2xl border border-quantum-accent/30 overflow-hidden flex flex-col max-h-[80vh]">
              <div className="bg-quantum-900 p-4 border-b border-white/10 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       <Activity className="text-quantum-accent" /> {t('bot_hist_title')}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      BOT: {historyBot.name} | ID: {historyBot.id.substring(0,8)}
                    </p>
                 </div>
                 <button onClick={() => setHistoryBot(null)} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                 {historyBot.operations.length === 0 ? (
                   <div className="text-center py-10 text-gray-500">
                     <Clock className="mx-auto mb-2 opacity-50" size={32} />
                     <p>{t('bot_hist_waiting')}</p>
                     <p className="text-[10px]">{t('bot_hist_scanning')}</p>
                   </div>
                 ) : (
                   historyBot.operations.map((op) => (
                     <div key={op.id} className="bg-black/40 border border-white/5 p-3 rounded hover:bg-white/5 transition-colors flex items-center justify-between group">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className="text-quantum-accent font-bold">{op.pair}</span>
                              <span className="text-gray-600">|</span>
                              <span className="text-gray-400">{op.type}</span>
                              <span className="text-gray-600">|</span>
                              <span className="text-[10px] text-gray-500">{new Date(op.timestamp).toLocaleTimeString()}</span>
                           </div>
                           <div className="flex items-center gap-2 text-[10px] text-gray-500">
                              <span>{op.exchangeA}</span>
                              <ArrowRight size={10} />
                              <span>{op.exchangeB}</span>
                              <span className="text-gray-700">HASH: {op.hash}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-quantum-success font-bold text-sm">+${op.profit.toFixed(4)}</p>
                           <p className="text-[10px] text-gray-500">+{op.profitPercent.toFixed(4)}%</p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
              
              <div className="p-4 bg-black/40 border-t border-white/10 flex justify-between items-center">
                 <span className="text-sm text-gray-400">{t('bot_hist_total')}: {historyBot.operations.length}</span>
                 <div className="text-right">
                    <span className="text-sm text-gray-400">{t('bot_hist_accum')}: </span>
                    <span className="text-quantum-success font-bold text-lg">${historyBot.profit.toFixed(4)}</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* ACTIVATION MODAL */}
      {isModalOpen && selectedPlan && selectedMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeActivationModal}></div>
           <div className="relative glass-panel w-full max-w-lg rounded-2xl border border-quantum-accent/30 overflow-hidden animate-fade-in-up">
              <div className="bg-quantum-900/80 p-6 border-b border-white/10 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="text-quantum-accent" /> {t('bot_act_title')} {selectedPlan.name}
                 </h3>
                 <button onClick={closeActivationModal} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>
              
              <div className="p-6 space-y-6">
                 {/* Mode Selection */}
                 <div>
                    <label className="block text-sm text-gray-400 mb-3">{t('bot_act_sel_mode')}</label>
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
                             <div className="text-[10px] opacity-80 mb-1">{mode.id === 'standard' ? t('bots_cycle_single') : mode.id === 'semi' ? t('bots_cycle_semi') : t('bots_cycle_perp')}</div>
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
                    <label className="block text-sm text-gray-400 mb-2">{t('bot_act_inv_amount')}</label>
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
                       <span className="text-gray-400">{t('bot_act_fee')}:</span>
                       <span className="text-white font-bold">${selectedMode.activationCost} USD</span>
                    </div>
                    {isExtraSlotPurchase && (
                       <div className="flex justify-between text-sm text-yellow-500">
                          <span className="flex items-center gap-1"><AlertTriangle size={12}/> {t('bot_act_extra_cost')}:</span>
                          <span className="font-bold">+${selectedPlan.extraSlotCost} USD</span>
                       </div>
                    )}
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-400">{t('bot_act_cap_inv')}:</span>
                       <span className="text-white font-bold">${Number(investmentAmount) || 0} USD</span>
                    </div>
                    <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-base">
                       <span className="text-gray-300">{t('bot_act_total_deduct')}:</span>
                       <span className="text-quantum-accent font-bold">
                          ${(Number(investmentAmount) || 0) + selectedMode.activationCost + (isExtraSlotPurchase ? selectedPlan.extraSlotCost : 0)} USD
                       </span>
                    </div>
                 </div>

                 <button 
                    onClick={handleActivate}
                    className="w-full py-4 bg-quantum-accent hover:bg-white text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                 >
                    <Zap size={20} /> {t('bot_act_confirm')}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MyBots;
