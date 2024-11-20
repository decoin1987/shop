import {DataTypes, UUIDV4} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Term = sequelize.define('term', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

