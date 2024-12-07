import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import Product from "../../../../models/product";
import Tag from "../../../../models/tag";
import ProductImage from "../../../../models/product_image";
import Category from "../../../../models/category";



export default defineEventHandler(async (event) => {
    const id = await getRouterParam(event,  "id")
    console.log(id)
    return await Product.findOne({
        where: {id},
        include: [
            {
                model: Tag,
                as: 'tags',
            },
            {
                model: ProductImage,
                as: 'productImages',
            },
            {
                model: Category,
                as: 'category',
            },
        ],
    })
})
