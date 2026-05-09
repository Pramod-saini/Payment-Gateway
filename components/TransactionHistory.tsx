
'use client';

import { usePaymentStore } from '@/store/paymentStore';

export default function TransactionHistory() {
  const transactions = usePaymentStore(
    (s) => s.transactions
  );

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Transaction History
      </h2>

      <div className="space-y-3">
        {transactions.length === 0 && (
          <p className="text-slate-400">
            No transactions yet
          </p>
        )}

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <p>ID: {tx.id}</p>
            <p>Amount: ₹{tx.amount}</p>
            <p>Status: {tx.status}</p>
            <p>{tx.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
