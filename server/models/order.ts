import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Status} from "./status";


export const Order = sequelize.define('order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    value: {
        type: DataTypes.JSONB,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    raw_status: {
        type: DataTypes.JSON,
    },
}, {
    timestamps: true
});

Status.hasMany(Order, { as: 'status'})




