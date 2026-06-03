import { UserQuery } from "../../models/user_model.js"
import bcrypt from 'bcrypt'
import { createAuthToken, setAuthCookie } from "../../utils/jwt.js"
import { logging } from "@getbrevo/brevo"
import { BrandsQuery } from "../../models/brands_model.js"
import { categoriesQuery } from "../../models/categories_model.js"
import { productQuery } from "../../models/product_model.js"


export const Admin_login_controller = async (req, res) => {
    const { email, password } = req.body

    try {
        const isAdmin = await UserQuery.findOne({ where: { email } })
        
        // trial
        const query1 = await BrandsQuery
        const query2 = await categoriesQuery
        const query3 = await productQuery

        
        if (!isAdmin) {
            return res.json({
                message: "Access Denied!",
                type: 'error'
            })
        }
        
        const role = isAdmin.role
        if (role !== 'admin') {
            return res.json({
                message: "Access Denied!",
                type: 'error'
            })
        }

        //compare password
        const isPassMatch = await bcrypt.compare(password, isAdmin.password)

        if (!isPassMatch) {
            return res.json({
                message: "Wrong Password",
                type: 'error'
            })
        } else {

            // if admin login
            const token = createAuthToken(isAdmin)
            console.log("Generate Admin Token:", token);

            // set token in cookie
            setAuthCookie(res, token)
            return res.json({
                message: "Welcome Admin Dashboard",
                type: 'success'
            })
        }

    } catch (err) {
        console.log('Admin Login Controller Error: ', err);
        return res.json({
            message: "Server Error",
            type: 'error'
        })

    }

}