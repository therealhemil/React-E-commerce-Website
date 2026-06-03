import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

export const BrandsQuery = db.define("product_brands", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        unique : true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    brand_image: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})