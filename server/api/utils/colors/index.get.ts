import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Color from "../../../models/colors";


export default defineEventHandler(async (event) => {
    return await Color.findAndCountAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
