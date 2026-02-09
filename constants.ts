import { Plan } from './types';

export const APP_NAME = "QuantumFlex";

export const INVESTMENT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Bot Iniciante (Micro-HFT)',
    minInvestment: 50,
    dailyRoi: '1.2% - 1.8%',
    riskLevel: 'Bajo',
    spotsLeft: 142,
    features: [
      'Ejecución en 2 exchanges',
      'Sin bloqueo de capital',
      'Retiros 24/7',
      'Soporte por Ticket'
    ]
  },
  {
    id: 'pro',
    name: 'Quantum Arbitrage V2',
    minInvestment: 500,
    dailyRoi: '2.5% - 3.8%',
    riskLevel: 'Medio',
    spotsLeft: 18, // Low number for urgency
    features: [
      'Ejecución en 5 exchanges',
      'Prioridad de red',
      'Interés compuesto automático',
      'Asesor personal'
    ]
  },
  {
    id: 'whale',
    name: 'Institutional Node',
    minInvestment: 5000,
    dailyRoi: '4.5% - 6.2%',
    riskLevel: 'Alto',
    spotsLeft: 3, // Very low number for scarcity
    features: [
      'Acceso directo a Mempool',
      '0ms Latencia (VPS Dedicado)',
      'Seguro de Capital al 100%',
      'Acceso al Club Privado'
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