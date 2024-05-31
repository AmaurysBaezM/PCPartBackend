import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {Product} from "./Products.js"


export const Brand = sequelize.define('Brand', {
    BrandID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    BrandName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    






},{    timestamps: false,  tableName: 'Brand'},)

Brand.hasMany(Product, {
    foreignKey: 'ID_Brand',
    sourceKey:'BrandID' 
})

Product.belongsTo(Brand, {
    foreignKey: 'ID_Brand',
    targetId:'ProductID' 
})