import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import OrderStatus from "../../../models/order_status";

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
            await OrderStatus.create({
                title: title.trim(),
                value: value.trim(),
                time: time.trim(),
                description: description.trim(),
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