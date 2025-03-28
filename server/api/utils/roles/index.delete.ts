import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Role from "../../../models/role";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id} = await readBody(event)
    console.log(id)
    await Role.destroy({
        where: {
            id
        },
    });
    return
});