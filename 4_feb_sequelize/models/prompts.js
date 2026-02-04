import { DataTypes } from 'sequelize';
import sequelize from '../util/database.js';

const Prompt = sequelize.define('prompt', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    response: {
        type: DataTypes.TEXT
    },
}, {
    // FORCE the exact table name you created in pgAdmin
    tableName: 'prompts', 
    timestamps: true // Sequelize will want to add createdAt/updatedAt
});

export default Prompt;
