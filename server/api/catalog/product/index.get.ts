import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Category from "../../../models/category";
import Product from "../../../models/product";
import Tag from "../../../models/tag";
import ProductImage from "../../../models/product_image";
import Tax from "../../../models/tax";
import {sequelize} from "../../../utils/db.connect";


export default defineEventHandler(async (event) => {
    const {pageSize, page} = getQuery(event)

    console.log(pageSize)
    console.log(page)
    const offset = (pageSize:number, page:number) => {
        if ((page - 1) >= 0) {
            return (page - 1) * pageSize;
        }
        return 0
    }

    console.dir({
        limit: pageSize,
        offset:offset(pageSize, page),
    })


    return await Product.findAndCountAll(
        {
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['title', 'slug']
                },
                {
                    model: ProductImage,
                    as: 'product_images',
                    attributes: ['url']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['parent_id', 'title', 'slug']
                },
                {
                    model: Tax,
                    as: 'tax',
                    attributes: ['title', 'value']
                }
            ],
            attributes: ['id', 'title', 'slug', 'price', 'created_at'],
            distinct:true,
            limit: pageSize,
            offset: offset(pageSize, page),
            order: [['created_at', 'DESC']],
        }
    )
})
