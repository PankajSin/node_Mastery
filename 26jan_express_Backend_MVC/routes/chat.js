import express from 'express';


import { getChat, getIndex } from '../controllers/chat.js';

const router = express.Router();



router.get('/',getChat);
router.get('/',getIndex);



export default router;