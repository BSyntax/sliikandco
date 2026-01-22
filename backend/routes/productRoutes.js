import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/top').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;