import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";


export const DocPhoto = sequelize.define('doc_photo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    alt: {type: DataTypes.STRING,},
    url: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
});


