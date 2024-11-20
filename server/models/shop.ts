import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Api} from "./api";
import {Delivery} from "./delivery";
import {Promotion} from "./promotion";
import {Tax} from "./tax";
import {Supply} from "./supply";
import {Stock} from "./stock";
import {Store} from "./store";


export const Shop = sequelize.define('shop', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {type: DataTypes.STRING},
    descriptions: {type: DataTypes.STRING},
    as_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true
});



Shop.belongsToMany(Api,{through: { model: 'api_keys'}, timestamps: false, foreignKey: { name: 'entry_id'}})
Shop.belongsToMany(Delivery, {through: 'shop_delivery', as: 'delivery', timestamps: false})
Shop.belongsToMany(Promotion, {through: 'shop_promotions', as: 'promotions', timestamps: false})

Api.belongsToMany(Shop,{through: { model: 'api_keys'}, timestamps: false})

Delivery.belongsToMany(Shop, {through: 'shop_delivery', as: 'shops', timestamps: false})
Promotion.belongsToMany(Shop, {through: 'shop_promotions', as: 'shops', timestamps: false})

Shop.belongsTo(Tax, {as: 'tax'})
Tax.hasMany(Shop, {as: 'shops'})

Shop.hasMany(Supply, {as: 'supplies'})
Shop.hasMany(Stock, {as: 'stocks'})
Shop.hasMany(Store, {as: 'stores'})

Stock.belongsToMany(Supply,{through: { model: 'stock_supplies'}, as: 'stocks_supplies', timestamps: false,})
Supply.belongsToMany(Stock,{through: { model: 'stock_supplies'}, as: 'supplies_stocks',  timestamps: false,})

Stock.belongsToMany(Store,{through: { model: 'stock_stores'}, as: 'stocks_stores', timestamps: false,})
Store.belongsToMany(Stock,{through: { model: 'stock_stores'}, as: 'stores_stocks', timestamps: false,})

Store.belongsToMany(Supply,{through: { model: 'store_supplies'}, as: 'stores_supplies', timestamps: false,})
Supply.belongsToMany(Store,{through: { model: 'store_supplies'}, as: 'supplies_stores', timestamps: false,})







