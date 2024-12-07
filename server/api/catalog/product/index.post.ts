import {createError, defineEventHandler, readBody, readFormData, readMultipartFormData, readRawBody} from 'h3';
import * as fs from 'fs/promises';
import {CONFIG, IMAGES} from '../../../utils/helpers';
import ProductImage from '../../../models/product_image';
import Product, {ProductAttributes} from '../../../models/product';
import Tag from '../../../models/tag';
import Category from '../../../models/category';

const filePath = CONFIG.filePath;
const logPath = CONFIG.logPath;
let product: Record<string, unknown> = {};

export default defineEventHandler(async (event) => {
    let formData = await readMultipartFormData(event);
    try {
        await IMAGES.doDirSync(filePath);
        for (const value of formData.values()) {
            if (!value?.type?.includes('image')) {
                product[value.name] = value.data.toString('utf-8');
            }
        }
        const productItem: ProductAttributes = await Product.create({
            title: product.title as string,
            price: parseInt(product.price as string),
            vendor_code: product.vendorCode as string,
            as_consist: !!product.asConsist,
            slug: product.title as string,
        });
        console.log(product.tag)
        if (product.category) await productItem.setCategory(product.category);
        if (product.tag) await productItem.addTags((product.tag as string).split(','));

        for (const value of formData.values()) {
            if (value?.type?.includes('image')) {
                const fileName = IMAGES.doRenameImg(value.name).toString();
                await ProductImage.create({
                    url: fileName,
                    product_id: productItem.id,
                });
                await IMAGES.doSaveImage(filePath, fileName, value.data);
            }
        }
        console.log('Продукт создан');
        const products = await Product.findAndCountAll({
            include: [
                {
                    model: Tag,
                    as: 'tags',
                },
                {
                    model: ProductImage,
                    as: 'productImages',
                },
                {
                    model: Category,
                    as: 'category',
                },
            ],
            distinct: true,
            order: [['created_at', 'DESC']],
            // limit: 5,
            // offset: 2,
        });
        return products;
    } catch (error: any) {
        console.error(`Ошибка: ${error}`);
        await fs.appendFile(`${logPath}/log.txt`, `\r\n${Date.now()}:  ${error}`, {encoding: 'utf-8'});
        throw createError({
            message: error.message,
        });
    }
});