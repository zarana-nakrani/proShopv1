import express from 'express'
// import products from '../Data/products.js';
import Product from '../models/productSchema.js';
import { getProducts, getProductsById } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);

export default router;