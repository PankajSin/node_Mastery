import { Prompt } from "../models/prompts.js";
import { fileURLToPath } from 'url';
import path from 'path';

const  __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename);

export const  getAddPrompt = (req,res,next) => {
        res.sendFile(path.join(__dirname,'..','views','add-prompt.html'));
}
// : Serve the HTML form.
 export const  postAddPrompt = (req,res,next) =>{
         console.log('Form Data Received:', req.body);
        // Matches <select name="category">
    const category = req.body.category; 
    
    // Matches <input name="title">
    const text = req.body.title; 

       const prompt = new Prompt(category,text);
       prompt.save(()=>{
          res.redirect('/');
       });
 }
//  : Extract form data, call model.save(), and redirect.
export const  getHistory = (req,res,next) =>{
        
     Prompt.fetchAll((data)=>{
             console.log('--- DATA LOADED FROM JSON ---');
             console.table(data);
                  res.sendFile(path.join(__dirname,'..','views','history.html'));
        });
}

export const postDeletePrompt = (req, res, next) => {
    console.log('Full Request Body:', req.body); // Check the keys here!
    
    if (!req.body.promptId) {
        console.log('Error: promptId missing from request body');
        return res.redirect('/');
    }

    const prodId = req.body.promptId.trim();
    // ... rest of your code
    Prompt.deleteById(prodId, () => {
        res.redirect('/');
    });
};
