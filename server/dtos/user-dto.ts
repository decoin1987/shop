export interface userModel {
    email: string,
    password: string,
    id?: string,
    activationLink?: string
    activated?: boolean
    phone?: string
    role?: string
    lastLoginAt?: string
    createdAt?: string
    updatedAt?: string
}

export default class UserDto {
    id;
    role;
    activated;

    constructor(model: userModel) {
        this.id = model.id
        this.role = model.role.role
        this.activated = model.activated
    }
}
