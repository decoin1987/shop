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
import {User} from "../../../../models/user";
import UserDto, {userModel} from "../../../../dtos/user-dto";
import MailService from "../../../../utils/identity-service/mail-service";
import TokenService from "../../../../utils/identity-service/token-service";
import Role from "../../../../models/role";
import {Customer} from "../../../../models/customers";


class userValidate {
    static emptyFieldValidate (obj) {
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
        if (!obj.new_password) {
            throw createError({
                status: 404,
                message: 'Пароль обязателен для заполнения'
            })
        }
        return obj
    }
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const { password, email: raw_email, new_password} = userValidate.emptyFieldValidate(await readBody(event))
    const email = raw_email.toLowerCase()
    const user = await User.findOne({
        where: {email}
    })
    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'Пользователь с таким email не найден'
        })
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        console.log('Неправильно указан пароль или имя пользователя')
        throw createError({
            statusCode: 404,
            message: 'Неправильно указан пароль или имя пользователя'
        })
    }
    const hashPassword = await bcrypt.hash(new_password, 10)
    console.log(user.password)
    user.password = hashPassword
    await user.save()
    const userDto = new UserDto(user as unknown as userModel)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken)
    setCookie(event, 'refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
    const token = tokens.accessToken
    return {
        user: userDto,
        token,
        status: 200,
        message: 'Вы успешно сменили пароль'
    }
});
