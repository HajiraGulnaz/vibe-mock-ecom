require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const items = [
  { name: 'Vibe T-shirt', price: 199 },
  { name: 'Vibe Hoodie', price: 799 },
  { name: 'Vibe Mug', price: 149 },
  { name: 'Vibe Cap', price: 249 },
  { name: 'Vibe Tote', price: 299 },
  { name: 'Vibe Sticker Pack', price: 99 }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany({});
    for (let i = 0; i < items.length; i++) {
      const product = new Product(items[i]);
      await product.save(); // productId will auto-generate
    }
    console.log('✅ Seeded products successfully!');
    process.exit(0);
  })
  .catch(err => console.error('❌ Error seeding:', err));
