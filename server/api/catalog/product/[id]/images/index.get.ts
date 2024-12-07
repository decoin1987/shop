import {
    createError,
    defineEventHandler,
    getRequestHeader, getRouterParam,
    MultiPartData, readBody,
    readMultipartFormData,
} from 'h3';

import ProductImage from '../../../../../models/product_image';


export default defineEventHandler(async (event) => {
    const product_id  = await getRouterParam(event, 'id')
    return await ProductImage.findAll({where: {product_id:product_id}})
});