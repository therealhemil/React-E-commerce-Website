import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

export const categoriesQuery = db.define("product_categories",{
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
    name : {
        type : DataTypes.STRING,
    },
    image : {
        type : DataTypes.JSON,
        // defaultValue: []
    },
    details : {
        type : DataTypes.STRING,
        // defaultValue : []
    },
    isDeleted: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
})