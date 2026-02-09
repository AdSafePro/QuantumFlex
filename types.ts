
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
  name: string;
  durationLabel: string;
  durationHours: number;
  activationCost: number;
  roiLabel: string;
  minRoi: number;
  maxRoi: number;
  capitalRelease: 'Ciclo Finalizado (3h)' | 'Fin del Periodo';
  payoutFrequency: number;
}

export interface Plan {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  dailyRoi: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  dailyLimit: number; 
  consumed: number; 
  extraSlotCost: number;
  features: string[];
  modes: BotModeConfig[];
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

// --- NEW TYPES FOR ADMIN & SUPPORT ---

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'profit' | 'adjustment';
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'rejected';
  method?: string; // e.g., USDT TRC20, Admin Adjustment
  hash?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  status: 'Active' | 'Blocked';
  joinedDate: string;
  transactions: Transaction[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: number;
}

export interface SupportTicket {
  id: string;
  userId: number;
  username: string;
  subject: string;
  status: 'Active' | 'Pending' | 'Closed';
  messages: ChatMessage[];
  createdAt: number;
  lastUpdated: number;
  closedAt?: number;
}
