import { Sequelize } from "sequelize";
import 'dotenv/config'


//require database credentials
const db = new Sequelize(
    process.env.DB_DBNAME || 'react_e-commerce_db',
    process.env.DB_USERNAME || 'root',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
)

//check if databse is connected or not
const connection = () => {
    db.authenticate()
        .then(() => {
            console.log("Mysql Connected Successfully");
        })
        .catch(err => {
            console.log("Mysql Error:", err.message);

        })
}

// call connection
connection()


export {db}