
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Color from "../../../models/colors";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await Color.destroy({
        where: {
            id
        },
    });
    return
});