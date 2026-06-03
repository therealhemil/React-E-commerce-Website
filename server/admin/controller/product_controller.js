import crypto from "crypto";
import { BrandsQuery, categoriesQuery, productQuery } from "../../models/relations_model.js";

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
        product_color,
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
            where : {
                name : product_name,
                category_uuid : category_uuid,
                brand_uuid : brand_uuid
            }
        })

        if(existingProduct){
            return res.status(409).json({
                message : "Product already exists",
                type : 'error'
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

            // console.log("Image Url generate", uploadedImages);
            
        }

        // console.log("Images Store in variable", uploadedImages);
        

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
            message: `${product_name}, Product Added Successfully`,
            product,
            type: "success"
        });

    } catch (err) {
        console.log("Add Product Controller Error:",err);

        return res.status(500).json({
            message: "Internal Server Error",
            type: "error"
        });

    }

}






