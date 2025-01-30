// @ts-nocheck
import UserDto, {userModel} from "../../dtos/user-dto";
import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody, setCookie} from "h3";
import {User} from "../../models/user";
import bcrypt from "bcrypt";
import TokenService from "../../utils/identity-service/token-service";



class userValidate {
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
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {password, email} = userValidate.loginValidate(await readBody(event))
    const user = await User.findOne({
        where: {email: email.toLowerCase()}
    })
    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'Пользователь с таким email не найден'
        })
    }


    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        throw createError({
            statusCode: 404,
            message: 'Неправильно указан пароль или имя пользователя'
        })
    }


    const userDto = new UserDto(user as unknown as userModel)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken)
    setCookie(event, 'refreshToken', tokens.refreshToken, {
        // maxAge: 2592000,
        maxAge: 5,
        httpOnly: true,
    })
    // setCookie(event, 'token', JSON.stringify(userDto), {
    //
    //     encode: generateAccessToken
    // })
    const token = tokens.accessToken
    return {user: userDto, token, status: 200, message: 'Вы успешно вошли на сайт'}
});