import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";



export const Program = sequelize.define('program', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, {
    timestamps: true
});
