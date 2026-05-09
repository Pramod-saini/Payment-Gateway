
'use client';

import { useState } from 'react';
import CardPreview from './CardPreview';
import { formatCardNumber } from '@/utils/card';
import { usePaymentStore } from '@/store/paymentStore';

export default function PaymentForm() {
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  const setStatus = usePaymentStore(
    (s) => s.setStatus
  );

  const addTransaction = usePaymentStore(
    (s) => s.addTransaction
  );

  const handlePayment = async () => {
    setStatus('processing');

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        signal: controller.signal,
      });

      const data = await res.json();

      setStatus(data.status);

      addTransaction({
        id: crypto.randomUUID(),
        amount: Number(amount),
        status: data.status,
        timestamp: new Date().toLocaleString(),
      });

      alert(
        data.status === 'success'
          ? 'Payment Successful'
          : data.reason || 'Payment Failed'
      );
    } catch {
      setStatus('timeout');

      alert('Payment Timeout');
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Payment Form
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          placeholder="Card Number"
          value={card}
          onChange={(e) =>
            setCard(
              formatCardNumber(e.target.value)
            )
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) =>
              setExpiry(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
          />

          <input
            placeholder="CVV"
            value={cvv}
            onChange={(e) =>
              setCvv(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
          />
        </div>

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
        >
          Pay Now
        </button>
      </div>

      <CardPreview
        name={name}
        card={card}
        expiry={expiry}
      />
    </div>
  );
}
