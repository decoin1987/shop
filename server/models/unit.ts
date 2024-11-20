import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {SupplyProduct} from "./supply_products";


export const Unit = sequelize.define('unit', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false
});

Unit.hasMany(SupplyProduct)





