import React, { useState } from 'react';
import { Copy, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, RefreshCw } from 'lucide-react';

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedCrypto, setSelectedCrypto] = useState('USDT (TRC20)');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-display font-bold text-white">Billetera Digital</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-quantum-800 to-black p-8 rounded-2xl border border-quantum-accent/20 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 p-4">
          <WalletIcon size={120} />
        </div>
        <div className="relative z-10">
          <p className="text-gray-400 text-sm mb-1">Saldo Disponible</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-white">$12,450.32</span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${activeTab === 'deposit' ? 'bg-quantum-accent text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <ArrowDownLeft size={18} /> Depositar
            </button>
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${activeTab === 'withdraw' ? 'bg-quantum-danger text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <ArrowUpRight size={18} /> Retirar
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        {activeTab === 'deposit' ? (
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Depositar Fondos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Seleccionar Red</label>
                  <select 
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-quantum-accent outline-none"
                  >
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>BTC (Bitcoin Network)</option>
                  </select>
                </div>
                <div className="bg-quantum-accent/5 border border-quantum-accent/20 p-4 rounded-lg">
                  <p className="text-xs text-quantum-accent mb-2">Dirección de Depósito</p>
                  <div className="flex items-center gap-2 bg-black/50 p-2 rounded border border-gray-700">
                    <code className="text-sm text-gray-300 truncate flex-1">TYxD5...8j2K9sL3mN7</code>
                    <button className="text-gray-400 hover:text-white p-1">
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Envia solo {selectedCrypto} a esta dirección. El saldo se acreditará tras 1 confirmación de red.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl">
                 <div className="w-48 h-48 bg-gray-900 mb-2 flex items-center justify-center text-gray-500 text-xs">
                   [QR CODE PLACEHOLDER]
                 </div>
                 <p className="text-black text-sm font-bold">Escanear para pagar</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Retirar Ganancias</h2>
             <div className="max-w-lg space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Monto a retirar</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">$</span>
                    <input type="number" className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 pl-8 text-white focus:border-quantum-danger outline-none" placeholder="0.00" />
                    <button className="absolute right-2 top-2 text-xs bg-gray-700 px-2 py-1 rounded text-white">MAX</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Dirección de Billetera</label>
                  <input type="text" className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-quantum-danger outline-none" placeholder="Pega tu dirección aquí" />
                </div>
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-xs text-yellow-500">
                    ⚠️ Importante: Los retiros se procesan automáticamente. Asegúrate de que la dirección sea correcta. No nos hacemos responsables por pérdidas debido a direcciones erróneas.
                  </p>
                </div>
                <button className="w-full bg-quantum-danger hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <RefreshCw size={18} /> Procesar Retiro
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;