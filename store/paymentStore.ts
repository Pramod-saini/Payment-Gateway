
import { create } from 'zustand';
import { Transaction, PaymentStatus } from '@/types/payment';

interface Store {
  status: PaymentStatus;
  transactions: Transaction[];
  setStatus: (status: PaymentStatus) => void;
  addTransaction: (tx: Transaction) => void;
}

export const usePaymentStore = create<Store>((set) => ({
  status: 'idle',
  transactions: [],

  setStatus: (status) => set({ status }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
}));
