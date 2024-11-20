import {DataTypes} from "sequelize";
import {Upsell} from "./upsell";
import {sequelize} from "../utils/db.connect";


export const Type = sequelize.define('type', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descriptions: DataTypes.STRING,
}, {
    timestamps: false
});

Type.hasMany(Type, { foreignKey: 'parent_id', as: 'child_types' })
Type.belongsToMany(Upsell, { through: 'type_upsells', as: 'types_upsells', timestamps: false })
Upsell.belongsToMany(Type, { through: 'type_upsells', as: 'upsells_types', timestamps: false })




