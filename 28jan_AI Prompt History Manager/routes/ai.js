import express from 'express';

import { getAddPrompt, postAddPrompt,getHistory}  from '../controllers/promptController.js';

const router = express.Router();

// master these which part get add-prompt and why
router.get('/',getHistory);
router.get('/add-prompt',getAddPrompt);
router.post('/add-prompt',postAddPrompt);

export default router;
