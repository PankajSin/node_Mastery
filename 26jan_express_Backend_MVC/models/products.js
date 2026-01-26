// models/product.js
import path  from 'path';
import  fs  from 'fs';
import{ fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname,'..','data','product.json');


const products = [];

export class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(p,(err,fileContent)=>{
      let products = [];
          if(!err){
            products = JSON.parse(fileContent);  // turn the fileContent into an array:
          }
          // Add the NEW product to the array
            products.push(this);
          
          fs.writeFile(p,JSON.stringify(products),(err) =>{
          if(err){
            console.log(err);
          }
        });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p,(err,fileContent)=>{
      if(err){
         cb([]);
      }else{
         cb(JSON.parse(fileContent));
      }
    });
  }
}

