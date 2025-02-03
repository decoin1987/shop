// @ts-nocheck
import UserDto, {userModel} from "../../dtos/user-dto";
import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody, setCookie} from "h3";
import {User} from "../../models/user";
import bcrypt from "bcrypt";
import TokenService from "../../utils/identity-service/token-service";
import Role from "../../models/role";


class userService {

    static loginValidate(obj: { password: string; email: string }) {
        if (!obj.email) {
            throw createError({
                statusCode: 404,
                message: 'Электронная почта обязательна для заполнения'
            })
        }
        if (!obj.password) {
            throw createError({
                statusCode: 404,
                message: 'Пароль обязателен для заполнения'
            })
        }
        return obj
    }

    /***
     * Get user by email, password
     * @param email
     * @param password
     */
    static async getUser(email, password) {
        const user = await User.findOne({
            where: {email: email.toLowerCase()},
            included: []
        })
        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'Пользователь с таким email не найден'
            })
        }
        this.passwordCompare(password, user.password)
        const role = await this.getUserRole(user.dataValues.role_id)
        const userDto = new UserDto({ ...user.dataValues, role: role.dataValues })

        return userDto
    }

    // Utils
    /***
     * Get user role by userRoleId
     * @param userRoleId
     */
    static async getUserRole(userRoleId) {
        console.log(userRoleId)
        const role = await Role.findOne({
            where: {id: userRoleId}
        })
        return role
    }
    /***
     * Compare input user password
     * @param password
     * @param userPassword
     */
    static passwordCompare(password: string, userPassword: string) {
        if (!password) {
            throw createError({
                statusCode: 404,
                message: 'Пароль не веден'
            })
        }
        if (!userPassword) {
            throw createError({
                statusCode: 404,
                message: 'Пароль отсутствует в базе'
            })
        }
        if (!bcrypt.compareSync(password, userPassword)) {
            throw createError({
                statusCode: 404,
                message: 'Неправильно указан пароль или имя пользователя'
            })
        }
        return bcrypt.compareSync(password, userPassword)
    }
}


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {password, email} = userService.loginValidate(await readBody(event))

    const user = await userService.getUser(email, password)
    const tokens = TokenService.generateTokens({...user})
    await TokenService.saveToken(user.id as unknown as string, tokens.refreshToken)

    setCookie(event, 'refreshToken', tokens.refreshToken, {
        // maxAge: 2592000,
        maxAge: 60 * 60 * 24 * 5, secure: false, sameSite: true, httpOnly: true,
    })
    setCookie(event, 'token', tokens.accessToken, {
        maxAge: 60 * 60 * 24, secure: false, sameSite: true,
    })

    return {status: 200, message: 'Вы успешно вошли на сайт'}
});