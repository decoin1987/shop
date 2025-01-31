import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Token = sequelize.define('token', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        refresh_token: {
            type : DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

