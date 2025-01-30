import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Product from "../../../models/product";
import ProductColor from "../../../models/product_color";
import {removedItems, addedItems} from '../../../utils/helpers'
import ProductTag from "../../../models/product_tag";
import Consist from "../../../models/consist";
import consist from "../../../models/consist";


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const product = await readBody(event)
    console.log(product)
    var productToChange: any = await Product.findOne({
        where: {
            id: product.id,
        }
    })
    if (productToChange) {
        productToChange.title = product.title
        productToChange.count = product.count
        productToChange.price = product.price
        productToChange.descriptions = product.descriptions
        productToChange.raw_tag = product.raw_tag
        productToChange.slug = product.title
        productToChange.as_consist = product.as_consist
        productToChange.showcase = product.showcase
        productToChange.active = product.active
        productToChange.vendor_code = product.vendor_code
        productToChange.category_id = product.category_id
        productToChange.weight = product.weight
        productToChange.size = product.size
        productToChange.sort = product.sort
        productToChange.html_title = product.html_title
        productToChange.html_h1 = product.html_h1
        productToChange.html_tags = product.html_tags
        productToChange.meta_keywords = product.meta_keywords
        productToChange.meta_description = product.meta_description
        productToChange.tax_id = product.tax_id
        await productToChange.save()
    }
    if (product.colors) {
        const colorsInProduct = await ProductColor.findAll({
            where: {
                product_id: product.id
            }
        })
        const currentColorsIds = colorsInProduct.map(color => color.color_id);
        await productToChange.removeColors(removedItems(currentColorsIds as [], product.colors))
        await productToChange.addColors(addedItems(currentColorsIds as [], product.colors))
    }
    if (product.tags) {
        const tagsInProduct = await ProductTag.findAll({
            where: {
                product_id: product.id
            }
        })
        const currentTagsIds = tagsInProduct.map(tag => tag.tag_id);
        await productToChange.removeTags(removedItems(currentTagsIds as [], product.tags))
        await productToChange.addTags(addedItems(currentTagsIds as [], product.tags))
    }
    if (product.consist) {
        const productConsists = await Consist.findAll({
            where: {
                product_id: product.id
            }
        })
        const removedProductConsist = JSON.parse(JSON.stringify(productConsists))
            .filter(el => !product.consist.map(c => c.consist_id)?.includes(el.consist_id)).map(el => el.id)
        const addedProductConsist = product.consist
            .filter(el => !productConsists.map(el => el.consist_id).includes(el.consist_id)).map(el => {
                return {
                    product_id: product.id,
                    ...el
                }
            })

        await Consist.destroy({
            where: {
                id: removedProductConsist
            }
        })
        await Consist.bulkCreate(addedProductConsist)
    }

    return productToChange
});

