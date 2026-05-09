
'use client';

import PaymentForm from '@/components/PaymentForm';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8">
        Payment Gateway UI
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <PaymentForm />
        <TransactionHistory />
      </div>
    </main>
  );
}
