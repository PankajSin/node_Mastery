import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/products.js';

// This recreates __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const getAddProduct =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
};
export const postAddProduct =  (req, res, next) => {
    const title = req.body.title;
    const product = new Product(title);
    product.save();
    res.redirect('/');
};
