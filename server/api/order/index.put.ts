import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";

import Order from "../../models/order";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, value, time, description} = await readBody(event)
    console.log(id)
    const editedStatus: any = await Order.findOne({
        where: {
            id: id,
        }
    })
    if (editedStatus) {
        editedStatus.title = title
        editedStatus.description = description
        editedStatus.time = time
        editedStatus.value = value

        await editedStatus.save()
    }
    return
});