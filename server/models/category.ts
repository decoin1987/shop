import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import { stringSlugify } from '../utils/helpers';

interface CategoryAttributes {
    id: string;
    title: string;
    is_upsale: boolean;
    show_menu: boolean;
    raw_tags: object[];
    html_meta: string;
    html_keywords: string;
    html_title: string;
    description: string;
    sort: number;
    slug: string;
    parent_id?: string;
}

// Описание типа для создания новой категории
type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'show_menu' | 'sort' | 'parent_id'>; // Опциональными являются поля, у которых есть значения по умолчанию

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    declare id: string; // primary key
    declare title: string;
    declare is_upsale: boolean;
    declare show_menu: boolean;
    declare raw_tags: object[];
    declare html_meta: string;
    declare html_keywords: string;
    declare html_title: string;
    declare description: string;
    declare sort: number;
    declare slug: string;
    declare parent_id: string;

    // Определение метода для установки значения поля slug
    public setSlug(value: string): void {
        this.setDataValue('slug', stringSlugify(value));
    }
}

Category.init({
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
    show_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    is_upsale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    raw_tags: {
        type: DataTypes.JSONB,
    },
    html_meta: {
        type: DataTypes.STRING,
    },
    html_keywords: {
        type: DataTypes.STRING,
    },
    html_title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 500,
    },
    parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        set: function (value: string) {
            this.setDataValue('slug', stringSlugify(value));
        }
    },
}, {
    sequelize,
    modelName: 'category',
    timestamps: true,
    scopes: {
        is_upsale: {
            where: { is_upsale: true }
        },
        show_menu: {
            where: { show_menu: true }
        },
    },
});

// Определение отношений между категориями
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'child' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });

export default Category;