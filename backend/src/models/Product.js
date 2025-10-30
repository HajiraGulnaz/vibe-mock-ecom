const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  name: String,
  price: Number,
});

// Pre-save hook to generate sequential productId like P01, P02
productSchema.pre('save', async function (next) {
  if (!this.productId) {
    const lastProduct = await mongoose.model('Product').findOne().sort({ _id: -1 });
    if (lastProduct && lastProduct.productId) {
      // Extract number from last productId
      const lastNumber = parseInt(lastProduct.productId.slice(1));
      this.productId = 'P' + String(lastNumber + 1).padStart(2, '0');
    } else {
      this.productId = 'P01'; // First product
    }
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
