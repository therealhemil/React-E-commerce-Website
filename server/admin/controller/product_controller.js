import crypto from "crypto";
import { BrandsQuery, categoriesQuery, productQuery } from "../../models/relations_model.js";
import { where } from "sequelize";

const generateFileUrl = (files) => {
    return files.map(file => {
        return `https://${process.env.CLOUDFRONT_URL}/${file.key}`;
    });
};


const generateProduct_SKU = (categoryName, brandName) => {
    const categoryCode = categoryName.substring(0, 3).toUpperCase()

    const brandCode = brandName.substring(0, 3).toUpperCase()

    const randomCode = crypto.randomBytes(2).toString('hex').toUpperCase()

    return `${categoryCode}-${brandCode}-${randomCode}`
}



export const addProductDetails = async (req, res) => {

    const {
        product_name,
        category_uuid,
        brand_uuid,
        product_size,
        product_weight,
        product_length,
        product_width,
        details,
        product_mrp,
        product_offer_price,
        product_quantity,
        product_available_quantity
    } = req.body

    let product_color = JSON.parse(req.body.product_color)

    if (!product_name || !category_uuid || !brand_uuid) {
        return res.status(400).json({
            message: "Required Fields Missing",
            type: 'error'
        })
    }

    try {

        const findCategory = await categoriesQuery.findOne({
            where: {
                uuid: category_uuid,
                isDeleted: false
            }
        })

        if (!findCategory) {
            return res.status(404).json({
                message: 'Category Not Found',
                type: 'error'
            })
        }

        const findbrand = await BrandsQuery.findOne({
            where: {
                uuid: brand_uuid,
                isDeleted: false
            }
        })

        if (!findbrand) {
            return res.status(404).json({
                message: "Brand Not Found",
                type: "error"
            });
        }

        const existingProduct = await productQuery.findOne({
            where: {
                name: product_name,
                category_uuid: category_uuid,
                brand_uuid: brand_uuid
            }
        })

        if (existingProduct) {
            return res.status(200).json({
                already: true,
                message: "Product already exists",
                type: 'error'
            })
        }

        //generate SKU
        const product_SKU = generateProduct_SKU(findCategory.name, findbrand.name)

        //parse Details
        let productDetails = {}
        if (details) {
            productDetails = typeof details === 'string' ? JSON.parse(details) : details
        }


        //upload images
        let uploadedImages = []
        console.log("Received Images", req.files);


        if (req.files && req.files.length > 0) {
            uploadedImages = generateFileUrl(req.files)
        }






        const product = await productQuery.create({
            name: product_name,
            category_uuid: findCategory.uuid,
            brand_uuid: findbrand.uuid,
            product_SKU: product_SKU,
            product_mrp: product_mrp,
            product_offer_price: product_offer_price,
            product_images: uploadedImages,
            product_quantity: product_quantity,
            product_available_quantity: product_available_quantity,
            product_specification: productDetails,
            product_color: product_color,
            product_size: product_size,
            product_weight: product_weight,
            product_length: product_length,
            product_width: product_width,
        })

        return res.status(201).json({
            already : false,
            message: `${product_name}, Product Added Successfully`,
            type: "success"
        });

    } catch (err) {
        console.log("Add Product Controller Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            type: "error"
        });

    }

}



//get all product 
export const getallproducts = async (req, res) => {
    try {
        const getallproducts = await productQuery.findAll({
            // attributes: ['id', 'uuid', 'product_images', 'name', 'product_mrp', "product_offer_price", 'product_quantity', "product_available_quantity", 'createdAt', 'category_uuid', 'brand_uuid', 'product_specification'],
            order: [['id', 'ASC']]
        }, { where: { product_isDeleted: false } })

        return res.status(200).json({
            getallproducts,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            success: false
        });
    }


}


//delete product by uuid
export const deleteProduct = async (req, res) => {
    const { uuid } = req.params

    try {
        await productQuery.update(
            { product_isDeleted: true },
            {
                where: { uuid }
            })

        return res.status(200).json({
            message: 'Product Deleted Successfully',
            type: 'success'
        })

    } catch (err) {
        console.log("Delete Product Error:", err);
        return res.status(500).json({
            messge: "Server Error",
            type: 'error'
        })

    }
}



//Update Product by uuid
export const UpdateProduct = async (req, res) => {
    console.log('Body', req.body);
    console.log('Files', req.files);


    try {
        const {
            product_uuid,
            product_name,
            product_color,
            product_size,
            product_weight,
            product_length,
            product_width,
            product_specification,
            product_mrp,
            product_offer_price,
            product_quantity,
            product_available_quantity,
            existing_images
        } = req.body


        if (!product_uuid) {
            return res.status(500).json({
                message: 'Product UUID Required',
                type: 'error'
            })
        }

        const product = await productQuery.findOne({
            where: { uuid: product_uuid }
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not Found",
                type: 'error'
            })
        }


        let productImages = []

        if (existing_images) {
            productImages = JSON.parse(existing_images)
        }

        if (req.files.length > 0) {
            const uploadingImages = generateFileUrl(req.files)
            productImages = [...productImages, ...uploadingImages]
        }


        const updatedProduct = await product.update({
            name : product_name,
            product_color: JSON.parse(product_color),
            product_size : product_size,
            product_weight : product_weight,
            product_length : product_length,
            product_width : product_width,
            product_specification: JSON.parse(product_specification),
            product_mrp : product_mrp,
            product_offer_price : product_offer_price,
            product_quantity : product_quantity,
            product_available_quantity : product_available_quantity,
            product_images: productImages,
        });

        return res.status(200).json({
            message : 'Product Update Successfully',
            updatedProduct,
            type : 'success'
        })

    } catch (err) {
        console.log('Update Product Error:', err);
        return res.status(500).josn({
            message : 'Server Error',
            type : 'error'
        })
        
    }

}





