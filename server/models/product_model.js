import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

export const productQuery = db.define("products", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        unique : true
    },
    uuid : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    name: {
        type: DataTypes.STRING
    },
    product_SKU: {
        type: DataTypes.STRING,
        unique : true
    },
    product_mrp: {
        type: DataTypes.STRING,
    },
    product_offer_price: {
        type: DataTypes.STRING,
    },
    product_images :{
        type : DataTypes.JSON,
        defaultValue : []
    },
    product_quantity: {
        type: DataTypes.INTEGER,
    },
    product_available_quantity: {
        type: DataTypes.INTEGER,
    },
    product_isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue : false
    },
    product_specification: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    product_color: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    product_size: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    product_weight : {
        type : DataTypes.STRING
    },
    product_length : {
        type : DataTypes.STRING
    },
    product_width : {
        type : DataTypes.STRING
    },
    sub_product_id: {
        type: DataTypes.JSON,
        defaultValue: []
    }
})