import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Store = sequelize.define('store', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {type: DataTypes.STRING, defaultValue: 'Стандартный склад'},
    descriptions: {type: DataTypes.STRING},
    default: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {
    timestamps: false
});




