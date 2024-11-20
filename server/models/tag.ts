import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {urlRusLat} from "../utils/helpers";


export const Tag = sequelize.define('tag', {
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



