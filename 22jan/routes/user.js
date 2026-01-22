import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// This recreates __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/status',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','status.html'));
});

export default router;
