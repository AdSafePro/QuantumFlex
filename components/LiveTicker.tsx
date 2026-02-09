import React, { useEffect, useState } from 'react';

const PAIRS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/BTC', 'BNB/ETH'];
const EXCHANGES = ['Binance', 'Kraken', 'Coinbase', 'KuCoin', 'Huobi'];

interface TickerItem {
  id: number;
  pair: string;
  profit: string;
  exA: string;
  exB: string;
}

const LiveTicker: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    // Generate initial items
    const initialItems = Array.from({ length: 10 }).map((_, i) => generateRandomTrade(i));
    setItems(initialItems);

    const interval = setInterval(() => {
      setItems(prev => {
        const newItem = generateRandomTrade(Date.now());
        return [...prev.slice(1), newItem];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomTrade = (id: number): TickerItem => {
    const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
    const exA = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    let exB = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    while (exB === exA) exB = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    const profit = (Math.random() * (4.5 - 0.5) + 0.5).toFixed(2);
    
    return { id, pair, profit, exA, exB };
  };

  return (
    <div className="w-full bg-quantum-900 border-y border-quantum-accent/20 overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-scroll gap-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
            <span className="text-quantum-accent font-bold">{item.pair}</span>
            <span className="text-gray-500">|</span>
            <span>{item.exA} <span className="text-gray-600">→</span> {item.exB}</span>
            <span className="text-quantum-success font-bold flex items-center">
              +{item.profit}%
              <span className="ml-1 text-[10px] bg-quantum-success/20 px-1 rounded">EJECUTADO</span>
            </span>
          </div>
        ))}
         {/* Duplicate for seamless loop */}
         {items.map((item) => (
          <div key={`dup-${item.id}`} className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
            <span className="text-quantum-accent font-bold">{item.pair}</span>
            <span className="text-gray-500">|</span>
            <span>{item.exA} <span className="text-gray-600">→</span> {item.exB}</span>
            <span className="text-quantum-success font-bold flex items-center">
              +{item.profit}%
              <span className="ml-1 text-[10px] bg-quantum-success/20 px-1 rounded">EJECUTADO</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;