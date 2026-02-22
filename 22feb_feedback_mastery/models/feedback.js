import { DataTypes } from "sequelize";
import sequelize from '../util/database.js';

// What columns / how much columns .. my side do I actually need for a simple feedback?"

const Feedback = sequelize.define('feedback', { // what is 'feedback' here
       id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
       },
       text:{
        type: DataTypes.TEXT,
        allowNull:false
       },
       sentiment:{
        type: DataTypes.STRING,
        defaultValue:'pending' // Thinking: "AI will fill this later"
       }
}     
);
export default Feedback;
