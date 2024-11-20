import {DataTypes} from "sequelize";
import {IMAGES, urlRusLat} from "../utils/helpers";
import {Consist} from "./consist";
import {Tag} from "./tag";
import {Upsell} from "./upsell";
import {SupplyProduct} from "./supply_products";
import {Type} from "./type";
import {Category} from "./category";
import {ProductImage} from "./product_image";

export const Product = sequelize.define('product', {
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
        async set(value: string) {
            this.setDataValue('slug', urlRusLat(value))
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
}, {
    scopes: {
        showcase: {
            where: { showcase: true }
        },
        active: {
            where: { active: true }
        }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

Product.belongsToMany(Product, {through: 'product_groups', foreignKey: 'product_id', as: 'products_groups', timestamps: false})
Product.belongsToMany(Product, {through: 'product_groups', foreignKey: 'group_id', as: 'groups_products', timestamps: false})

Product.belongsToMany(Product, {through: 'similar_products', foreignKey: 'product_id', as: 'similars_products', timestamps: false})
Product.belongsToMany(Product, {through: 'similar_products', foreignKey: 'similar_id', as: 'products_similars', timestamps: false})

Product.belongsToMany(Product, { through: { model: Consist}, foreignKey: 'product_id', as: 'products_consists'})
Product.belongsToMany(Product, { through: { model: Consist}, foreignKey: 'consist_id', as: 'consists_products'})

Product.belongsToMany(Tag, {through: 'product_tags', as: 'products_tags', timestamps: false})
Tag.belongsToMany(Product, {through: 'product_tags', as: 'tags_products', timestamps: false})

Product.belongsToMany(Upsell, {through: 'upsell_products', as: 'products_upsells', timestamps: false})
Upsell.belongsToMany(Product, {through: 'upsell_products', as: 'upsells_products', timestamps: false})


Product.hasMany(SupplyProduct, { as: 'supplies_products' })

Product.belongsToMany(Type, {through: 'product_types', as: 'products_types', timestamps: false})
Type.belongsToMany(Product, {through: 'product_types', as: 'types_products', timestamps: false})



Category.hasMany(Product, { as: 'products', foreignKey: 'category_id' })
Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' })
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'product_images',onDelete: 'CASCADE'});

Product.beforeDestroy(async (product, options) => {
    try {
        IMAGES.doDelImages(product)
    } catch (e) {
        console.log(e)
    }
})







