import {DataTypes, Model} from "sequelize";
import {sequelize} from "../utils/db.connect";

class Color extends Model {
    declare id: string; // primary key
    declare title: string;
    declare hex: string;
    declare rgb: string;
    declare hsl: string;
    declare hwb: string;
}

Color.init({
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
    hex: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rgb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hsl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hwb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lab: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    xyz: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hsv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'color',
    timestamps: false,
});

export default Color;


