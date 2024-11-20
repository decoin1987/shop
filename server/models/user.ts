import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    activationLink: DataTypes.STRING,
    activated: {
        type : DataTypes.BOOLEAN,
        defaultValue: false
    },
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    lastLoginAt: {type: DataTypes.DATE, defaultValue: Date.now()},
}, {
    timestamps: true,
});


export const Order = sequelize.define('order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
});


