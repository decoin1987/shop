import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import {User} from "../../models/user";


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title} = await readBody(event)
    console.log({title})
    try {
        if (!/[^ ]/.test(title) || title.length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название'
            })
        } else {
            await User.create({
                title: title.trim(),
            })
        }
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message
        })
    }
    return
});