import {Category} from "../../../models/category";
import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title, description, sort, parent_id} = await readBody(event)
    // console.log({title, description, sort, parent_id})
    try {
        if (!/[^ ]/.test(title) || title.length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название категории'
            })
        } else {
            await Category.create({
                title: title.trim(), description, sort, slug: title, parent_id
            })
        }
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message
        })
    }
    return await Category.findAndCountAll(
        {
            include: [
                {
                    model: Category,
                    as: 'parent',
                },
                {
                    model: Category,
                    as: 'child',
                },
            ],
            distinct:true,
            // limit: 5,
            // offset:2,
            order: [['sort', 'ASC']],
        }
    )
});