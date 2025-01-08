import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Tax from "../../../models/tax";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await Tax.destroy({
        where: {
            id
        },
    });
    return
});