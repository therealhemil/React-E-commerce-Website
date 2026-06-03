//.env file config


import express from 'express'
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//mysql2 database config 
import { db } from "./config/database.js";

// imports routes
import auth_routes from './routes/auth_routes.js'
import admin_category_routes from './admin/routes/admin_category_routes.js'
import admin_brand_routes from './admin/routes/admin_brand_routes.js'
import admin_product_routes from './admin/routes/admin_product_routes.js'

// routes call
app.use("/", auth_routes)
app.use("/", admin_category_routes)
app.use("/", admin_brand_routes)
app.use("/", admin_product_routes)



app.get('/', (req, res) => res.send("Server is running on PORT 3000"))

//check if database sync or not
db.sync().then(() => {
    console.log("Database is synced");
}).catch(err => {
    console.log("Error Database Syncing", err.message);
})


//listen server port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`));