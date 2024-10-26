// src/routes/productRoutes.ts
import { Router } from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;