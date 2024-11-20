import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Upsell} from "./upsell";
import {urlRusLat} from "../utils/helpers";

export const Category = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descriptions: {
        type: DataTypes.JSONB,
    },
    sort: {type: DataTypes.STRING, defaultValue: 100},
    slug: {
        type: DataTypes.STRING,
        async set(value: string) {
            this.setDataValue('slug', urlRusLat(value))
        }
    },
}, {
    timestamps: false
});

Category.hasMany(Category, { foreignKey: 'parent_id', as: 'child' })
Category.belongsToMany(Upsell, { through: 'category_upsells', as: 'categories_upsells', timestamps: false })
Upsell.belongsToMany(Category, { through: 'category_upsells', as: 'upsells_categories', timestamps: false })



