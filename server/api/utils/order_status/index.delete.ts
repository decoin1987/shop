import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import OrderStatus from "../../../models/order_status";



export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await OrderStatus.destroy({
        where: {
            id
        },
    });
    return
});