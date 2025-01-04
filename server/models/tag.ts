import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import { stringSlugify } from '../utils/helpers';

interface TagAttributes {
    id: string;
    title: string;
    descriptions: string;
    sort: number;
    slug: string;
}

// Тип для создания нового тега
type TagCreationAttributes = Optional<TagAttributes, 'id' | 'sort'>;

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
    declare id: string; // primary key
    declare title: string;
    declare descriptions: string;
    declare sort: number;
    declare slug: string;

    // Метод для установки значения поля slug
    public setSlug(value: string): void {
        this.setDataValue('slug', stringSlugify(value));
    }
}

Tag.init({
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
        type: DataTypes.STRING,
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
    },
    slug: {
        type: DataTypes.STRING,
        set: function (value: string) {
            this.setDataValue('slug', stringSlugify(value));
        }
    },
}, {
    sequelize,
    modelName: 'tag',
    timestamps: false,
});

export default Tag;