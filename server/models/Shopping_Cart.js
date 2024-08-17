import {DataTypes, QueryTypes} from 'sequelize'
import {sequelize} from "../database/database.js"


export const Shopping_Cart = sequelize.define('Shopping_Cart', {
    CartID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    CartAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    






},{    timestamps: false,  tableName: 'Shopping_Cart'},)