import React, { useEffect, useState } from 'react';
import { api } from './api';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert('Failed to fetch products.');
      console.error(err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (err) {
      alert('Failed to fetch cart.');
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post('/cart', { productId, qty: 1 });
      fetchCart();
    } catch (err) {
      alert('Failed to add product to cart.');
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.delete('/cart/' + id);
      fetchCart();
    } catch (err) {
      alert('Failed to remove item.');
      console.error(err);
    }
  };

  const updateQty = async (id, qty) => {
    try {
      await api.put('/cart/' + id, { qty });
      fetchCart();
    } catch (err) {
      alert('Failed to update quantity.');
      console.error(err);
    }
  };

  const checkout = async (payload) => {
    try {
      const res = await api.post('/checkout', payload);
      fetchCart(); // refresh cart after checkout
      return res.data;
    } catch (err) {
      alert('Checkout failed.');
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="container">
      <h1>Vibe Commerce-Mock Cart</h1>
      <div className="layout">
        <ProductGrid products={products} onAdd={addToCart} />
        <Cart cart={cart} onRemove={removeFromCart} onUpdate={updateQty} onCheckout={checkout} />
      </div>
    </div>
  );
}
