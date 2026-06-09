import { UserQuery } from "../../models/user_model.js";
import { tokenExpiry, verificationToken } from "../../utils/generate_token.js";
import fs from 'fs'
import path from "path";
import { sendMail } from "../../utils/sendmail.js";
import { createUserAuthToken, setUserAuthCookie } from "../../utils/jwt.js";
import bcrypt from 'bcrypt'


//userlogin
export const User_login_controller = async (req, res) => {
    const { email, password } = req.body
    console.log("User Login Request Body Data:", req.body);

    try {
        //find user query
        const existinguser = await UserQuery.findOne({ where: { email } })

        if (existinguser && !existinguser.password) {
            return res.json({
                message: "User login via Google",
                type: "error"
            })
        }
        if (!existinguser.isEmailVerified) {
            // update
            await existinguser.update({
                verification_token: verificationToken,
                verification_token_expires: tokenExpiry
            });

            // new link
            const email_verificationLink = `http://localhost:5173/${existinguser.id}/verification_email/${verificationToken}`;

            console.log("User Login When Email is not Verified and send verification Link", email_verificationLink);

            // send mail here
            //template path
            const templatePath = path.join(
                process.cwd(),
                'Mail Templates',
                'email_verification_link.html'
            )
            let htmlTemplate = fs.readFileSync(
                templatePath,
                'utf-8'
            )

            // replace dynamic values
            htmlTemplate = htmlTemplate.replaceAll(
                "{{first_name}}",
                existinguser.first_name
            )
            htmlTemplate = htmlTemplate.replaceAll(
                "{{email}}",
                existinguser.email
            )

            // replace dynamic values
            htmlTemplate = htmlTemplate.replaceAll(
                "{{verification_link}}",
                email_verificationLink
            )

            console.log(htmlTemplate);


            const mailstatus = await sendMail(
                existinguser.email,
                "Verify Email of E-commerce Platform",
                htmlTemplate
            )
            console.log("Login User without Email Verify Send Mail Status:", mailstatus);

            return res.json({
                success : true,
                message: "Email is not Verified!",
                message2: "Verification Mail Sent to your Mail id",
                type: "error",
                email: existinguser.email,
                resend: true,
                userId: existinguser.id
            })
        }

        //check email is existed
        if (!existinguser) {
            return res.json({
                message: "User Not Found!",
                type: "error"
            })
        }

        if (existinguser.role === 'admin') {
            return res.json({
                message: "Admin Did not Login, Only User Can",
                type: 'error'
            })
        }

        //compare user password and datanase password
        const userPassword = await bcrypt.compare(password, existinguser.password)

        //enter password wrong
        if (!userPassword) {
            return res.json({
                pass : false,
                message: "Enter Wrong Password",
                type: "error"
            })
        } else {
            const role = existinguser.role
            if (role === "user") {
                const token = createUserAuthToken(existinguser)
                console.log("Generate User Login Token:", token);


                //set token in cookie
                setUserAuthCookie(res, token)
                return res.json({
                    userId: existinguser.id,
                    message: `Welcome ${existinguser.first_name}`,
                    type: "success"
                })

            }

        }

    } catch (err) {
        console.log("User login Dashboard Error:", err);
        return res.json({
            message : "Server Error",
            type: 'error'
        })

    }

}