import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Restriction = sequelize.define('restriction', {
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



