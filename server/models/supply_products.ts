import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const SupplyProduct = sequelize.define('supply_product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    purchase_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    selling_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    calc_percent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    subtract_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: false
});

