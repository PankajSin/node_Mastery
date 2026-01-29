import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename);

const p = path.join(__dirname,'..','data','data.json');
const arr = [];

export class Prompt{
    constructor(category,text){
        this.id = Math.random().toString();
        this.category = category;
        this.text = text;
    }
        save(cb){
            //   let arr = [];
              fs.readFile(p,(err,file)=>{
                  let arr = [];
                  if(!err){
                     arr = JSON.parse(file);
                  }
                   arr.push(this);
             
              fs.writeFile(p,JSON.stringify(arr,null,2),(err)=>{
                if(err){
                    console.error(err);
                }
                if (cb) cb(); 
              });  
         });     
       }
      static fetchAll(cb){
        fs.readFile(p,(err,file)=>{
             if(err){
            cb([]);
           }else{
              cb(JSON.parse(file));
           }
        });    
       }
       static deleteById(id,cb){
           fs.readFile(p,(err,fileContent)=>{
            if(err) return cb();

            const allPrompts = JSON.parse(fileContent);

            console.log('Target ID:', id);
            console.log('First ID in file:', allPrompts[0].id);
            // This keeps everything EXCEPT the ID we want to delete
            // const updatedPrompts = allPrompts.filter( prod => prod.id !== id);

            // const updatedPrompts = allPrompts.filter(p => {
            //        console.log(`Comparing: ${p.id} vs ${id}`); // Look at your terminal!
            //       return p.id !== id;
            //      });

            // Use .toString() on both sides to be 100% sure they match
             const updatedPrompts = allPrompts.filter(p => p.id.toString() !== id.toString());



            console.log('Before:', allPrompts.length, 'After:', updatedPrompts.length);

            fs.writeFile(p,JSON.stringify(updatedPrompts,null,2),(err)=>{
                if(!err){
                    cb();
                }
            });
           });
       }
}


