
import React, { useState } from 'react';
import { Copy, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, RefreshCw, Clock, Zap, Calendar, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedCryptoDeposit, setSelectedCryptoDeposit] = useState('USDT (TRC20)');
  const { t } = useLanguage();
  
  // WITHDRAWAL STATE
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('USDT (BEP20)');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawalSpeed, setWithdrawalSpeed] = useState<'fast' | 'moderate' | 'free'>('moderate');

  // CONFIGURATION
  const withdrawalOptions = [
    {
      id: 'fast',
      label: t('speed_fast'),
      feePercent: 7,
      timeLabel: t('time_8h'),
      priority: t('priority_high'),
      icon: Zap,
      color: 'text-quantum-danger',
      border: 'border-quantum-danger',
      bg: 'bg-quantum-danger/10'
    },
    {
      id: 'moderate',
      label: t('speed_mod'),
      feePercent: 3,
      timeLabel: t('time_24h'),
      priority: t('priority_med'),
      icon: Clock,
      color: 'text-quantum-gold',
      border: 'border-quantum-gold',
      bg: 'bg-quantum-gold/10'
    },
    {
      id: 'free',
      label: t('speed_free'),
      feePercent: 0,
      timeLabel: t('time_3d'),
      priority: t('priority_low'),
      icon: Calendar,
      color: 'text-quantum-success',
      border: 'border-quantum-success',
      bg: 'bg-quantum-success/10'
    }
  ];

  const availableNetworks = [
    { label: 'USDT (BEP20) - Binance Smart Chain', type: 'stable' },
    { label: 'USDT (ERC20) - Ethereum', type: 'stable' },
    { label: 'USDT (SOL) - Solana', type: 'stable' },
    { label: 'BNB (Binance Coin)', type: 'volatile' },
    { label: 'ETH (Ethereum)', type: 'volatile' },
    { label: 'BTC (Bitcoin)', type: 'volatile' },
    { label: 'TRX (Tron)', type: 'volatile' },
    { label: 'SOL (Solana)', type: 'volatile' },
    { label: 'LTC (Litecoin)', type: 'volatile' },
    { label: 'XRP (Ripple)', type: 'volatile' },
    { label: 'ADA (Cardano)', type: 'volatile' },
  ];

  // CALCULATIONS
  const currentOption = withdrawalOptions.find(o => o.id === withdrawalSpeed)!;
  const amountVal = parseFloat(withdrawAmount) || 0;
  const feeAmount = amountVal * (currentOption.feePercent / 100);
  const netAmount = amountVal - feeAmount;
  const isVolatile = availableNetworks.find(n => n.label === withdrawNetwork)?.type === 'volatile';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-display font-bold text-white">{t('wallet_title')}</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-quantum-800 to-black p-8 rounded-2xl border border-quantum-accent/20 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 p-4">
          <WalletIcon size={120} />
        </div>
        <div className="relative z-10">
          <p className="text-gray-400 text-sm mb-1">{t('wallet_balance')}</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-white">$12,450.32</span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${activeTab === 'deposit' ? 'bg-quantum-accent text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <ArrowDownLeft size={18} /> {t('wallet_btn_deposit')}
            </button>
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${activeTab === 'withdraw' ? 'bg-quantum-danger text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <ArrowUpRight size={18} /> {t('wallet_btn_withdraw')}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden min-h-[500px]">
        {activeTab === 'deposit' ? (
          <div className="p-6 md:p-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-white mb-6">{t('wallet_dep_title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t('wallet_net_select')}</label>
                  <select 
                    value={selectedCryptoDeposit}
                    onChange={(e) => setSelectedCryptoDeposit(e.target.value)}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-quantum-accent outline-none"
                  >
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>BTC (Bitcoin Network)</option>
                  </select>
                </div>
                <div className="bg-quantum-accent/5 border border-quantum-accent/20 p-4 rounded-lg">
                  <p className="text-xs text-quantum-accent mb-2">{t('wallet_addr_title')}</p>
                  <div className="flex items-center gap-2 bg-black/50 p-2 rounded border border-gray-700">
                    <code className="text-sm text-gray-300 truncate flex-1">TYxD5...8j2K9sL3mN7</code>
                    <button className="text-gray-400 hover:text-white p-1">
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Envia solo {selectedCryptoDeposit} a esta dirección. El saldo se acreditará tras 1 confirmación de red.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl">
                 <div className="w-48 h-48 bg-gray-900 mb-2 flex items-center justify-center text-gray-500 text-xs">
                   [QR CODE PLACEHOLDER]
                 </div>
                 <p className="text-black text-sm font-bold">{t('wallet_scan')}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-white mb-6">{t('wallet_with_title')}</h2>
             <div className="grid lg:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: FORM */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('wallet_net_select')}</label>
                    <select 
                      value={withdrawNetwork}
                      onChange={(e) => setWithdrawNetwork(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-quantum-danger outline-none"
                    >
                      {availableNetworks.map((net, idx) => (
                        <option key={idx} value={net.label}>{net.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('wallet_amount')}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input 
                        type="number" 
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 pl-8 text-white focus:border-quantum-danger outline-none" 
                        placeholder="0.00" 
                      />
                      <button 
                        onClick={() => setWithdrawAmount('12450.32')}
                        className="absolute right-2 top-2 text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white transition-colors"
                      >
                        MAX
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('wallet_addr_input')}</label>
                    <input 
                      type="text" 
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-quantum-danger outline-none" 
                      placeholder="Pega tu dirección aquí" 
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: SPEED & SUMMARY */}
                <div className="space-y-6">
                   <div>
                     <label className="block text-sm text-gray-400 mb-2">{t('wallet_priority')}</label>
                     <div className="space-y-2">
                        {withdrawalOptions.map((opt) => (
                          <div 
                            key={opt.id}
                            onClick={() => setWithdrawalSpeed(opt.id as any)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between
                               ${withdrawalSpeed === opt.id 
                                 ? `${opt.bg} ${opt.border} opacity-100` 
                                 : 'bg-black/30 border-gray-700 opacity-60 hover:opacity-100'}
                            `}
                          >
                             <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-black/50 ${opt.color}`}>
                                  <opt.icon size={18} />
                                </div>
                                <div>
                                   <p className={`font-bold text-sm ${opt.color}`}>{opt.label}</p>
                                   <p className="text-xs text-gray-400">{opt.timeLabel}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="font-bold text-white text-sm">{t('wallet_fee')}: {opt.feePercent}%</p>
                                <p className="text-[10px] text-gray-500">Prioridad {opt.priority}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                   </div>

                   {/* SUMMARY BOX */}
                   <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Monto Solicitado:</span>
                        <span className="text-white font-bold">${amountVal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{t('wallet_fee')} ({currentOption.feePercent}%):</span>
                        <span className="text-red-400">-${feeAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-base">
                        <span className="text-gray-300">{t('wallet_net_receive')}:</span>
                        <span className="text-quantum-success font-bold text-lg">${Math.max(0, netAmount).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                   </div>

                   {/* DISCLAIMERS */}
                   {isVolatile && (
                     <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex gap-2 items-start">
                        <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-500/90">
                           <span className="font-bold">Atención:</span> Al retirar en una moneda no estable ({withdrawNetwork.split(' ')[0]}), se aplicarán los fees de red correspondientes y el monto final dependerá del tipo de cambio al momento exacto de la transacción.
                        </p>
                     </div>
                   )}

                   <button className="w-full bg-quantum-danger hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      <RefreshCw size={18} /> {t('wallet_confirm')}
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
