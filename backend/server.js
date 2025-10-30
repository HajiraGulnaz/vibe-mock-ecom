const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const productsRouter = require('./src/routes/products');
const cartRouter = require('./src/routes/cart');
const checkoutRouter = require('./src/routes/checkout');


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  });
