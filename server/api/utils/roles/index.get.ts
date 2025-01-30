import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Role from "../../../models/role";


export default defineEventHandler(async (event) => {
    return await Role.findAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
