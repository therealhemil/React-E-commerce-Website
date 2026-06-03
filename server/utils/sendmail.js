import { BrevoClient } from '@getbrevo/brevo'
import dotenv from "dotenv"
dotenv.config()


const Client = new BrevoClient({
    apiKey: process.env.BREVO_MAIL_API
})

//SEND Mail
const sendMail = async (to, subject, htmlContent) => {
    try {
        console.log("Sending Mail To:", to)

        const response = await Client.transactionalEmails.sendTransacEmail({
            sender: {
                name: `E-commerce Platform`,
                email: 'patelhemil444@gmail.com'
            },
            to: [
                {
                    email: to
                }
            ],
            subject,
            htmlContent
        })
        console.log("Email Sent Successfully", response)
        console.log('Brevo Response', response);
        return true
        

    } catch (err) {
        console.log("Brevo Mail Error:", err)
        console.log(err);
        return false
        
    }
}

export { sendMail }