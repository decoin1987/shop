import {DataTypes, DATE} from "sequelize";
import dayjs from "dayjs";
import ru from 'dayjs/locale/ru'
import {sequelize} from "../utils/db.connect";
import {SupplyProduct} from "./supply_products";
import {Invoice} from "./invoice";
dayjs.locale(ru)

export const Supply = sequelize.define('supply', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    registration_number: { type: DataTypes.STRING, defaultValue: 0},
    title: {
        type: DataTypes.STRING,
        defaultValue: '',
        set() {
            this.setDataValue('title', `Поставка от ${dayjs().format('D MMMM YYYY') }`);
        }
    },
    date_of_preparation: DataTypes.DATE
}, {
    initialAutoIncrement: '4',
    timestamps: true,
    createdAt: 'date_of_receiving',
    updatedAt: false

});


Supply.hasMany(SupplyProduct, { foreignKey: 'supply', as: 'products'})
Supply.belongsToMany(Invoice, {through: 'supply_invoices', as: 'invoices', timestamps: false})
Invoice.belongsToMany(Supply, {through: 'supply_invoices', as: 'supplies', timestamps: false})