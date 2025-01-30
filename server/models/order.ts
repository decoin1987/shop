import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {sequelize} from "../utils/db.connect";
import TransactionStatus from "./transaction_status";
import Transaction from "./transaction";
import OrderStatus from "./order_status";


export interface OrderAttributes {
    id: string;
    anonymous: boolean;
    system_created_customer: object[];
    customer_discount: number;
    recipient: object[];
    address: object[];
    delivery_status: string;
    notification: string;
    amount: number;
}

// Тип для создания нового продукта
type ProductCreationAttributes = Optional<OrderAttributes, 'id' | 'address' | 'customer_discount'>;

class Order extends Model<OrderAttributes, ProductCreationAttributes> implements OrderAttributes {
    declare id: string; // primary key
    declare customer_discount: number; // customer general discount
    declare anonymous: boolean; // user not register
    declare system_created_customer: object[]; // customer user for unregistered site
    declare address: object[]; // primary key
    declare delivery_status: string; // primary key
    declare recipient: object[]; // primary key
    declare amount: number; // primary key
    declare notification: string; // primary key
}

Order.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customer_discount: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    system_created_customer: {
        type: DataTypes.JSONB,
        defaultValue: false
    },
    address: {
        type: DataTypes.UUID,
    },
    delivery_status: {
        type: DataTypes.UUID,
    },
    recipient: {
        type: DataTypes.JSONB,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    notification: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Определения связей

Order.hasMany(Transaction, { as: 'transaction', foreignKey: 'order_id' }, );
Transaction.belongsTo(Transaction, { as: 'order', foreignKey: 'order_id' });

OrderStatus.hasMany(Order, { as: 'order_status', foreignKey: 'order_status_id' }, );
Order.belongsTo(OrderStatus, { as: 'order', foreignKey: 'order_status_id' });

export default Order;