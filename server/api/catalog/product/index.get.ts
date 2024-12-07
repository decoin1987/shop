import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Category from "../../../models/category";
import Product from "../../../models/product";
import Tag from "../../../models/tag";
import ProductImage from "../../../models/product_image";


export default defineEventHandler(async (event) => {
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
                {
                    model: Category,
                    as: 'category'
                }
            ],
            distinct:true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
})
