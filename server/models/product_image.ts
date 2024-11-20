import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const ProductImage = sequelize.define('product_image', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    url: {
        type: DataTypes.STRING,
        // required: true,
    },
}, {
    timestamps: false,
})




