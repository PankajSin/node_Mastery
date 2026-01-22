import express from 'express';
import userRoutes from './routes/user.js';

import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


server.use(express.static(path.join(__dirname,'public')));
server.use(express.urlencoded({extended:false}));

server.use(userRoutes);
server.use('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});


server.listen(3000);