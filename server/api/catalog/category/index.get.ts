import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import {Category} from "../../../models/category";


export default defineEventHandler(async (event) => {
    const categories = await Category.findAndCountAll()

    return categories
})
