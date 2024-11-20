import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Property = sequelize.define('property', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {type: DataTypes.STRING},
    descriptions: {type: DataTypes.STRING},
}, {
    timestamps: false
});




