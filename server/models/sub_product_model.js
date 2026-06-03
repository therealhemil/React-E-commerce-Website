import { DataTypes } from "sequelize";
import { db } from "../config/database";

export const subProductQuery = db.define("sub_product_details",{
    uuid : {
        type : DataTypes.STRING,
        unique : true
    },
    sub_product_color: {
        type : DataTypes.JSON,
        defaultValue :[]
    },
    sub_product_size: {
        type : DataTypes.JSON,
        defaultValue :[]
    }
})