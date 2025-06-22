// src/components/PaymentForm.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      const response = await axios.post('/api/payment', {
        amount,
        paymentMethodId: paymentMethod.id
      });

      if (response.data.success) {
        onSuccess(response.data.order);
      } else {
        setError(response.data.message || 'Payment failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-4">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const PaymentForm = ({ amount, onSuccess }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} onSuccess={onSuccess} />
  </Elements>
);

export default PaymentForm;