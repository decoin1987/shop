import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Tax from "../../../models/tax";
import TransactionStatus from "../../../models/transaction_status";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title, description, value} = await readBody(event)
    console.log({title, description, value})
    try {
        if (!/[^ ]/.test(title) || title.length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название'
            })
        } else {
            await TransactionStatus.create({
                title: title.trim(),
                value: value.trim(),
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