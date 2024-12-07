
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Tag from "../../../models/tag";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    await Tag.destroy({
        where: {
            id
        },
    });
    return await Tag.findAndCountAll(
        {
            distinct:true,
            order: [['sort', 'ASC']],
            // limit: 5,
            // offset:2,
        }
    )
});