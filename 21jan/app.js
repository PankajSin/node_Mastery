import express from 'express';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    res.send('<h1>Welcome</h1>');
});

app.use(userRoutes);
app.use('/admin',adminRoutes);

app.use((req,res,next)=>{
    res.status(404).send('<h1>404: Page Not Found</h1>');
});

app.listen(3000);