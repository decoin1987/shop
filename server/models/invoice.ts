import {DataTypes, DATE} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {DocPhoto} from "./doc_photo";



export const Invoice = sequelize.define('invoice', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    incoming_number: { type: DataTypes.INTEGER, defaultValue: 0,}, // номер документа
    title: DataTypes.STRING,
    date_of_preparation: DataTypes.DATE,

}, {
    timestamps: true
});

Invoice.hasMany(DocPhoto,  { foreignKey: 'id', as: 'photos'})