import express from 'express';
import { getAddPrompt, postAddPrompt,postDeletePrompt, getHistoryPage}  from '../controllers/promptController.js';
import { getHistoryData } from '../controllers/promptController.js';
const router = express.Router();
// for deleting data throgh fetch vanillla javascript
router.get('/', getHistoryPage);        // Now http://localhost:3000/ will work
router.get('/history', getHistoryPage); // Now http://localhost:3000/history will work
router.get('/add-prompt',getAddPrompt);

// 2. Routes that serve the RAW DATA (for your fetch() script)
// We need a separate function for the JSON data!
router.get('/api/prompts',getHistoryData);

router.post('/add-prompt',postAddPrompt);
router.post('/delete-prompt', postDeletePrompt);

export default router;
