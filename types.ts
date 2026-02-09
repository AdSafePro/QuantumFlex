export interface ArbitrageOpportunity {
  id: string;
  pair: string;
  exchangeA: string;
  exchangeB: string;
  spread: number;
  timestamp: number;
}

export interface Plan {
  id: string;
  name: string;
  minInvestment: number;
  dailyRoi: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  spotsLeft: number;
  features: string[];
}

export interface UserState {
  isLoggedIn: boolean;
  balance: number;
  name: string;
}