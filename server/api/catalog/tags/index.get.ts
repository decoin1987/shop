import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Tag from "../../../models/tag";


export default defineEventHandler(async (event) => {
    return await Tag.findAll(
        {
            order: [['sort', 'ASC']],
            // limit: 5,
            // offset:2,
        }
    )
})
