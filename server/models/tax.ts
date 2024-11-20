import {DataTypes, UUIDV4} from "sequelize";
import {Api} from "./api";
import {sequelize} from "../utils/db.connect";

export const Tax = sequelize.define('tax', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {type: DataTypes.STRING},
    descriptions: {type: DataTypes.STRING},
    rate: {type: DataTypes.INTEGER},

}, {
    timestamps: false
});

Tax.belongsToMany(Api,{
    through: { model: 'api_keys'}, timestamps: false, foreignKey: { name: 'entry_id'}
})
Api.belongsToMany(Tax,{
    through: { model: 'api_keys'}, timestamps: false
})
// Tax.hasMany(Shop, {as: 'tax'})
// Tax.hasMany(Delivery, {as: 'tax'})



