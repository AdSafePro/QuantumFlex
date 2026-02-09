import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowUpRight, ArrowDownLeft, Zap, X } from 'lucide-react';

interface NotificationData {
  id: number;
  user: string;
  action: 'invest' | 'deposit' | 'withdraw';
  amount: string;
  detail: string;
}

const NAMES = ['Alex M.', 'Carlos R.', 'Sarah J.', 'David B.', 'Elena K.', 'Mike T.', 'Sofia L.', 'Javier P.'];
const BOTS = ['Bot Iniciante', 'Quantum V2', 'Institutional Node'];

const SocialProofToast: React.FC = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const generateNotification = (): NotificationData => {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const actions: ('invest' | 'deposit' | 'withdraw')[] = ['invest', 'deposit', 'withdraw'];
    // Weight actions: More invests/withdraws to show profit and FOMO
    const weightedActions = [...actions, 'invest', 'withdraw']; 
    const action = weightedActions[Math.floor(Math.random() * weightedActions.length)] as 'invest' | 'deposit' | 'withdraw';
    
    let amount = '';
    let detail = '';

    if (action === 'invest') {
      amount = `$${(Math.floor(Math.random() * 50) * 100 + 100).toLocaleString()}`;
      detail = BOTS[Math.floor(Math.random() * BOTS.length)];
    } else if (action === 'deposit') {
      amount = `$${(Math.floor(Math.random() * 20) * 100 + 500).toLocaleString()}`;
      detail = 'USDT (TRC20)';
    } else {
      amount = `$${(Math.floor(Math.random() * 15) * 100 + 200).toLocaleString()}`;
      detail = 'a Billetera Externa';
    }

    return {
      id: Date.now(),
      user: randomName,
      action,
      amount,
      detail
    };
  };

  useEffect(() => {
    const scheduleNext = () => {
      // Random time between 30 seconds (30000ms) and 3 minutes (180000ms)
      const delay = Math.floor(Math.random() * (180000 - 30000 + 1) + 30000);
      
      // For demo purposes, we might want it faster initially, let's say 10s to 45s for immediate impact
      // const delay = Math.floor(Math.random() * (45000 - 10000 + 1) + 10000); 

      return setTimeout(() => {
        const newData = generateNotification();
        setNotification(newData);
        setIsVisible(true);

        // Hide after 6 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 6000);

        // Schedule the next one recursively
        scheduleNext();
      }, delay);
    };

    // Initial trigger
    const timerId = scheduleNext();

    return () => clearTimeout(timerId);
  }, []);

  if (!notification) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 md:left-auto md:right-8 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
    >
      <div className="glass-panel p-4 rounded-xl border-l-4 border-l-quantum-accent shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-start gap-3 w-80 relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-white"
        >
          <X size={14} />
        </button>

        <div className={`p-2 rounded-full flex-shrink-0 
          ${notification.action === 'invest' ? 'bg-quantum-accent/20 text-quantum-accent' : 
            notification.action === 'deposit' ? 'bg-quantum-gold/20 text-quantum-gold' : 
            'bg-quantum-success/20 text-quantum-success'}`
        }>
          {notification.action === 'invest' && <Zap size={20} />}
          {notification.action === 'deposit' && <ArrowDownLeft size={20} />}
          {notification.action === 'withdraw' && <ArrowUpRight size={20} />}
        </div>

        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
            {notification.action === 'invest' ? 'Nueva Activación' : 
             notification.action === 'deposit' ? 'Depósito Confirmado' : 
             'Retiro Procesado'}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold text-gray-200">{notification.user}</span> 
            {notification.action === 'invest' ? ' ha activado ' : 
             notification.action === 'deposit' ? ' depositó ' : 
             ' retiró '}
            <span className="font-bold text-quantum-success">{notification.amount}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{notification.detail}</p>
          <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
            <CheckCircle size={10} /> Verificado por Blockchain
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofToast;