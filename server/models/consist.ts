import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Consist = sequelize.define('consist', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    count: DataTypes.INTEGER
}, {
    timestamps: false
});




