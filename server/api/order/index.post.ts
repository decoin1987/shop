import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Order from "../../models/order";


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title, description, value, time} = await readBody(event)
    console.log({title, description, value})
    try {
        if (!/[^ ]/.test(title) || title.length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название'
            })
        } else {
            // await Order.create({
            // })
        }
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message
        })
    }
    return
});