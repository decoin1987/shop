import {
    createError,
    defineEventHandler,
    getQuery,
    getRouterParam,
    parseCookies,
    readBody,
    sendRedirect,
    setCookie
} from "h3";
import {User} from "../../models/user";
import UserDto from "../../dtos/user-dto";
import Role from "../../models/role";
import bcrypt from "bcrypt";
import TokenService from "../../utils/identity-service/token-service";
import {Token} from "../../models/token";

const env = process.env.JWT_SECRET;

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

    static async getUser(email, password = null) {
        const user = await User.findOne({
            where: {email: email.toLowerCase()},
        })
        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'Пользователь с таким email не найден'
            })
        }
        if (password) {
            this.passwordCompare(password, user.password)
        }

        const role = await this.getUserRole(user.dataValues.role_id)
        const userDto = new UserDto({...user.dataValues, role: role.dataValues})

        return userDto
    }

    static async getUserById(id) {
        const user = await User.findByPk(id)
        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'Пользователь не найден'
            })
        }
        const role = await this.getUserRole(user.dataValues.role_id)
        const userDto = new UserDto({...user.dataValues, role: role.dataValues})

        return userDto
    }

    static async getUserRole(userRoleId) {
        const role = await Role.findOne({
            where: {id: userRoleId}
        })
        return role
    }

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

    static compareTokens(oldToken, newToken) {

    }
}


export default defineEventHandler(async (event) => {
    const {user: bouquet_user} = await readBody(event)
    const {token, refreshToken} = parseCookies(event);
    const userProfile = bouquet_user
    const user = await userService.getUserById(userProfile.id)
    const userRefreshToken = await Token.findByPk(userProfile.id)

    if (!TokenService.compareTokens(refreshToken, userRefreshToken?.dataValues.refresh_token)) {
        return { status: 401, message: 'EXPIRED_REFRESH_COOKIE' }
    }
    const newTokens = TokenService.generateTokens({...user})
    await TokenService.saveToken(user.id as unknown as string, newTokens.refreshToken)
    setCookie(event, 'refreshToken', newTokens.refreshToken, {
        maxAge: 60 * 60 * 24 * 5, secure: true, sameSite: true, httpOnly: true,
    })
    const newToken = newTokens.accessToken
    return {user, token:newToken, status: 200}

})
