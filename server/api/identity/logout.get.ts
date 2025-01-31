import {createError, defineEventHandler, getQuery, getRouterParam, setCookie} from "h3";
const env = process.env.JWT_ACCESS_SECRET;

export default defineEventHandler(async (event) => {
    setCookie(event, 'refreshToken', '', {maxAge: 0})
    setCookie(event, 'token', '', {maxAge: 0})
    return {status: 200, message: 'Вы успешно вышли'}
})
