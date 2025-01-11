import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IMAGES, stringSlugify } from '../utils/helpers';
import Consist from './consist';
import Tag from './tag';
import Category from './category';
import ProductImage from './product_image';
import {sequelize} from "../utils/db.connect";
import ProductTag from "./product_tag";
import UpsaleCategory from "./upsale_category";
import Tax from "./tax";
import Color from "./colors";
import ProductColor from "./product_color";

export interface ProductAttributes {
    id: string;
    title: string;
    count?: number;
    price: number;
    descriptions: string;
    raw_tag: object[];
    slug: string;
    as_consist: boolean;
    vendor_code: string;
    showcase: boolean;
    active: boolean;
    decrease_stock: boolean;
    weight: number;
    size: string;
    sort: number;
    html_title: string;
    html_h1: string;
    html_tags: string;
    meta_keywords: string;
    meta_description: string;
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
    declare weight: number;
    declare size: string;
    declare sort: number;
    declare html_title: string;
    declare html_h1: string;
    declare html_tags: string;
    declare meta_keywords: string;
    declare meta_description: string;

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
    weight: {
        type: DataTypes.INTEGER,
    },
    size: {
        type: DataTypes.STRING,
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    html_title: {
        type: DataTypes.STRING,
    },
    html_h1: {
        type: DataTypes.STRING,
    },
    html_tags: {
        type: DataTypes.STRING,
    },
    meta_keywords: {
        type: DataTypes.STRING,
    },
    meta_description: {
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
                    as: 'product_images'
                }]
            }) as Product & { product_images: ProductImage[] };

            console.log('Удаление продукта');
            try {
                IMAGES.doDelImages(deletedProduct.product_images);
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

Product.belongsToMany(Product, { through: { model: Consist }, foreignKey: 'product_id', as: 'product_consists' });
Product.belongsToMany(Product, { through: { model: Consist }, foreignKey: 'consist_id', as: 'consist_products' });

Product.belongsToMany(Tag, { through: { model: ProductTag }, as: 'tags', onDelete: 'CASCADE', timestamps: false });
Tag.belongsToMany(Product, { through: { model: ProductTag }, as: 'products', timestamps: false });
Product.hasMany(ProductTag);
ProductTag.belongsTo(Product);
Tag.hasMany(ProductTag);
ProductTag.belongsTo(Tag);

Product.belongsToMany(Color, { through: { model: ProductColor }, foreignKey: 'product_id', as: 'colors', onDelete: 'CASCADE', timestamps: false });
Color.belongsToMany(Product, { through: { model: ProductColor }, foreignKey: 'color_id', onDelete: 'CASCADE', timestamps: false });

Product.belongsToMany(Category, { through: { model: UpsaleCategory }, as: 'upsale_categories'});
Category.belongsToMany(Product, { through: { model: UpsaleCategory }, as: 'upsale_products'});

Category.hasMany(Product, { as: 'products', foreignKey: 'category_id' }, );
Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });

Tax.hasMany(Product, { as: 'product', foreignKey: 'tax_id' }, );
Product.belongsTo(Tax, { as: 'tax', foreignKey: 'tax_id' });

Product.hasMany(ProductImage, { as: 'product_images', foreignKey: 'product_id', onDelete: 'CASCADE', hooks: true });
ProductImage.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });
export default Product;