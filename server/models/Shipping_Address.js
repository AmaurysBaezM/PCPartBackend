import {DataTypes} from 'sequelize'
import {sequelize} from "../database/database.js"
import {User} from "./Users.js"






export const Shipping_Address = sequelize.define('Shipping_Address', {
    AddressID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    AddressLine1:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressLine2:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressLine3:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressCity:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressState:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressPostalCode:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    AddressCountry:{
        type: DataTypes.TEXT,
        allowNull: false
    },
  
  
    
    






},{    timestamps: false,  tableName: 'Shipping_Address'},)

