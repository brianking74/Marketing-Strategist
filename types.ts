export interface MarketingInputs {
  product: string;
  audience: string;
  launchGoal: string;
  brandTone: string;
}

export interface StrategySection {
  id: string;
  title: string;
  content: string;
  isLoading: boolean;
}

export enum StreamStatus {
  IDLE = 'IDLE',
  streaming = 'STREAMING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}