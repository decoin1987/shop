import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {IMAGES} from "../utils/helpers";
import Product from "./product";

export interface ProductImageAttributes {
    id: string;
    url: string;
    product_id?: string;
}

// Тип для создания нового изображения продукта
type ProductImageCreationAttributes = Optional<ProductImageAttributes, 'id' | 'product_id'>;

class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
    declare id: string; // primary key
    declare url: string;
    declare product_id?: string;
}

ProductImage.init({
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
    hooks: {
        beforeDestroy: async function (image) {
            const deletedProduct = await ProductImage.findOne({
                where: { id: image.id },
            })

            console.log('Удаление Картинки');
            try {
                IMAGES.doDelImages([deletedProduct]);
                console.log('Картинки удалены');
            } catch (e) {
                console.error(e);
            }
        }
    },
    sequelize,
    modelName: 'product_image',
    timestamps: false,
});

export default ProductImage;