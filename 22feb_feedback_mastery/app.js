import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});
 app.post('/submit-feedback',async(req,res)=>{
     const userText = req.body.userFeedback;
       try{
          const savedData = await Feedback.create({
            text : userText,
            //The Left Side (text) MUST match the column name you gave in your Sequelize Model.
            //text: { type: DataTypes.TEXT } // <--- This is the "Key" name in the DB
            //  The Right Side (userText) MUST match the variable name you created just 2 lines above from req.body.
            sentiment:'Thinking...'
          });
          console.log('Sucess! Saved with Id',savedData.id);
          res.redirect('/');
       }
       catch(err){
          console.error('Database error',err);
          res.status(500).send('Could not save feedback.');
       }
});
app.get('/all-feedback',async (req,res)=>{
    console.log("console.log(--- Someone is asking for the feedback list! ---)");//debugging
    try{//"Ask Sequelize to run 'SELECT * FROM feedbacks'"
        const results = await Feedback.findAll();
          let html = '<h1>All user Feedback</h1><ul>';//"Convert the database rows into a readable list"
          results.forEach(item =>{
             html += `<li>
                        //    ${item.text}
                           <form action="/delete-feedback" method="POST" style="display:inline;">
                              <input type="hidden" name="idToKill" value=${item.id}>
                              <button type ="submit">Delete</button>
                           </form>

                     <li>`;
                     //     This hidden input carries the ID to the server
          });
           html += `</ul> <br> <a href = "/">Go Back</a>`
           //deliver item to boqser
           res.send(html);
    }
    catch(err){
        console.error('Database Error',err);
        res.status(500).send('Could not load Feedback');
    }
});
app.post('/delete-feedback',async (req,res)=>{ 
    //line42 and line 59 action="/delete-feedback" === post('/delete-feedback'
    const feedbackId = req.body.idToKill;
    try{
        await Feedback.destroy({
            where: {id :feedbackId}
            //Go back to list
        });
        res.redirect('/all-feedback');
    }
    catch(err){

    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
import sequelize from './util/database.js';
import Feedback from './models/feedback.js';

// Thinking: "Don't start the post office until the filing cabinet (DB) is ready!"
sequelize.sync()
.then(()=>{
    console.log('--- Database is synced!---');
    app.listen(PORT,()=> console.log(`Sever LIve on ${PORT}`));
}).catch(err => console.log('DB Sync ERRor :' , err));