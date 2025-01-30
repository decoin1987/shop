import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";



export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)

    return
});