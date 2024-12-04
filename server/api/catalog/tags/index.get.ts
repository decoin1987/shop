import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import {Tag} from "../../../models/tag";


export default defineEventHandler(async (event) => {
    return await Tag.findAndCountAll(
        {
            order: [['sort', 'ASC']],
            // limit: 5,
            // offset:2,
        }
    )
})
