import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import Category from "../../../../models/category";
import Product from "../../../../models/product";
import Tag from "../../../../models/tag";
import ProductImage from "../../../../models/product_image";


export default defineEventHandler(async (event) => {
    const slug = await getRouterParam(event, "slug")
    console.log(slug)
    const category = await Category.findOne({where: {slug: slug}})
    const products = Product.findAndCountAll({
        where: {
            category_id: category.id
        },
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
                as: 'category'
            }
        ],
    })
    return products
})
