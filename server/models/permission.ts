import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Permission = sequelize.define('permission', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,

    },
    descriptions: {
        type: DataTypes.STRING,

    },
    value: {
        type: DataTypes.JSONB,
    }
}, {
    timestamps: true
});



