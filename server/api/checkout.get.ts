import {defineEventHandler, getQuery, getRouterParam, readBody, sendRedirect} from "h3";


export default defineEventHandler(async (event) => {
    console.log(getQuery(event))
    return await sendRedirect(event, '/account', 302)
})
