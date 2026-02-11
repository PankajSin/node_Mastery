import { DataTypes } from 'sequelize';
import sequelize from '../util/database.js';

const Expense = sequelize.define('expense', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    description: { type: DataTypes.STRING, allowNull: false }, // "Uber to office"
    amount: { type: DataTypes.FLOAT, allowNull: false },      // 250
    category: { type: DataTypes.STRING, allowNull: false },   // "Travel"
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Expense;
