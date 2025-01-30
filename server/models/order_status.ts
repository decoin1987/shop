import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {stringSlugify} from "../utils/helpers";
import {bool} from "yup";

interface OrderStatusAttributes {
    id?: string;
    title: string;
    description: string;
    value: number;
    time: number;
}
/*
* Read - 1 or 0
* Change - 1 or 0
* Create - 1 or 0
*/

// Тип для создания нового тега
type OrderStatusCreationAttributes = Optional<OrderStatusAttributes, 'id'>;

class OrderStatus extends Model<OrderStatusAttributes, OrderStatusCreationAttributes> implements OrderStatusAttributes {
    declare id: string; // primary key
    declare title: string;
    declare description: string;
    declare value: number;
}

OrderStatus.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    time: {
        type: DataTypes.INTEGER,
    },
    value: {
        type: DataTypes.INTEGER,
    },

}, {
    sequelize,
    modelName: 'order_status',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default OrderStatus;