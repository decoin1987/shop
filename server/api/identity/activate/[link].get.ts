import {createError, defineEventHandler, getQuery, getRouterParam, sendRedirect} from "h3";
import {User} from "../../../models/user";
import UserDto from "../../../dtos/user-dto";

export default defineEventHandler(async (event) => {
    const activationLink = await getRouterParam(event,  "link")
    const user = await User.findOne({where: {activationLink}})
    if (!user) {
        throw createError({
            status: 401,
            message: 'Произошла фатальная ошибка, повторите заново'
        })
    }
    else {
        user.activationLink = ''
        user.isActivated = true
        user.save()
        await sendRedirect(event, '/account', 302)
    }

})
