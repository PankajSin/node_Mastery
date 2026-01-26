import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

export const getChat = (req,res,next)=>{
    Product.fetchAll((products)=>{
        console.log('Current Inventory:',products);
        res.sendFile(path.join(__dirname, '..','views','shop.html'));
    });
    
}

