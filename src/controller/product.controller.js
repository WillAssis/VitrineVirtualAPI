import Product from '../models/product.js';
import deleteImage from '../utils/deleteImage.js';
import replaceImages from '../utils/replaceImages.js';

const PRODUCT_PER_PAGE = 8;

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(418);
  }
};

// São feitos 2 requests: um para contar os produtos e outro para obter os produtos
// TODO: fazer com 1 request, se for possível
export const getProductList = async (req, res) => {
  const { page, search } = req.query;
  const filterObj = search ? { name: new RegExp(search, 'i') } : {};

  try {
    const totalResults = await Product.countDocuments(filterObj);
    const products = await Product.find(filterObj)
      .limit(PRODUCT_PER_PAGE)
      .skip(PRODUCT_PER_PAGE * (page - 1));

    res.status(200).json({
      products,
      results: totalResults,
      pages: Math.ceil(totalResults / PRODUCT_PER_PAGE),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(418);
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(418);
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const images = req.files.map((img) => img.filename);
  const featured = Boolean(req.body.featured);

  try {
    await Product.create({ name, description, price, images, featured });
    res.status(201).json({ errors: null });
  } catch (error) {
    images.forEach(deleteImage); // Delete images if fail
    console.error(error);
    res.status(418);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const newImages = req.files.map((img) => img.filename);
  const actions = JSON.parse(req.body.actions);
  const featured = Boolean(req.body.featured);

  try {
    const oldProduct = await Product.findById(id);
    const newImages = req.files.map((img) => img.filename);
    const oldImages = oldProduct.images;
    const images = replaceImages(newImages, oldImages, actions);

    await oldProduct.updateOne({ name, description, price, images, featured });

    res.status(201).json({ errors: null });
  } catch (error) {
    newImages.forEach(deleteImage); // Delete images if fail
    console.error(error);
    res.status(418);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Product.findByIdAndDelete(id);
    doc.images.forEach(deleteImage);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(418).json({ success: false });
  }
};
