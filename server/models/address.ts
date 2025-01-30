import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";

export const Address = sequelize.define('address', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    address: {
        type: DataTypes.STRING,
    },
    entrance: DataTypes.STRING,
    floor: DataTypes.STRING,
    flat: DataTypes.STRING,
    coordinates: DataTypes.STRING,
}, {
    timestamps: false,
});
export default Address;



