import { DataTypes } from "sequelize";
import { db } from "../config/database";

export const OrderQuery = db.define("product_order", {
    product_id: {
        type: DataTypes.STRING,
        unique: true
    },

    user_id: {
        type: DataTypes.STRING,
        unique: true
    },
    order_date: {
        type: DataTypes.DATE
    },
    product_quantity: {
        type: DataTypes.STRING
    },
    product_amount: {
        type: DataTypes.STRING
    },
    is_paid: {
        type: DataTypes.ENUM("Completed", "Incompleted", "Failed", "Partially Paid")
    },
    billing_address: {
        type: DataTypes.STRING,
    },
    shipping_address: {
        type: DataTypes.STRING
    },
    is_order_return: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    coupon: {
        type: DataTypes.STRING
    }

})