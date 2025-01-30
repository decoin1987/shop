import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Address} from "./address";
import Order from "./order";

export const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    phone: DataTypes.STRING,
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Address.belongsTo(Customer, { as: 'customer', foreignKey: 'customer_id' });
Customer.hasMany(Address, { as: 'address', foreignKey: 'customer_id' }, );

Order.belongsTo(Customer, { as: 'customer', foreignKey: 'customer_id' });
Customer.hasMany(Order, { as: 'order', foreignKey: 'customer_id' }, );





