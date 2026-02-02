console.log("Server is trying to start...");

import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import ai from './routes/ai.js';
import { get404 } from './controllers/error.js';

import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname,'public')));

server.use((req, res, next) => {
     console.log('--- Request Received ---');
     console.log(req.method, req.url, Date.now()); 
     next();
});

server.use(ai);

server.use(get404);

server.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).send('Something went wrong on our end!');
});



const PORT = process.env.PORT || 3000;
server.listen(PORT ,()=>{
    console.log(`Server actually started on port ${PORT}`);
});
