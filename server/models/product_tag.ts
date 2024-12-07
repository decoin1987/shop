import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {IMAGES} from "../utils/helpers";
import Product from "./product";

export interface ProductTagAttributes {
    id: string;
    product_id?: string;
    tag_id?: string;
}

// Тип для создания нового изображения продукта
type ProductTagCreationAttributes = Optional<ProductTagAttributes, 'id' | 'product_id'>;

class ProductTag extends Model<ProductTagAttributes, ProductTagCreationAttributes> implements ProductTagAttributes {
    declare id: string; // primary key
    declare product_id?: string;
    declare tag_id?: string;
}

ProductTag.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}, {
    sequelize,
    modelName: 'product_tag',
    timestamps: false,
});

export default ProductTag;