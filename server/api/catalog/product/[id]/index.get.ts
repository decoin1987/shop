import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import Product from "../../../../models/product";
import Tag from "../../../../models/tag";
import ProductImage from "../../../../models/product_image";
import Category from "../../../../models/category";
import UpsaleCategory from "../../../../models/upsale_category";



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
                as: 'product_images',
            },
            {
                model: Category,
                as: 'upsale_categories',
                include:[
                    {
                        model: Product,
                        as: 'upsale_products'
                    }]
            },
            {
                model: Category,
                as: 'category',
            },
        ],
    })
})
