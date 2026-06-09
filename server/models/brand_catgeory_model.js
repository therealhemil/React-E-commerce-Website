import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { BrandsQuery } from "./brands_model.js";
import { categoriesQuery } from "./categories_model.js";

const brand_category = db.define('brand_catgeory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    brand_uuid: {
        type: DataTypes.UUID,
        references: { model: BrandsQuery, key: 'uuid' }
    },
    catgeory_uuid: {
        type: DataTypes.UUID,
        references: { model: categoriesQuery, key: 'uuid' }
    },
})

export { brand_category }