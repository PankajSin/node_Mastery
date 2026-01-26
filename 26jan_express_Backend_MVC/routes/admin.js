import express from 'express';
import { getAddProduct , postAddProduct }  from '../controllers/admin.js';

const router = express.Router();



router.get('/add-product',getAddProduct);
// This matches: localhost:3000/admin/add-product (POST)
router.post('/add-product',postAddProduct);

export default router;

