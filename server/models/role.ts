import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';
import {stringSlugify} from "../utils/helpers";
import {bool} from "yup";

interface RoleAttributes {
    id?: string;
    title: string;
    read: boolean;
    change: boolean;
    create: boolean;
    role: string;
}
/*
* Read - 1 or 0
* Change - 1 or 0
* Create - 1 or 0
*/

// Тип для создания нового тега
type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    declare id: string; // primary key
    declare title: string;
    declare read: boolean;
    declare change: boolean;
    declare create: boolean;
    declare role: string;


}

Role.init({
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
    read: {
        type: DataTypes.BOOLEAN,
    },
    change: {
        type: DataTypes.BOOLEAN,
    },
    create: {
        type: DataTypes.BOOLEAN,
    },
    role: {
        type: DataTypes.STRING,
        set: function (value:[boolean, boolean, boolean]) {
            let val = String(parseInt([value[0] ? 1 : 0, value[1] ? 1 : 0, value[2] ? 1 : 0].join('')))
            // console.log('Двоичная')
            // console.log(val)
            // console.log('десятичная')
            // console.log(parseInt(val, 2))
            // console.log('двоичная')
            // console.log(parseInt(val, 2).toString(2))
            this.setDataValue('role', String(parseInt(val, 2)).toString());
        }
    }
}, {
    sequelize,
    modelName: 'role',
    timestamps: false,
});

export default Role;