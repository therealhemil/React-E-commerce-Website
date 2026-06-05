import express from 'express'
import { upload } from '../../config/multerS3Config.js'
import { addProductDetails, deleteProduct, getallproducts, UpdateProduct } from '../controller/product_controller.js'

const router = express.Router()

router.post("/admin/api/add/product", upload.array('images', 5), addProductDetails)

//get all product details
router.get('/admin/api/get/productDetail', getallproducts)

//delete product
router.delete('/admin/api/delete/product/:uuid', deleteProduct)


//update product
router.put('/admin/api/update/product',upload.array('images', 5), UpdateProduct)


export default router