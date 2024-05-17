import express from 'express';
import uploadImages from '../middlewares/uploadImages.middleware.js';
import checkForAdmin from '../middlewares/checkForAdmin.middleware.js';
import parseQuery from '../middlewares/parseQuery.middleware.js';
import validateProduct from '../middlewares/validateProduct.middleware.js';
import {
  getProduct,
  getProductList,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/product.controller.js';

const router = express.Router();

router.get('/produto/:id', getProduct);

router.get('/produtos', parseQuery, getProductList);

router.get('/destaques', getFeaturedProducts);

router.post(
  '/produto',
  checkForAdmin,
  uploadImages,
  validateProduct,
  createProduct
);

router.put(
  '/produto/:id',
  checkForAdmin,
  uploadImages,
  validateProduct,
  updateProduct
);

router.delete('/produto/:id', checkForAdmin, deleteProduct);

export default router;
