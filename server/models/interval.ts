import {DataTypes, UUIDV4} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const Interval = sequelize.define('interval', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    interval: {type: DataTypes.RANGE(DataTypes.DATE)},
    duration: {type: DataTypes.DATE,}
}, {
    timestamps: false
});

