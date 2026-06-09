

import { brand_categoryQuery } from "../../models/brand_category_model.js";
import { BrandsQuery, categoriesQuery } from "../../models/relations_model.js"


export const addBrandsInCategory = async (req, res) => {
    const { brand_name, category_uuid } = req.body

    if (!brand_name || !category_uuid) {
        return res.status(400).json({
            message: "All fields are required",
            type: "error"
        });
    }

    try {
        const category = await categoriesQuery.findOne({
            where: {
                uuid: category_uuid
            }
        })

        if (!category) {
            return res.status(404).json({
                message: "Category Not Found",
                type: 'error'
            });
        }

        const brand = await BrandsQuery.create({
            name: brand_name
        })

        await brand_categoryQuery.bulkCreate(category_uuid.map(catId => ({
            brand_uuid : brand.uuid,
            category_uuid : catId
        })))

        return res.status(201).json({
            message: "Brand Added Successfully",
            brand,
            type: 'success',
            success: true
        })
    } catch (err) {
        console.log("Brand Add Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            type: "error"
        });
    }


}


export const getbrandDetail = async (req, res) => {
    try {
        const getbrandDetail = await BrandsQuery.findAll({
            attributes: ['id', 'uuid', 'category_uuid', 'name', 'brand_image'],
            order: [['id', 'ASC']],
            include : brand_categoryQuery
        })

        const getcategoryNameOnly = await categoriesQuery.findAll({
            attributes: ['uuid', 'name'],
            order: [['id', 'ASC']], 
            include : brand_categoryQuery
        })


        const category_hash = {}
        getcategoryNameOnly.forEach((category) => {
            category_hash[category.uuid] = {
                category_uuid: category.uuid,
                category_name: category.name
            }
        })


        const brand_hash = {}
        getbrandDetail.forEach((brand) => {

            brand_hash[brand.uuid] = {
                brand_id: brand.id,
                brand_name: brand.name,
                brand_uuid: brand.uuid,
                brand_image: brand.brand_image,
                category_uuid: brand.category_uuid,
                category: category_hash[brand.category_uuid] || null
            }
        })

        return res.status(200).json({
            brand_hash,
            getbrandDetail,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            success: false
        });
    }
}


const generateFileUrl = (files) => {
    return files.map(file => {
        return `https://${process.env.CLOUDFRONT_URL}/${file.key}`
    })
}

export const brandImageandMoreDetails = async (req, res) => {
    const { uuid } = req.body;

    if (!uuid) {
        return res.status(404).json({
            message: "First Add Brand",
            type: "error"
        });
    }

    try {
        const Brand = await BrandsQuery.findOne({
            where: {
                uuid: uuid,
                isDeleted: false
            }
        });

        if (!Brand) {
            return res.status(404).json({
                message: "Brand Not Found",
                type: "error"
            });
        }


        let uploadedImage = Brand.brand_image || [];

        console.log("Brand Uploaded image", req.files);

        // Upload Images
        if (req.files && req.files.length > 0) {

            console.log(
                "Admin Uploaded Brand Image:",
                req.files
            );

            uploadedImage = generateFileUrl(req.files);
        }

        // Update Category
        await Brand.update({
            brand_image: uploadedImage
        });

        return res.status(200).json({
            message: "Brand Updated Successfully",
            brand_image: uploadedImage,
            type: "success"
        });

    } catch (err) {
        console.log("Brand Upload Controller Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            type: "error"
        });
    }
};



export const getbrand_categoryDetails = async (req, res) => {
    try {
        const getbrandDetail = await BrandsQuery.findAll({
            attributes: ['id', 'uuid', 'name', 'brand_image'],
            order: [['id', 'ASC']],
            
        })

        const getcategoryNameOnly = await categoriesQuery.findAll({
            attributes: ['uuid', 'name'],
            order: [['id', 'ASC']]
        })


        const unique_brand = {}
        getbrandDetail.forEach((brand) => {
            if (!unique_brand[brand.name]) {
                unique_brand[brand.name] = {
                    uuid: brand.uuid,
                    name: brand.name,
                    brand_image: brand.brand_image
                }
            }
        })


        return res.status(200).json({
            unique_brand: Object.values(unique_brand),
            getcategoryNameOnly,
            success: true
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Server Error',
            success: false
        });
    }

}


