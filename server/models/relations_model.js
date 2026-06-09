import { brand_category } from "./brand_catgeory_model.js";
import { BrandsQuery } from "./brands_model.js";
import { categoriesQuery } from "./categories_model.js";
import { productQuery } from "./product_model.js";


// // Category -> Brand
// categoriesQuery.hasMany(BrandsQuery, {
//     foreignKey: 'category_uuid',
//     sourceKey: 'uuid'
// })

BrandsQuery.belongsToMany(categoriesQuery, {
    through : brand_category,
    foreignKey: "category_uuid",
    otherKey : 'brand_uuid',
    sourceKey: 'uuid'
})


categoriesQuery.belongsToMany(brand_category,{
    through : brand_category,
    foreignKey: 'brand_uuid',
    otherKey : 'category_uuid',
    sourceKey: 'uuid'
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