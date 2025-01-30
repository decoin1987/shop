import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Tax from "../../../models/tax";
import TransactionStatus from "../../../models/transaction_status";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, value, description} = await readBody(event)
    console.log(id)
    const editedStatus: any = await TransactionStatus.findOne({
        where: {
            id: id,
        }
    })
    if (editedStatus) {
        editedStatus.title = title
        editedStatus.description = description
        editedStatus.value = value

        await editedStatus.save()
    }
    return
});