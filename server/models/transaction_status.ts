import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {stringSlugify} from "../utils/helpers";
import {bool} from "yup";

interface TransactionAttributes {
    id?: string;
    title: string;
    description: string;
    value: number;
}
/*
* Read - 1 or 0
* Change - 1 or 0
* Create - 1 or 0
*/

// Тип для создания нового тега
type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

class TransactionStatus extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    declare id: string; // primary key
    declare title: string;
    declare description: string;
    declare value: number;
}

TransactionStatus.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.INTEGER,
    },

}, {
    sequelize,
    modelName: 'transaction_status',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default TransactionStatus;