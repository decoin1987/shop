import {DataTypes} from "sequelize";
import {sequelize} from "../utils/db.connect";
import {Stock} from "./stock";
import {User} from "./user";
import {Shop} from "./shop";



export const Contact = sequelize.define('contact', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, {
    timestamps: true
});

Contact.belongsTo(Shop, {
    foreignKey: {
        name: 'id'
    }
})
Contact.belongsTo(User, {
    foreignKey: {
        name: 'id'
    }
})
Contact.belongsTo(Stock, {
    foreignKey: {
        name: 'id'
    }
})