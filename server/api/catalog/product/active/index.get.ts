import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Product from "../../../../models/product";


export default defineEventHandler(async (event) => {
    return await Product.scope('active').findAll()
})
