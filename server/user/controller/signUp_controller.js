import { UserQuery } from "../../models/user_model.js";
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from "path";
import { tokenExpiry, verificationToken } from "../../utils/generate_token.js";
import { sendMail } from "../../utils/sendmail.js";


 export const signUp_controller = async (req, res) => {
    console.log("Request Parameters:", req.body);
    const { first_name, last_name, email, password, confirm_password, country_code, phone_number } = req.body

    try {
        const isemailExist = await UserQuery.findOne({ where: { email } })
        if (isemailExist) {
            if (isemailExist.isEmailVerified) {
                return res.status(200).json({
                    message: "Account already created!, Please Login",
                    type: 'success',
                    redirect : true
                })
            } else {
                await isemailExist.update({
                    verification_token: verificationToken,
                    verification_token_expires: tokenExpiry
                })

                const email_Verification_link = `http://localhost:5173/${isemailExist.id}/verification_email/${verificationToken}`
                console.log("Resent-Verification link Send:", email_Verification_link);

                //send mail
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
                    isemailExist.first_name
                )
                htmlTemplate = htmlTemplate.replaceAll(
                    "{{email}}",
                    isemailExist.email
                )

                // replace dynamic values
                htmlTemplate = htmlTemplate.replaceAll(
                    "{{verification_link}}",
                    email_Verification_link
                )

                console.log(htmlTemplate);


                const mailstatus = await sendMail(
                    isemailExist.email,
                    "Verify Email of E-commerce Platform",
                    htmlTemplate
                )
                console.log("Mail Status:", mailstatus);

                return res.status(200).json({
                    message : 'Account Created!, Verification E-mail sent',
                    type : 'success',
                    userId : isemailExist.id,
                    redirect : true
                })
            }

        } else {
            //brefore create new entry password convert into hashpassword
            const saltRounds = 10
            const hashpassword = await bcrypt.hash(password, saltRounds)

            //create new user entry
            const newUser = await UserQuery.create({
                first_name,
                last_name,
                email,
                password: hashpassword,
                country_code,
                phone_number
            })

            const email_Verification_link = `http://localhost:5173/${newUser.id}/verification_email/${verificationToken}`
                console.log("New User Signup Verification Link Send:", email_Verification_link);

                //send mail
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
                    newUser.first_name
                )
                htmlTemplate = htmlTemplate.replaceAll(
                    "{{email}}",
                    newUser.email
                )

                // replace dynamic values
                htmlTemplate = htmlTemplate.replaceAll(
                    "{{verification_link}}",
                    email_Verification_link
                )

                console.log(htmlTemplate);


                const mailstatus = await sendMail(
                    newUser.email,
                    "Verify Email of E-commerce Platform",
                    htmlTemplate
                )
                console.log(" New User Signup Mail Status:", mailstatus);

            return res.status(200).json({
                success : true,
                message: `${first_name} ${last_name}, Signup Successfully`,
                message2 : "Verfication Link Sent to your E-mail Id.",
                type : 'success',
                userId : newUser.id,
                redirect : true
            })

        }

    } catch (err) {
        console.log("Signup User Error:", err);
        return res.json({
            message : "Server Error",
            type : 'error'
        })
    }

}