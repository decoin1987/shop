import Category from "../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, description, sort, parent_id, is_upsale, show_menu} = await readBody(event)
    const category: any  = await Category.findOne({
        where: {
            id: id,
        }
    })
    if (category) {
        category.title = title
        category.description = description
        category.sort = sort
        category.parent_id = parent_id
        category.is_upsale = is_upsale
        category.show_menu = show_menu
        await category.save()
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
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
});