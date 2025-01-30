import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {User} from "../../../models/user";
import Role from "../../../models/role";


export default defineEventHandler(async (event) => {
    const users = await User.findAll(
        {
            order: [['activated', 'ASC']],
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['title', 'role'],
                },
            ]
        }
    )
    // const transformedUsers = users.map(user => ({
    //     ...user.dataValues,
    //     role: '12312123123'
    // }));
    // console.log(transformedUsers)
    return users;
})
