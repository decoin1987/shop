import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import Role from "./role";
import {Customer} from "./customers";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    telephone: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    salt: {
        type: DataTypes.STRING,
    },
    activationLink: DataTypes.STRING,
    activated: {
        type : DataTypes.BOOLEAN,
        defaultValue: false
    },
    last_login_at: {type: DataTypes.DATE, defaultValue: Date.now()},
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Role.hasMany(User, { as: 'users', foreignKey: 'role_id' }, );
User.belongsTo(Role, { as: 'role', foreignKey: 'role_id' });

User.hasOne(Customer, {
    foreignKey: 'user_id',
    as: 'profile',
    onDelete: 'CASCADE',
});

Customer.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
