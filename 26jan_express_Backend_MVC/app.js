import express from 'express';
import adminRoutes from './routes/admin.js';
import chatRoutes from './routes/chat.js';

import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname,'public')));      //for css 
// The Rule: Remember, you do not include the word public in your 
// HTML path. Express handles that because of app.use(express.static(...))
server.use(express.urlencoded({extended:false}));

server.use((req,res,next)=>{
    console.log('First middleware');
    const {method,url} = req;
    // req.requestTime = new Date().toISOString();
    const currentTimestamp = Date.now();
    console.log(method,url,currentTimestamp);
    next();
});

server.use(chatRoutes);
server.use('/admin',adminRoutes);

server.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

server.listen(3000);
// Q what is path filtering