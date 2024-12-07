import Category from "../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Product from "../../../models/product";
import Tag from "../../../models/tag";
import ProductImage from "../../../models/product_image";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, description, sort, parent_id} = await readBody(event)
    const category: any  = await Product.findOne({
        where: {
            id: id,
        }
    })
    if (category) {
        category.title = title
        category.description = description
        await category.save()
    }
    return await Product.findAndCountAll(
        {
            include: [
                {
                    model: Tag,
                    as: 'tags',
                },
                {
                    model: ProductImage,
                    as: 'productImages',
                },
            ],
            distinct:true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
});