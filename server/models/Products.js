import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {Spec} from "./Specs.js"



export const Product = sequelize.define('Products', {
    ProductID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    ProductName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    ProductPrice:{
        type: DataTypes.DECIMAL(19,4),
        allowNull: false
    },
    ProductAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
    
    






},{    timestamps: false,  tableName: 'Products'},)


Product.hasMany(Spec, {
    foreignKey: 'ID_Product',
    sourceKey:'ProductID' 
})

Spec.belongsTo(Product, {
    foreignKey: 'ID_Product',
    targetId:'SpecID' 
})

