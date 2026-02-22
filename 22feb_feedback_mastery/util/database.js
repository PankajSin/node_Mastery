import { Sequelize } from "sequelize";
// Thinking: "I need to pull the secrets I put in .env"
const sequelize = new Sequelize(
         process.env.DB_NAME,
         process.env.DB_USER,
         process.env.DB_PASSWORD,
         {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false //"Keep the terminal clean for now"
         }
);
export default sequelize;
