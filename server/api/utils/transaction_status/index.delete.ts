import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import TransactionStatus from "../../../models/transaction_status";


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await TransactionStatus.destroy({
        where: {
            id
        },
    });
    return
});