import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Group = sequelize.define('group', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    descriptions: DataTypes.STRING,
}, {
    timestamps: false
});




