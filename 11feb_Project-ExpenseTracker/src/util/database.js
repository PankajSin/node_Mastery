import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
         logging: console.log,  // Set to console.log to see raw SQL in terminal
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },{
        dialect: 'postgres',
        logging: console.log // This will show the DELETE query in your terminal
    }
);

export default sequelize;
