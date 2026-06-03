import express from 'express'
import { categoriesnameAdd, categoryImageAndDetailsUpload, getcategoriesName, getcategoriesNameOnly } from '../controller/category_controller.js'
import { upload } from '../../config/multerS3Config.js'

const router = express.Router()

//category name add
router.post('/admin/api/add/categories', categoriesnameAdd)

//get new category in frontend
router.get("/admin/api/get/categories", getcategoriesName)

//get category name only in frontend
router.get("/admin/api/get/categories/name", getcategoriesNameOnly)

//category image Uploading
// router.post('/admin/api/imageupload/:name', upload.array('images', 1), categoryImageUplaod)
router.post('/admin/api/imageupload', upload.array('image', 1), categoryImageAndDetailsUpload)

// router.put('/admin/api/add/category/details/:name', addCategoryDetails)


export default router