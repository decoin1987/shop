import {DataTypes, UUIDV4} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Term} from "./term";

export const Promotion = sequelize.define('promotion', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {type: DataTypes.STRING},
    descriptions: {type: DataTypes.STRING},
    condition: {type: DataTypes.STRING},
    duration: {type: DataTypes.RANGE(DataTypes.DATE)},
}, {
    timestamps: true
});

Promotion.belongsToMany(Term, {through: 'promotion_terms', as: 'terms', timestamps: false})