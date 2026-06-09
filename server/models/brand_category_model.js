import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { BrandsQuery } from "./brands_model.js";
import { categoriesQuery } from "./categories_model.js";

const brand_categoryQuery = db.define('brand_category', {
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
    category_uuid: {
        type: DataTypes.UUID,
        references: { model: categoriesQuery, key: 'uuid' }
    },
})

export { brand_categoryQuery }