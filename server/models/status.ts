import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Status = sequelize.define('status', {
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
    text_before: {
        type: DataTypes.STRING,
    },
    text_after: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.RANGE(DataTypes.DATE),
    },
}, {
    timestamps: true
});




