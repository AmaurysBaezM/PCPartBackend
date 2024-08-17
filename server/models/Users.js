import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {Token} from "./Token.js"
import {Shopping_Cart} from "./Shopping_Cart.js"
import {Shipping_Address} from "./Shipping_Address.js"


export const User = sequelize.define('Users', {
    UserID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    UserName:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    UserLastname:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    UserEmail:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    UserPasswords:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    UserSalt:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    UserHashedpassword:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    UserPhone:{
        type: DataTypes.TEXT,
        allownull: false
    },
    UserCreatedAt:{
        type: DataTypes.DATE,
        
    },
    UserUpdatedAt:{
        type: DataTypes.DATE,
       
    },
    
    






},{    timestamps: false})

User.hasMany(Token, {
    foreignKey: 'ID_User',
    sourceKey:'UserID' 
})

Token.belongsTo(User, {
    foreignKey: 'ID_User',
    targetId:'TokenID' 
})
User.hasMany(Shopping_Cart, {
    foreignKey: 'ID_User',
    sourceKey:'UserID' 
})

Shopping_Cart.belongsTo(User, {
    foreignKey: 'ID_User',
    targetId:'CartID' 
})
User.hasMany(Shipping_Address, {
    foreignKey: 'ID_User',
    sourceKey:'UserID' 
})

Shipping_Address.belongsTo(User, {
    foreignKey: 'ID_User',
    targetId:'AddressID' 
})