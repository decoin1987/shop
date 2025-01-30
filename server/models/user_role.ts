import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.connect';

export interface UserRoleAttributes {
    id: string;
    user_id?: string;
    role_id?: string;
}

type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id' | 'user_id' | 'role_id'>;

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
    declare id: string; // primary key
    declare user_id?: string;
    declare role_id?: string;
}

UserRole.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}, {
    sequelize,
    modelName: 'user_role',
    timestamps: false,
});

export default UserRole;