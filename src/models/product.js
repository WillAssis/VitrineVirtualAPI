import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  featured: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
