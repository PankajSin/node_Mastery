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
import sequelize from './util/database.js';
import Prompt from './models/prompts.js';


const PORT = process.env.PORT || 3000;
// sequelize.sync({ alter: true }) // This checks/creates the tables in Postgres
// sequelize.sync({ force:true})
//sequelize.sync()
sequelize.sync({force:true})
    .then(result => {
         console.log('--- Database Synced & Altered ---');
        console.log('--- Database Synced Successfully ---');
        server.listen(PORT, () => {
            console.log(`--- Server actually started on port ${PORT} ---`);
        });
    })
    .catch(err => {
        console.error('--- Sequelize Sync Failed! ---');
        console.error(err);
    });