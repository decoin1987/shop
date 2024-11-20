import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const ProductProperty = sequelize.define('product_property', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    value: DataTypes.STRING,
    count: DataTypes.INTEGER
}, {
    timestamps: false
});




