import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Tax from "../../../models/tax";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, value, description} = await readBody(event)
    console.log(id)
    const editedTax: any = await Tax.findOne({
        where: {
            id: id,
        }
    })
    if (editedTax) {
        editedTax.title = title
        editedTax.description = description
        editedTax.value = value

        await editedTax.save()
    }
    return
});