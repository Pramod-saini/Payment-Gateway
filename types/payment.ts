
export type PaymentStatus =
  | 'idle'
  | 'processing'
  | 'success'
  | 'failed'
  | 'timeout';

export interface Transaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  timestamp: string;
}
