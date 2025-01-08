import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Tax from "../../../models/tax";


export default defineEventHandler(async (event) => {
    return await Tax.findAndCountAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
