import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename);

const p = path.join(__dirname,'..','data','data.json');
const arr = [];

export class Prompt{
    constructor(category,text){
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
}


