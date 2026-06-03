// const generateOTP = () => {
//     return Math.floor(
//         100000 + Math.random() * 900000
//     ).toString()
// }

// export default generateOTP

import crypto from 'crypto'

const verificationToken = crypto.randomBytes(32).toString("hex")
const tokenExpiry = new Date(Date.now() + 30 * 60 * 1000)


//generate reset token
const reset_pass_token = crypto.randomBytes(32).toString("hex");


export { verificationToken, tokenExpiry, reset_pass_token }