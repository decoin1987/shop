import {
    createError,
    defineEventHandler,
    getRequestHeader, getRouterParam,
    MultiPartData, readBody,
    readMultipartFormData,
} from 'h3';

import ProductColor from "../../../../../models/product_color";


export default defineEventHandler(async (event) => {
    const id  = await getRouterParam(event, 'id')
    console.log(id)
    const color = await ProductColor.findAll()
    return color.map(el => el.color_id)
});