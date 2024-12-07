import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../utils/db.connect";

export interface ProductAttributes {
    id: string;
    count?: number;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Consist extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    declare id: string; // primary key
    declare count?: number;
}

Consist.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        count: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'consist',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

export default Consist;




