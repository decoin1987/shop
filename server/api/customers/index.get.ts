import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Customer} from "../../models/customers";
import {User} from "../../models/user";



export default defineEventHandler(async (event) => {
    const customers = await Customer.findAll(
        {
            include: [
                {
                    model: User,
                    attributes: ['email', 'id']
                },
            ]
        }
    )
    // const transformedUsers = users.map(user => ({
    //     ...user.dataValues,
    //     role: '12312123123'
    // }));
    // console.log(transformedUsers)
    return customers;
})
