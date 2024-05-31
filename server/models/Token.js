import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"



export const Token = sequelize.define('Tokens', {
    TokenID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    TokenRefresh:{
        type: DataTypes.STRING,
        allowNull: false
    },
    TokenAccess:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    






},)