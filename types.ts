
export interface ArbitrageOpportunity {
  id: string;
  pair: string;
  exchangeA: string;
  exchangeB: string;
  spread: number;
  timestamp: number;
}

export interface BotOperation {
  id: string;
  timestamp: number;
  pair: string;
  type: 'Arbitrage' | 'Triangular' | 'Flash Loan';
  exchangeA: string;
  exchangeB: string;
  investmentUsed: number;
  profit: number;
  profitPercent: number;
  hash: string;
}

export interface BotModeConfig {
  id: 'standard' | 'semi' | 'perp';
  name: string; // "Estándar (3h)", "Semi-Perpetuo (7d)", "Perpetuo (30d)"
  durationLabel: string;
  durationHours: number; // 3, 168 (7d), 720 (30d)
  activationCost: number; // USDT cost to unlock this mode
  roiLabel: string;
  minRoi: number;
  maxRoi: number;
  capitalRelease: 'Ciclo Finalizado (3h)' | 'Fin del Periodo';
  payoutFrequency: number; // Hours (e.g., 3)
}

export interface Plan {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  dailyRoi: string; // Generic display
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  dailyLimit: number; 
  consumed: number; 
  extraSlotCost: number; // Cost if daily limit reached
  features: string[];
  modes: BotModeConfig[]; // New configuration for specific modes
}

export interface UserState {
  isLoggedIn: boolean;
  balance: number;
  name: string;
}

export interface StakingTier {
  amount: number;
  slots: number;
}
