import { Prompt } from "../models/prompts.js";
import { fileURLToPath } from 'url';
import path from 'path';

const  __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename);

export const  getAddPrompt = (req,res,next) => {
        console.log("Looking for file at:", path.join(__dirname,'..','views','add-prompt.html'));
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
       prompt.save().then(()=>{
         console.log('Data Saved to Postgres!');
            res.redirect('/');
       }).catch((err)=>{
        console.log('SAVE ERROR:', err);
             console.error("DETAILED DATABASE ERROR:", err.message); // Look at this in terminal
            next(err); // This sends it to your Global Error Handler
       });
 }
//  : Extract form data, call model.save(), and redirect.
export const  getHistoryPage = (req,res,next) =>{       
         res.sendFile(path.join(__dirname,'..','views','history.html'));
}

export const getHistoryData= (req, res,next) => {
     const selectedCategory = req.query.category; // e.g., 'coding'
    Prompt.fetchAll(selectedCategory)
        .then(result => {
            res.json(result.rows); 
        }) 
        .catch(err => next(err));
}; 


export const postDeletePrompt = (req, res, next) => {

    const prodId = req.body.promptId;
    console.log("Attempting to delete ID:", prodId); // Verify this isn't empty!
         Prompt.deleteById(prodId)
        .then((result) => {
          //    console.log(`Deleted ${prodId.rowCount} row(s).`); // Optional log
          //    // result.rowCount tells you how many rows were actually matched and deleted
          //   console.log("Rows actually deleted from DB:", prodId.rowCount); 
            
          //   if (prodId.rowCount === 0) {
          //       console.log("Warning: No row found with that ID.");
          //   }
          console.log("Rows actually deleted from DB:", result.rowCount); 
            res.redirect('/history');
        })
        .catch(err => {
            console.error("DELETE ERROR:", err.stack); // Check your terminal!
            next(err); 
        });
};
