import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IMAGES, stringSlugify } from '../utils/helpers';
import Consist from './consist';
import Tag from './tag';
import Category from './category';
import ProductImage from './product_image';
import {sequelize} from "../utils/db.connect";
import ProductTag from "./product_tag";

export interface ProductAttributes {
    id: string;
    title: string;
    count?: number;
    price: number;
    descriptions: string;
    raw_tag: object[];
    slug: string;
    as_consist: boolean;
    showcase: boolean;
    active: boolean;
    decrease_stock: boolean;
    vendor_code: string;
}

// Тип для создания нового продукта
type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'price' | 'as_consist' | 'showcase' | 'active' | 'decrease_stock'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    declare id: string; // primary key
    declare title: string;
    declare count?: number;
    declare price: number;
    declare descriptions: string;
    declare raw_tag: object[];
    declare slug: string;
    declare as_consist: boolean;
    declare showcase: boolean;
    declare active: boolean;
    declare decrease_stock: boolean;
    declare vendor_code: string;

    // Метод для установки значения поля slug
    public setSlug(value: string): void {
        this.setDataValue('slug', stringSlugify(value));
    }
}

Product.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    descriptions: {
        type: DataTypes.STRING,
    },
    raw_tag: {
        type: DataTypes.JSONB,
    },
    slug: {
        type: DataTypes.STRING,
        set: function (value: string) {
            this.setDataValue('slug', stringSlugify(value));
        }
    },
    as_consist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    showcase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    decrease_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vendor_code: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'product',
    scopes: {
        showcase: {
            where: { showcase: true }
        },
        active: {
            where: { active: true }
        }
    },
    hooks: {
        beforeDestroy: async function (product) {
            const deletedProduct = await Product.findOne({
                where: { id: product.id },
                include: [{
                    model: ProductImage,
                    as: 'productImages'
                }]
            }) as Product & { productImages: ProductImage[] };

            console.log('Удаление продукта');
            try {
                IMAGES.doDelImages(deletedProduct.productImages);
                console.log('Картинки удалены');
            } catch (e) {
                console.error(e);
            }
        }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Определения связей
Product.belongsToMany(Product, {
    through: 'product_groups',
    foreignKey: 'product_id',
    as: 'products_groups',
    timestamps: false
});
Product.belongsToMany(Product, {
    through: 'product_groups',
    foreignKey: 'group_id',
    as: 'groups_products',
    timestamps: false
});

Product.belongsToMany(Product, {
    through: 'similar_products',
    foreignKey: 'product_id',
    as: 'similars_products',
    timestamps: false
});
Product.belongsToMany(Product, {
    through: 'similar_products',
    foreignKey: 'similar_id',
    as: 'products_similars',
    timestamps: false
});

Product.belongsToMany(Product, { through: { model: Consist }, foreignKey: 'product_id', as: 'productConsists' });
Product.belongsToMany(Product, { through: { model: Consist }, foreignKey: 'consist_id', as: 'consistProducts' });

Product.belongsToMany(Tag, { through: { model: ProductTag }, as: 'tags', onDelete: 'CASCADE', timestamps: false });
Tag.belongsToMany(Product, { through: { model: ProductTag }, as: 'products', onDelete: 'CASCADE', timestamps: false });
Product.hasMany(ProductTag);
ProductTag.belongsTo(Product);
Tag.hasMany(ProductTag);
ProductTag.belongsTo(Tag);

Category.hasMany(Product, { as: 'products', foreignKey: 'category_id' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'productImages', onDelete: 'CASCADE', hooks: true });
ProductImage.hasOne(Product, { foreignKey: 'product_id', as: 'productsImage', onDelete: 'SET NULL', hooks: true });

export default Product;