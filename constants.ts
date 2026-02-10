
import { Plan, StakingTier } from './types';

export const APP_NAME = "QuantumFlex";
export const APP_DOMAIN = "https://quantumflex.cloud";
export const APP_VERSION = "1.8.0";

export const TRADING_PAIRS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT', 'ADA/USDT', 'DOGE/USDT', 'LTC/USDT'];
export const EXCHANGES = ['Binance', 'Kraken', 'Coinbase', 'KuCoin', 'Huobi', 'OKX', 'Bybit', 'Bitstamp', 'Gate.io'];

export const STAKING_TIERS: StakingTier[] = [
  { amount: 0, slots: 5 },
  { amount: 100, slots: 6 },
  { amount: 300, slots: 7 },
  { amount: 1000, slots: 8 },
  { amount: 4000, slots: 9 },
  { amount: 10000, slots: 10 },
];

export const INVESTMENT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Bot Iniciante (Micro-HFT)',
    minInvestment: 10,
    maxInvestment: 500,
    dailyRoi: 'Variable',
    riskLevel: 'Bajo',
    dailyLimit: 1000,
    consumed: 842,
    extraSlotCost: 1,
    features: ['Micro-operaciones', 'Sin riesgo de liquidación'],
    modes: [
      {
        id: 'standard',
        name: 'Ciclo Único (3h)',
        durationLabel: '3 Horas',
        durationHours: 3,
        activationCost: 0,
        roiLabel: '0.10% - 0.30%',
        minRoi: 0.10,
        maxRoi: 0.30,
        capitalRelease: 'Ciclo Finalizado (3h)',
        payoutFrequency: 3
      },
      {
        id: 'semi',
        name: 'Semi-Perpetuo (7d)',
        durationLabel: '7 Días',
        durationHours: 168,
        activationCost: 10,
        roiLabel: '0.15% - 0.35%',
        minRoi: 0.15,
        maxRoi: 0.35,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      },
      {
        id: 'perp',
        name: 'Perpetuo (30d)',
        durationLabel: '30 Días',
        durationHours: 720,
        activationCost: 20,
        roiLabel: '0.20% - 0.40%',
        minRoi: 0.20,
        maxRoi: 0.40,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      }
    ]
  },
  {
    id: 'pro',
    name: 'Quantum Arbitrage V2',
    minInvestment: 500,
    maxInvestment: 5000,
    dailyRoi: 'Variable',
    riskLevel: 'Medio',
    dailyLimit: 500, 
    consumed: 495, // Close to full
    extraSlotCost: 3,
    features: ['Prioridad de red', 'Arbitraje triangular'],
    modes: [
      {
        id: 'standard',
        name: 'Ciclo Único (3h)',
        durationLabel: '3 Horas',
        durationHours: 3,
        activationCost: 0,
        roiLabel: '0.40% - 0.60%',
        minRoi: 0.40,
        maxRoi: 0.60,
        capitalRelease: 'Ciclo Finalizado (3h)',
        payoutFrequency: 3
      },
      {
        id: 'semi',
        name: 'Semi-Perpetuo (7d)',
        durationLabel: '7 Días',
        durationHours: 168,
        activationCost: 30,
        roiLabel: '0.45% - 0.65%',
        minRoi: 0.45,
        maxRoi: 0.65,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      },
      {
        id: 'perp',
        name: 'Perpetuo (30d)',
        durationLabel: '30 Días',
        durationHours: 720,
        activationCost: 50,
        roiLabel: '0.50% - 0.70%',
        minRoi: 0.50,
        maxRoi: 0.70,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      }
    ]
  },
  {
    id: 'whale',
    name: 'Institutional Node',
    minInvestment: 5000,
    maxInvestment: 10000,
    dailyRoi: 'Variable',
    riskLevel: 'Alto',
    dailyLimit: 200,
    consumed: 200, // SOLD OUT - To test the Extra Slot feature
    extraSlotCost: 10,
    features: ['VPS Dedicado', 'Mempool Access'],
    modes: [
      {
        id: 'standard',
        name: 'Ciclo Único (3h)',
        durationLabel: '3 Horas',
        durationHours: 3,
        activationCost: 0,
        roiLabel: '0.70% - 1.00%',
        minRoi: 0.70,
        maxRoi: 1.00,
        capitalRelease: 'Ciclo Finalizado (3h)',
        payoutFrequency: 3
      },
      {
        id: 'semi',
        name: 'Semi-Perpetuo (7d)',
        durationLabel: '7 Días',
        durationHours: 168,
        activationCost: 200,
        roiLabel: '0.75% - 1.05%',
        minRoi: 0.75,
        maxRoi: 1.05,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      },
      {
        id: 'perp',
        name: 'Perpetuo (30d)',
        durationLabel: '30 Días',
        durationHours: 720,
        activationCost: 500,
        roiLabel: '0.80% - 1.10%',
        minRoi: 0.80,
        maxRoi: 1.10,
        capitalRelease: 'Fin del Periodo',
        payoutFrequency: 3
      }
    ]
  }
];

export const MOCK_LOGS = [
  "Iniciando estructura base React + Tailwind...",
  "Configurando algoritmos de urgencia visual...",
  "Creando Landing Page de alta conversión...",
  "Integrando simulación de datos de mercado en tiempo real...",
  "Optimizando para despliegue en HestiaCP/Apache...",
  "Sistema listo para integración PHP/MySQL."
];
