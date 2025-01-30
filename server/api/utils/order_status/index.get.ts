import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import OrderStatus from "../../../models/order_status";


export default defineEventHandler(async (event) => {
    return await OrderStatus.findAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
