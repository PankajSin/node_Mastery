import { Prompt } from "../models/prompts.js";
import { fileURLToPath } from 'url';
import path from 'path';

const  __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename);

import OpenAI from 'openai';

// Configure to point to OpenRouter
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getAIResponseOpenRouter = async (promptText) => {
    const completion = await openrouter.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free", // Use a free model!
        messages: [{ role: "user", content: promptText }],
    });
    return completion.choices[0].message.content;
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponseGemini = async (promptText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(promptText);
    return result.response.text();
};


export const  getAddPrompt = (req,res,next) => {
        console.log("Looking for file at:", path.join(__dirname,'..','views','add-prompt.html'));
        res.sendFile(path.join(__dirname,'..','views','add-prompt.html'));
}
// : Serve the HTML form.
 export const  postAddPrompt = async(req,res,next) =>{
    try {
        const { category, title } = req.body;
        
        // 1. Wait for AI (Gemini or OpenRouter)
        const aiContent = await getAIResponseGemini(title); 
        
        // 2. Create Model instance with the new response
        const prompt = new Prompt(category, title, aiContent);
        
        // 3. Wait for Postgres
        await prompt.save();
        
        res.redirect('/');
    } catch (err) {
        next(err); // This sends AI or DB timeouts to your Global Error Handler
    }
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
