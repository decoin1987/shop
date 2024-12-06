import {createError, defineEventHandler, readBody, readFormData, readMultipartFormData, readRawBody} from "h3";
import * as fs from "fs";
import {CONFIG, IMAGES} from "../../../utils/helpers";
import {ProductImage} from "../../../models/product_image";
import {Product} from "../../../models/product";
import {Tag} from "../../../models/tag";
import {Category} from "../../../models/category";

var filePath = CONFIG.filePath
var logPath = CONFIG.logPath
var product: {} = {}


export default defineEventHandler(async(event) => {
    var formData = await readMultipartFormData(event)
    // var formData = await readBody(event)
    try {
        IMAGES.doDirSync(filePath)
        for (var value of formData.values()) {
            if (!value?.type?.includes('image'))  {
                // console.log(value.data.toString('utf-8'))
                product[value.name] = value.data.toString('utf-8')
            }
        }
        const productItem = await Product.create({
            title: product.title,
            price:product.price,
            vendor_code:product.vendorCode,
            as_consist:product.asConsist,
            slug: product.title,
        })
        // if (product.category) await productItem.setCategory(product.category)
        if (product.tag) await productItem.addProductTags(product.tag.split(','))
        // console.log(productItem)
        // console.log(product.tag)
        // if (product.tag) await productItem.setTag(product.tag.split(','))
        // if (product.consist) await productItem.addConsist(product.consist.split(','))

        for (var value of formData.values()) {
            if (value?.type?.includes('image'))  {
                var fileName = IMAGES.doRenameImg(value.name)
                await ProductImage.create({
                    url: fileName,
                    product_id: productItem.id
                })
                IMAGES.doSaveImage(filePath, fileName, value.data)
            }
        }
        const imageItems = await ProductImage.findAll({
            where: {'product_id': productItem.id}
        })
        console.log("Продукт создан")
        return await Product.findAndCountAll(
            {
                include: [
                    {
                        model: Tag,
                        as: 'productTags',
                    },
                    {
                        model: ProductImage,
                        as: 'productImages',
                    },
                    {
                        model: Category,
                        as: 'category'
                    }
                ],
                distinct:true,
                order: [['created_at', 'DESC']],
                // limit: 5,
                // offset:2,
            }
        )
    } catch (error: any) {
        console.error(`Ошибка: ${error}`)
        fs.appendFile(`${logPath}/log.txt`, `\r\n${Date.now()}:  ${error}`, err => {});
        createError({
            message: error
        })
    }
})
