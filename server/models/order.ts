import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IMAGES, stringSlugify } from '../utils/helpers';
import Product from './product';
import Tag from './tag';
import {sequelize} from "../utils/db.connect";
import ProductImage from "./product_image";
import ProductTag from "./product_tag";
import Category from "./category";
import Consist from "./consist";

export interface OrderAttributes {
    id: string;
    anonymous: boolean;
    customer_id?: string;
    customer?: object[];
    customer_discount?: number;
    recipient: object[];
    address?: object[];
    status: string;
    delivery_status: string;
    notification: string;
    amount: number;
}

// Тип для создания нового продукта
type ProductCreationAttributes = Optional<OrderAttributes, 'id' | 'customer_id' | 'address' | 'customer_discount'>;

class Order extends Model<OrderAttributes, ProductCreationAttributes> implements OrderAttributes {
    declare id: string; // primary key
    declare customer_id: string; // customer user for registered site
    declare customer_discount: number; // customer general discount
    declare anonymous: boolean; // user not register
    declare customer: object[]; // customer user for unregistered site
    declare address: object[]; // primary key
    declare status: string; // primary key
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
    customer_id: {
        type: DataTypes.UUID,
        defaultValue: false
    },
    customer_discount: {
        type: DataTypes.INTEGER,
        defaultValue: false
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customer: {
        type: DataTypes.JSONB,
        defaultValue: false
    },
    address: {
        type: DataTypes.UUID,
        defaultValue: false
    },
    status: {
        type: DataTypes.UUID,
        defaultValue: false
    },
    delivery_status: {
        type: DataTypes.UUID,
        defaultValue: false
    },
    recipient: {
        type: DataTypes.JSONB,
        defaultValue: false
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: false
    },
    notification: {
        type: DataTypes.STRING,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Определения связей

export default Order;