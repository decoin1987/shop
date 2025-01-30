import {
    createError,
    defineEventHandler,
    getRequestHeader, getRouterParam,
    MultiPartData, readBody,
    readMultipartFormData,
} from 'h3';
import * as fs from 'fs/promises';
import { CONFIG, IMAGES } from '../../../../../utils/helpers';
import ProductImage from '../../../../../models/product_image';


const filePath = CONFIG.filePath;
const logPath = CONFIG.logPath;

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const product_id  = await getRouterParam(event, 'id')
    console.log(product_id)
    console.log(data)
});