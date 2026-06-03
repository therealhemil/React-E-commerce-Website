import express from 'express'
import { upload } from '../../config/multerS3Config.js'
import { addProductDetails } from '../controller/product_controller.js'

const router = express.Router()

router.post("/admin/api/add/product", upload.array('images', 5), addProductDetails)



export default router