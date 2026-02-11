import express from 'express';
import { classifyTextInput , getAIResponseOpenRouter, getHistoryPage } from '../controllers/expenseController.js';
import { getHistoryData , getAddPrompt ,postAddPrompt,postDeletePrompt } from '../controllers/expenseController.js';
const router = express.Router();

router.get('/history', getHistoryData); 

router.get('/add-prompt', getAddPrompt);

// Ensure this matches <form action="/add-expense">
router.post('/add-prompt', postAddPrompt);
// This MUST match the 'action' in your HTML form
router.post('/delete-expense', postDeletePrompt);


// This MUST match what your fetch() call uses
router.get('/api/prompts', getHistoryData); 

router.post('/classify',classifyTextInput);
router.get('/', getHistoryPage);



export default router;
