import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Category from "../../../models/category";
import Product from "../../../models/product";
import Tag from "../../../models/tag";
import ProductImage from "../../../models/product_image";
import Tax from "../../../models/tax";


export default defineEventHandler(async (event) => {
    return await Product.findAndCountAll(
        {
            include: [
                // {
                //     model: Tag,
                //     as: 'tags',
                //     attributes: ['title', 'slug']
                // },
                {
                    model: ProductImage,
                    as: 'product_images',
                    attributes: ['url']
                },
                // {
                //     model: Category,
                //     as: 'category',
                //     attributes: ['parent_id', 'title', 'slug']
                // },
                // {
                //     model: Tax,
                //     as: 'tax',
                //     attributes: ['title', 'value']
                // }
            ],
            attributes: ['id', 'title', 'slug', 'price'],
            distinct:true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
})
