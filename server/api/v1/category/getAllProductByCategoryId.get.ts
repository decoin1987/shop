import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import Category from "../../../models/category";



export default defineEventHandler(async (event) => {
    const slug = await getRouterParam(event,  "slug")
    console.log(slug)
    return await Category.findOne({where: {slug:slug}})
})
