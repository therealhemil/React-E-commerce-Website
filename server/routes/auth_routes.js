import express from 'express'
import { signUp_controller } from '../user/controller/signUp_controller.js'
import { User_login_controller } from '../user/controller/user_login_controller.js'
import { Admin_login_controller } from '../admin/controller/admin_login_controller.js'

const router = express.Router()

//User Signup Route
router.post('/user/api/sign_up',signUp_controller )

//User Login Route
router.post('/user/api/login', User_login_controller)

//Admin Login Route
router.post('/admin/api/login', Admin_login_controller)


export default router