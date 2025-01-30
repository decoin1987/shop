import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Role from "../../../models/role";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, title, read, change, create} = await readBody(event)
    console.log(id)
    const editedRole: any = await Role.findOne({
        where: {
            id: id,
        }
    })
    if (editedRole) {
        editedRole.title = title
        editedRole.read = read
        editedRole.change = change
        editedRole.create = create
        editedRole.role = [read, change, create]
        await editedRole.save()
    }
    return
});