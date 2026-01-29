import express from 'express';
import ai from './routes/ai.js';

import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname,'public')));
server.use(express.urlencoded({extended:false}));

// server.use('/',(req,res,next)=>{
//      console.log('First Middleware');
//      const {url , method} =req;
//      const current = Date.now();
//      console.log(method,url,current); 
//      next();
// });

server.use(ai);

server.use((req,res,next)=>{
     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
});

server.listen(3000);
