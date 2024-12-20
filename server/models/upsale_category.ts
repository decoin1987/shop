import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../utils/db.connect";

export interface ProductAttributes {
    id: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class UpsaleCategory extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    declare id: string; // primary key
}

UpsaleCategory.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
    }, {
        sequelize,
        modelName: 'upsale_category',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

export default UpsaleCategory;




