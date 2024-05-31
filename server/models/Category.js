import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {Product} from "./Products.js"

export const Category = sequelize.define('Category', {
    CategoryID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    CategoryName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    






},{    timestamps: false,  tableName: 'Category'},)

Category.hasMany(Product, {
    foreignKey: 'ID_Category',
    sourceKey:'CategoryID' 
})

Product.belongsTo(Category, {
    foreignKey: 'ID_Category',
    targetId:'ProductID' 
})