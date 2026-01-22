import express from 'express';

const router = express.Router();

router.get('/dashboard',(req,res,next)=>{
       res.send('<h1>Admin AI Dashboard</h1>');
});

export default router;