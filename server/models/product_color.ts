import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {IMAGES} from "../utils/helpers";
import Product from "./product";

export interface ProductColorAttributes {
    id: string;
    product_id?: string;
    color_id?: string;
}

// Тип для создания нового изображения продукта
type ProductColorCreationAttributes = Optional<ProductColorAttributes, 'id' | 'product_id' | 'color_id'>;

class ProductColor extends Model<ProductColorAttributes, ProductColorCreationAttributes> implements ProductColorAttributes {
    declare id: string; // primary key
    declare product_id?: string;
    declare color_id?: string;
}

ProductColor.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    product_id: {
        type: DataTypes.UUID,
    },
    color_id: {
        type: DataTypes.UUID,
    },
}, {
    sequelize,
    modelName: 'product_color',
    timestamps: false,
});

export default ProductColor;