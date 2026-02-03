import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url';

import db from '../util/database.js'
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename);

const p = path.join(__dirname,'..','data','data.json');

export class Prompt{
    constructor(category,text, response = null){
        this.id = crypto.randomUUID();
        this.category = category;
        this.text = text;
         this.response = response; // New field
    }
        save(){
          return db.query(
            // 'INSERT INTO prompts (category, text) VALUES ($1, $2)',
            // [this.category, this.text]
            'INSERT INTO prompts (id,category,text,response) VALUES ($1,$2,$3,$4)',
            [this.id,this.category, this.text,this.response]
          );
        
       }
     static fetchAll(category) {
       if (category && category !== 'all') {
        return db.query(
            'SELECT * FROM prompts WHERE category = $1 ORDER BY created_at DESC', 
            [category]
        );
    }
    // Default: Get everything
    return db.query('SELECT * FROM prompts ORDER BY created_at DESC');
}
       static deleteById(id){
        return db.query('DELETE FROM prompts WHERE id = $1::uuid', [id]);
       }
}


