import {
    createError,
    defineEventHandler,
    getRequestHeader, getRouterParam,
    MultiPartData, readBody,
    readMultipartFormData,
} from 'h3';

import ProductTag from "../../../../../models/product_tag";
import Tag from "../../../../../models/tag";
import { Op, col, fn, literal } from "sequelize"

export default defineEventHandler(async (event) => {
    const product_id  = await getRouterParam(event, 'id')
    const tags = await ProductTag.findAll({
        where: {product_id:product_id},
        attributes: [
            'id',
            'tag_id',
        ],
        include: [
            {
                model: Tag,
                attributes: ['title'],
            },
        ],
    })
    return tags
});