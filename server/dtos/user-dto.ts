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

    constructor(model: userModel) {
        this.id = model.id
        this.role = model.role
    }
}
