import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function Cart({ cart, onRemove, onUpdate, onCheckout }) {
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const doCheckout = async (payload) => {
    try {
      const r = await onCheckout(payload);
      setReceipt(r);
      setOpen(false);
    } catch (err) {
      alert('Checkout failed. Please try again.');
      console.error(err);
    }
  };

  if (!cart) return null;

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
            {cart.items?.map(it => (
  <li key={it._id}>
    <strong>{it.product.name} (ID: {it.product.productId})</strong>
    <div>₹{it.product.price} x {it.qty} = ₹{it.product.price * it.qty}</div>
    <button onClick={() => onUpdate(it._id, it.qty + 1)}>+</button>
    <button onClick={() => onUpdate(it._id, Math.max(1, it.qty - 1))}>-</button>
  </li>
))}


        </ul>
      )}

      <h3>Total: ₹{cart.total}</h3>

      <button
        disabled={cart.items?.length === 0}
        onClick={() => {
          setOpen(true);
          setReceipt(null);
        }}
      >
        Checkout
      </button>

      {/* Checkout modal */}
      {open && (
        <CheckoutModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={doCheckout}
          receipt={receipt}
        />
      )}

      {/* Receipt display */}
      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <p><strong>ID:</strong> {receipt.id}</p>
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <button onClick={() => setReceipt(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
