import {createError, defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Color from "../../../models/colors";
import parseHex from "../../../../utils/parseHex";
import rgb2hsl from "../../../../utils/rgb2hsl";
import rgb2hwb from "../../../../utils/rgb2hwb";
import rgb2lab from "../../../../utils/rgb2lab";
import rgb2xyz from "../../../../utils/rgb2xyz";
import rgb2hsv from "../../../../utils/rgb2hsv";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {title, color} = await readBody(event)
    console.log({title, color})
    try {
        if (!/[^ ]/.test(title) || title.length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название цвета'
            })
        } else {
            await Color.create({
                title: title.trim(),
                hex: color,
                rgb: parseHex(color).join(' '),
                hsl: rgb2hsl(parseHex(color)).join(' '),
                hwb: rgb2hwb(parseHex(color)).join(' '),
                lab: rgb2lab(parseHex(color)).join(' '),
                xyz: rgb2xyz(parseHex(color)).join(' '),
                hsv: rgb2hsv(parseHex(color)).join(' '),
            })
        }
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message
        })
    }
    return await Color.findAndCountAll(
        {
            distinct:true,
            // limit: 5,
            // offset:2,
            order: [['title', 'ASC']],
        }
    )
});