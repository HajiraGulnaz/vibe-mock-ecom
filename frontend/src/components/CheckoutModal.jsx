import React, { useState } from 'react';

export default function CheckoutModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name || !email) {
      alert('Please fill out your name and email.');
      return;
    }
    await onSubmit({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="modal" onClick={onClose} style={{ cursor: 'pointer' }}>
      <div
        className="modalContent"
        onClick={e => e.stopPropagation()} // prevent modal close on content click
      >
        <h3>Checkout</h3>
        <div className="formGroup">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="btnGroup">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
