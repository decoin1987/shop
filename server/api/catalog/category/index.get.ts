import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import {Op} from "sequelize";
import Category from "../../../models/category";


export default defineEventHandler(async (event) => {
    return await Category.findAndCountAll(
        {
            include: [
                {
                    model: Category,
                    as: 'parent',
                },
                {
                    model: Category,
                    as: 'child',
                },
            ],
            distinct:true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset:2,
        }
    )
})
