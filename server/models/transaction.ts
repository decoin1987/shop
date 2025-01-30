import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import TransactionStatus from "./transaction_status";

interface TransactionAttributes {
    id?: string;
}

// Тип для создания нового тега
type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    declare id: string; // primary key
}

Transaction.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}, {
    sequelize,
    modelName: 'transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

TransactionStatus.hasMany(Transaction, { as: 'transaction_status', foreignKey: 'transaction_status_id' }, );
Transaction.belongsTo(TransactionStatus, { as: 'transaction', foreignKey: 'transaction_status_id' });

export default Transaction;