import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
const env = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
    console.log(env)
    return env
})
