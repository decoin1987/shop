import {Category} from "../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    await Category.destroy({
        where: {
            id
        },
    });
    return await Category.findAndCountAll()
});