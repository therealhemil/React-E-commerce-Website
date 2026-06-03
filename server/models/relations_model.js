import { BrandsQuery } from "./brands_model.js";
import { categoriesQuery } from "./categories_model.js";
import { productQuery } from "./product_model.js";


// Category -> Brand
categoriesQuery.hasMany(BrandsQuery, {
    foreignKey: 'category_uuid',
    sourceKey: 'uuid'
})

BrandsQuery.belongsTo(categoriesQuery, {
    foreignKey: "category_uuid",
    targetKey: "uuid"
})


// Brand -> Product
BrandsQuery.hasMany(productQuery, {
    foreignKey: 'brand_uuid',
    sourceKey: 'uuid'
})

productQuery.belongsTo(BrandsQuery, {
    foreignKey: 'brand_uuid',
    targetKey: 'uuid'
})


// category -> Product
categoriesQuery.hasMany(productQuery, {
    foreignKey: 'category_uuid',
    sourceKey: 'uuid'
})

productQuery.belongsTo(categoriesQuery, {
    foreignKey: 'category_uuid',
    targetKey: 'uuid'
})


export { categoriesQuery, BrandsQuery, productQuery}