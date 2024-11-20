import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    value: {
        type: DataTypes.JSONB,
    }
}, {
    timestamps: true,
});


