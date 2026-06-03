import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

const UserQuery = db.define("users", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_code: {
        type: DataTypes.STRING(4),
        allowNull: true
        // allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(10),
        allowNull: true,
        // allowNull: false,
    },
    billing_address: {
        type: DataTypes.STRING,
    },
    shipping_address: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: 'user'
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isphoneNumVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verification_token: {
        type: DataTypes.STRING,
        allowNull: true
    },

    verification_token_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },

    reset_password_token_expires: {
        type: DataTypes.DATE,
        allowNull: true
    }

})


export { UserQuery }