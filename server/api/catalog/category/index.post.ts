import {Category} from "../../../models/category";
import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import {urlRusLat} from "../../../utils/helpers";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title, description, sort, parent_id} = await readBody(event)
    console.log({title, description, sort, parent_id})
    try {
        const category = await Category.create({
            title, description, sort, slug: urlRusLat(title)
        })
        return category
    } catch (error) {
        throw createError({
            statusCode: error.status,
            message: error.message
        })
    }


});