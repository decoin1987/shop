import Category from "../../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {data, ids} = await readBody(event)
    await Category.update(
        {
            ...data
        },
        {
            where: {
                id: ids,
            },
        },
    );
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
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
});