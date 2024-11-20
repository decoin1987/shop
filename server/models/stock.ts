import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Stock = sequelize.define('stock', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {type: DataTypes.STRING, defaultValue: 'Стандартный склад'},
    descriptions: {type: DataTypes.STRING},
    pickup: {type: DataTypes.BOOLEAN, defaultValue: false},
    default: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {
    timestamps: false
});

