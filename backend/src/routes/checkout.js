const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  // fetch cart items
  const items = await CartItem.find();

  // fetch product details for each item
  const detailedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findOne({ productId: item.product });
      return { ...item._doc, product };
    })
  );

  // calculate total
  const total = detailedItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  // create receipt
  const receipt = { id: new Date().getTime(), name, email, items: detailedItems, total, timestamp: new Date() };

  // clear cart
  await CartItem.deleteMany({});

  res.json(receipt);
});

module.exports = router;
