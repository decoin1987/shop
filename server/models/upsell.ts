import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Upsell = sequelize.define('upsell', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    descriptions: DataTypes.STRING
}, {
    timestamps: false
});




