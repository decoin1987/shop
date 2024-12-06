import {Category} from "../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import {Product} from "../../../models/product";
import {Tag} from "../../../models/tag";
import {ProductImage} from "../../../models/product_image";
import {IMAGES} from "../../../utils/helpers";
import {where} from "sequelize";

// Product.beforeDestroy((record, options) => {
//         console.log('Удаление картикни', record)
//         console.log('Удаление картикни', options)
//         console.log('Удаление картикни')
//         try {
//
//             IMAGES.doDelImages(record)
//         } catch (e) {
//             console.log(e)
//         }
// })

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const product = await readBody(event)
    await Product.destroy({
        where: {id: product.id},
        individualHooks: true,
        hooks: true,
    })
    return await Product.findAndCountAll(
        {
            include: [
                {
                    model: Tag,
                    as: 'productTags',
                },
                {
                    model: ProductImage,
                    as: 'productImages',
                },
                {
                    model: Category,
                    as: 'category'
                }
            ],
            distinct: true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
});