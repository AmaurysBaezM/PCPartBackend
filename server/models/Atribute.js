import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {Spec} from "./Specs.js"

export const Atribute = sequelize.define('Atribute', {
    AtributeID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    AtributeName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    






},{    timestamps: false,  tableName: 'Atribute'},)

Atribute.hasMany(Spec, {
    foreignKey: 'ID_Atribute',
    sourceKey:'AtributeID' 
})

Spec.belongsTo(Atribute, {
    foreignKey: 'ID_Atribute',
    targetId:'SpecID' 
})
