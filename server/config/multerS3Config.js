import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./s3Config.js";


const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket: (req, file, cb) =>{
            cb(null, process.env.S3_BUCKET_NAME)
        },
        metadata : (req, file, cb) =>{
            cb(null, {fieldName : file.fieldname})
        },
        key : (req, file, cb)=>{
            console.log("File", file);
            cb(null, `category/${Date.now()}.${file.originalname.split(".")[1]}`)
        }
    })
})

export { upload }