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


class userValidate {
    static emptyFieldValidate (obj: userModel): userModel {
        if (!obj.email) {
            throw createError({
                status: 404,
                message: 'Электронная почта обязательна для заполнения'
            })
        }
        if (!obj.password) {
            throw createError({
                status: 404,
                message: 'Пароль обязателен для заполнения'
            })
        }
        return obj
    }
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const { password, email: rawEMail} = userValidate.emptyFieldValidate(await readBody(event))
    const email = rawEMail.toLowerCase()
    const candidate = await User.findOne({
        where: { email }
    })
    if (candidate) {
        throw createError({
            status: 404,
            message: 'Такой пользователь уже зарегистрирован'
        })
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid()

    const user = await User.create({ email, password: hashPassword, activationLink, role: 'user' })
    if (!user) {
        throw createError({
            status: 404,
            message: 'Ошибка'
        })
    }

    // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/identity/activate/${activationLink}`)
    const userDto = new UserDto(user as unknown as userModel)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken)
    setCookie(event, 'refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
    const token = tokens.accessToken
    return {
        user: userDto,
        token,
        status: 200,
        message: 'Вы успешно зарегистрировались'
    }
});
