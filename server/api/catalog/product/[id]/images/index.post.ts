import {
    createError,
    defineEventHandler,
    getRequestHeader, getRouterParam,
    MultiPartData,
    readMultipartFormData,
} from 'h3';
import * as fs from 'fs/promises';
import { CONFIG, IMAGES } from '../../../../../utils/helpers';
import ProductImage from '../../../../../models/product_image';


const filePath = CONFIG.filePath;
const logPath = CONFIG.logPath;

export default defineEventHandler(async (event) => {
    let payload:MultiPartData[] | undefined = await readMultipartFormData(event);
    const product_id  = await getRouterParam(event, 'id')
    console.log(product_id)
    console.log(payload)
    try {
        await IMAGES.doDirSync(filePath);
        // @ts-ignore
        for (const value of payload.values()) {
            if (value?.type?.includes('image')) {
                const url = IMAGES.doRenameImg(value.name).toString();
                await ProductImage.create({
                    url, // filename
                    product_id,
                });
                await IMAGES.doSaveImage(filePath, url, value.data);
            }
        }
        console.log('Картинка добавлена');
        return {
            message: 'Картинка добавлена',
            status: 200
        };
    } catch (error: any) {
        console.error(`Ошибка: ${error}`);
        await fs.appendFile(`${logPath}/log.txt`, `\r\n${Date.now()}:  ${error}`, { encoding: 'utf-8' });
        throw createError({
            message: error.message,
        });
    }
});