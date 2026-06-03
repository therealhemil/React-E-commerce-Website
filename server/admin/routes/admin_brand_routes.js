import express from 'express'
import { addBrandsInCategory, brandImageandMoreDetails, getbrandDetail } from '../controller/brand_controller.js'
import { upload } from '../../config/multerS3Config.js'

const router = express.Router()

// add brand name in category name
router.post("/admin/api/add/brand", addBrandsInCategory)

//get brand detail
router.get("/admin/api/get/brandDetail", getbrandDetail)


// update brand more details
router.post("/admin/api/brand/imageUpload", upload.array("image", 1), brandImageandMoreDetails)


export default router