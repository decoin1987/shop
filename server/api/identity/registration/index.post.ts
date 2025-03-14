import {
    createError,
    H3Event,
    defineEventHandler,
    getQuery,
    getRouterParam,
    readBody,
    EventHandlerRequest,
    setCookie
} from "h3";
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import {User} from "../../../models/user";
import UserDto, {userModel} from "../../../dtos/user-dto";
import MailService from "../../../utils/identity-service/mail-service";
import TokenService from "../../../utils/identity-service/token-service";
import Role from "../../../models/role";
import {Customer} from "../../../models/customers";




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

    static async createNewDTO(password, email) {
        const hashPassword = await bcrypt.hash(password, 10)

        let role = await Role.findOne({where: {
                create: false,
                change: false,
            }})

        if (!role) {
            role = await Role.create({
                change: false, create: false, read: true, role: [true, false, false],
                title: 'systemCreatedUser'
            })
        }

        const activationLink = uuid()

        const user = await User.create({ email, password: hashPassword, activationLink, role_id: role.dataValues.id})

        const customer = await Customer.create( {user_id: user.dataValues.id})

        if (!user) {
            throw createError({
                status: 404,
                message: 'Ошибка'
            })
        }

        const userDto = new UserDto({ ...user.dataValues, role: role.dataValues })

        return userDto
    }

    static async validateUserByEmail(email) {
        const rawEmail = email.toLowerCase()
        const candidate = await User.findOne({
            where: { email }
        })
        if (candidate) {
            throw createError({
                status: 404,
                message: 'Такой пользователь уже зарегистрирован'
            })
        }
    }

    static async getUserRole(userRoleId) {
        console.log(userRoleId)
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
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const { password, email} = userService.loginValidate(await readBody(event))

    await userService.validateUserByEmail(email)
    const user = await userService.createNewDTO(password, email)

    console.log(user)
    const activationLink = uuid()
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/identity/activate/${activationLink}`)

    const tokens = TokenService.generateTokens({ ...user })

    await TokenService.saveToken(user.id as unknown as string, tokens.refreshToken)

    setCookie(event, 'refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false,
    })
    setCookie(event, 'token', tokens.accessToken, {
        maxAge: 60 * 60 * 24, secure: false, sameSite: true,
    })

    return {
        status: 200,
        message: 'Вы успешно зарегистрировались'
    }
});
