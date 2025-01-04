import {DataTypes, Model} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {stringSlugify} from "../utils/helpers";

class Tax extends Model {
    declare id: string; // primary key
    declare title: string;
    declare descriptions: string;
    declare value: string;
}

Tax.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descriptions: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'tax',
    timestamps: false,
});

export default Tax;


