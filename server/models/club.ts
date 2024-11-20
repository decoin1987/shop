import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Program} from "./program";

export const Club = sequelize.define('club', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    orders_count: {
        type: DataTypes.INTEGER,
    },
    orders_amount: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: true
});

Club.belongsToMany(Program, {through: 'club_programs'})




