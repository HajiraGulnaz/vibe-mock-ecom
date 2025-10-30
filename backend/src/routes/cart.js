const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart
router.get('/', async (req, res) => {
  const items = await CartItem.find();
  const detailedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findOne({ productId: item.product });
      return { ...item._doc, product };
    })
  );

  const total = detailedItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  res.json({ items: detailedItems, total });
});



// POST /api/cart { productId, qty }
router.post('/', async (req, res) => {
  const { productId, qty = 1 } = req.body;

  let item = await CartItem.findOne({ product: productId });
  if (item) {
    item.qty += qty;
    await item.save();
    return res.json(item);
  }

  // Check if product exists
  const product = await Product.findOne({ productId });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  item = await CartItem.create({ product: productId, qty });
  res.status(201).json(item);
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await CartItem.findByIdAndDelete(id);
  res.status(204).end();
});

// PUT /api/cart/:id - update qty
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  const item = await CartItem.findByIdAndUpdate(id, { qty }, { new: true }).populate('product');
  res.json(item);
});

module.exports = router;
