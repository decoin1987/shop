import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import {User} from "../../../models/user";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await User.destroy({
        where: {
            id
        },
    });
    return
});