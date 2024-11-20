import {DataTypes, UUIDV4} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Tax} from "./tax";
import {Interval} from "./interval";
import {Api} from "./api";


export const Delivery = sequelize.define('delivery', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {type: DataTypes.STRING},
    descriptions: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    custom: {type: DataTypes.BOOLEAN},
}, {
    timestamps: false
});

Delivery.belongsTo(Tax, {as: 'tax'})
Tax.hasMany(Delivery, {as: 'delivery'})

Delivery.belongsToMany(Interval,{through:'delivery_intervals', as: 'intervals', timestamps: false})
Delivery.belongsToMany(Api,{through: { model: 'api_keys'}, timestamps: false, foreignKey: { name: 'entry_id'}})

Interval.belongsToMany(Delivery,{through: 'delivery_intervals', timestamps: false,})
Api.belongsToMany(Delivery,{through: { model: 'api_keys'}, timestamps: false,})

