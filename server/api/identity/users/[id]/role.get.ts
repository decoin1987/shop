import {createError, defineEventHandler, getQuery, getRouterParam, sendRedirect} from "h3";
import {User} from "../../../../models/user";
import Role from "../../../../models/role";



export default defineEventHandler(async (event) => {
    const userId = await getRouterParam(event,  "id")
    const user = await User.findByPk(userId)
    if (!user) {
        return
    }
    const role = await Role.findOne({where: { id: user.role_id }})
    return role.role
})
