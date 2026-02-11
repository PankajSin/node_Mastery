import Expense  from "../models/expense.js";
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
    if (typeof promptText !== 'string') {
        throw new Error("AI Helper expected a string but received an object.");
    }
    const completion = await openrouter.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free", // Use a free model!
        messages: [{ role: "user", content: promptText }],
    });
    return completion.choices[0].message.content;
};

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const classifyTextInput = async (req, res, next) => {
    try {
        const { userInput } = req.body; // e.g., "Tell me about dogs"

        // Setup the Model
        const model = genAI.getGenerativeModel({
            // model: "gemini-3-flash-preview",
            model : "gemini-1.5-flash"
            // generationConfig: { responseMimeType: "application/json" } // Optional: Can use if expecting JSON
        });

        const prompt = `
            Classify the following text into one of these categories: Animals, Technology, Food, Other.
            Text: "${userInput}".
            Return only the category name.
            Example: Animals
        `;

        // Get Response
        const result = await model.generateContent(prompt);
        const classification = result.response.text().trim();

        const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);

        // SAVE TO POSTGRES using your Expense model
        await Expense.create({
            description: userInput,
            amount: data.amount,
            category: data.category
        });

    } catch (err) {
        console.error("AI Error:", err.message);
        res.status(500).json({ error: "Failed to process text with AI" });
    }
};
export const getAddPrompt = (req, res, next) => {
    // 1. Move up twice: controllers -> src -> root
    // 2. Then enter 'views' folder
    const filePath = path.join(process.cwd(), 'src', 'views', 'add-prompt.html');
    
    console.log("Serving file from:", filePath);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("ERROR: File not found at", filePath);
            next(err);
        }
    });
};
// import fs from 'fs';

// export const getAddPrompt = (req, res, next) => {
//     const folderPath =path.join(process.cwd(), 'src', 'views', 'add-prompt.html');
    
//     // Check if the FOLDER exists
//     if (!fs.existsSync(folderPath)) {
//         return res.status(500).send(`Folder NOT FOUND at: ${folderPath}`);
//     }

//     // List all files in that folder
//     const files = fs.readdirSync(folderPath);
//     console.log("Files found in views folder:", files);

//     const filePath = path.join(folderPath, 'add-prompt.html');
//     res.sendFile(filePath, (err) => {
//         if (err) next(err);
//     });
// };

// : Serve the HTML form.
//  export const postAddPrompt = async (req, res, next) => {
//     try {
//         const { userInput } = req.body; // e.g., "Spent 500 on Pizza"

//         const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

//         const prompt = `
//             Analyze this text: "${userInput}". 
//             Extract the data into this JSON format: {"amount": number, "category": string}. 
//             Categories: Food, Travel, Shopping, Bills, Other.
//             Return ONLY JSON.
//         `;

//         const result = await model.generateContent(prompt);
//         let aiResponse = result.response.text().trim();
        
//         // Clean up the AI response if it includes markdown code blocks
//         const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
//         const data = JSON.parse(cleanJson);

//         // SAVE TO POSTGRES
//         await Expense.create({
//             description: userInput,
//             amount: data.amount,
//             category: data.category
//         });

//         res.redirect('/');
//     } catch (err) {
//         console.error("AI/DB Error:", err.message);
//         next(err);
//     }
// };
export const postAddPrompt = async (req, res, next) => {
    try {
        const { userInput } = req.body;
        let amount = 0;
        let category = "Other";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Analyze: "${userInput}". Return ONLY JSON: {"amount": number, "category": string}`;
            
            const result = await model.generateContent(prompt);
            const aiResponse = result.response.text().trim();
            const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
            const data = JSON.parse(cleanJson);
            
            amount = data.amount;
            category = data.category;
        } catch (aiErr) {
            console.error("AI Busy, using fallback parsing...");
            // Simple regex fallback: try to find a number in the text if AI fails
            const match = userInput.match(/\d+/);
            amount = match ? parseInt(match[0]) : 0;
            category = "Uncategorized (AI Busy)";
        }

        await Expense.create({
            description: userInput,
            amount: amount,
            category: category
        });

        res.redirect('/');
    } catch (err) {
        next(err);
    }
};


//  : Extract form data, call model.save(), and redirect.
export const  getHistoryPage = (req,res,next) =>{       
    console.log("Serving History Page...");

    // 2. Send the physical HTML file
    // Ensure 'history.html' exists in your 'views' folder!
    res.sendFile(path.join(__dirname, '..', 'views', 'history.html'));
}

export const getHistoryData = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({ order: [['createdAt', 'DESC']] });
        
        const plainExpenses = expenses.map(e => e.get({ plain: true }));
        // Calculate total on the fly
        

        // res.json(plainExpenses);
        // const totalAmount = await Expense.sum('amount') || 0;
        const totalSum = plainExpenses.reduce((sum, item) => sum + Number(item.amount), 0)

        // // 3. Send both to the frontend
        res.json({
            expenses: plainExpenses,
            total: totalSum.toFixed(2) // Format to 2 decimal places
        });
    } catch (err) {
        next(err);
    }
};


// export const postDeletePrompt = async (req, res, next) => {
//     try {
//         const id = req.body.promptId;
//         console.log("--- Attempting to delete ID:", id); // Check if this is a long string
//         const deletedCount =await Expense.destroy({ where: { id: id } });
//         console.log(`Deleted ${deletedCount} record(s).`);
//         res.redirect('/');
//     } catch (err) {
//         console.error("Delete Error:", err);
//         next(err);
//     }
// };
export const postDeletePrompt = async (req, res, next) => {
    try {
        // Log the body so you can see exactly what names are arriving
        console.log("Body Received:", req.body);

        // Make sure 'expenseId' matches the 'name' attribute in your HTML form
        const id = req.body.expenseId; 

        if (!id) {
            throw new Error("No ID provided for deletion");
        }

        await Expense.destroy({ where: { id: id } });
        res.redirect('/');
    } catch (err) {
        console.error("Delete Error:", err.message);
        next(err);
    }
};
