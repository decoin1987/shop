import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Order from "../../models/order";


export default defineEventHandler(async (event) => {
    return await Order.findAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
