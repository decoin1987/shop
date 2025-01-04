import Category from "../../../models/category";
import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Product from "../../../models/product";
import Tag from "../../../models/tag";
import ProductImage from "../../../models/product_image";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const product = await readBody(event)
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
        await productToChange.save()
    }
    return productToChange
});