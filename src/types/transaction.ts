export interface PaymentSummary {
  userId: string;
  userName: string;
  totalPayments: number;
  lastPaymentDate: string;
}

export interface PaymentSummaryState {
  summaries: PaymentSummary[];
  loading: boolean;
  error: string | null;
}

export interface TransactionFormProps {
  refreshBalance: () => void;
} 

export interface BalanceResponse {
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;         
  description: string;
  amount: number;
}