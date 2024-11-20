import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Api = sequelize.define('api', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    key: {
        type: DataTypes.JSONB,
    },
    value: {
        type: DataTypes.JSONB,
    },
}, {
    timestamps: false
});




