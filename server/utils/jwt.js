import dotenv from "dotenv"
dotenv.config()

import jwt from 'jsonwebtoken'


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_USER_SECRET_KEY = process.env.JWT_USER_SECRET_KEY
// console.log("JWT KEY in .env file", JWT_SECRET_KEY);



//generate Admin Token
const createAuthToken = (admin) => {
    return jwt.sign({
        id: admin.id,
        role: admin.role
    }, JWT_SECRET_KEY, { expiresIn: "1d" })
}

//set token into cookie
const setAuthCookie = (res, token) => {
    return res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    })
}


//clear cookie when admin/user logout
const logoutSession = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    })

    return res.json({ suceess: true, message: "Logout Successfully", type: "success" })
}



//create Auth Token for User
const createUserAuthToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role
    }, JWT_USER_SECRET_KEY, { expiresIn: "1d" })

}

//set token into cookie
const setUserAuthCookie = (res, token) => {
    return res.cookie('User_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    })
}

//clear cookie when admin/user logout
const logoutUserSession = (req, res) => {
    res.clearCookie("User_token", {
        httpOnly: true,
    })

    return res.json({ suceess: true, message: "Logout Successfully", type: "success" })
}


export { createAuthToken, setAuthCookie, logoutSession, createUserAuthToken, setUserAuthCookie,logoutUserSession }

