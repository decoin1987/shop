import Tag from "../../../models/tag";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, description, sort} = await readBody(event)
    console.log(id, title, description, sort)
    const tag: any  = await Tag.findOne({
        where: {
            id: id,
        }
    })
    if (tag) {
        tag.title = title
        tag.description = description
        tag.sort = sort
        tag.slug = title
        await tag.save()
    }
    return await Tag.findAndCountAll(
        {
            distinct:true,
            order: [['sort', 'ASC']],
            // limit: 5,
            // offset:2,
        }
    )
});