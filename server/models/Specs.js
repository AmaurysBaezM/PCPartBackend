import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"


export const Spec = sequelize.define('Specs', {
    SpecID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    SpecValue:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    






},{    timestamps: false,  tableName: 'Specs'},)