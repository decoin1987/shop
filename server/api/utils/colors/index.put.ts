import {defineEventHandler, EventHandlerRequest, H3Event, readBody} from "h3";
import Color from "../../../models/colors";
import parseHex from "../../../../utils/parseHex";
import rgb2hsl from "../../../../utils/rgb2hsl";
import rgb2hwb from "../../../../utils/rgb2hwb";
import rgb2lab from "../../../../utils/rgb2lab";
import rgb2xyz from "../../../../utils/rgb2xyz";
import rgb2hsv from "../../../../utils/rgb2hsv";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const {id, color} = await readBody(event)
    console.log(id, color)
    const editedColor: any = await Color.findOne({
        where: {
            id: id,
        }
    })
    if (editedColor) {
        editedColor.hex = color
        editedColor.rgb = parseHex(color).join(' ')
        editedColor.hsl = rgb2hsl(parseHex(color)).join(' ')
        editedColor.hwb = rgb2hwb(parseHex(color)).join(' ')
        editedColor.lab = rgb2lab(parseHex(color)).join(' ')
        editedColor.xyz = rgb2xyz(parseHex(color)).join(' ')
        editedColor.hsv = rgb2hsv(parseHex(color)).join(' ')
        await editedColor.save()
    }
    return await Color.findAndCountAll(
        {
            distinct: true,
            order: [['title', 'ASC']],
            // limit: 5,
            // offset:2,
        }
    )
});