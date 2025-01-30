import {createError, defineEventHandler, getQuery, getRouterParam} from "h3";
import Tax from "../../../models/tax";
import TransactionStatus from "../../../models/transaction_status";


export default defineEventHandler(async (event) => {
    return await TransactionStatus.findAll(
        {
            order: [['title', 'ASC']],
        }
    )
})
