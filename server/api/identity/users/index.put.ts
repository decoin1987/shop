import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import {User} from "../../../models/user";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, value, description} = await readBody(event)
    console.log(id)
    const editedUser: any = await User.findOne({
        where: {
            id: id,
        }
    })
    if (editedUser) {
        editedUser.title = title

        await editedUser.save()
    }
    return
});