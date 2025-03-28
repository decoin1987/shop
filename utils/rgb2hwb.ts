import rgb2hsl from "./rgb2hsl";

export default function(rgb) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2],
        h = rgb2hsl(rgb)[0],
        w = 1/255 * Math.min(r, Math.min(g, b)),
        b = 1 - 1/255 * Math.max(r, Math.max(g, b));

    return [h, (w * 100), (b * 100)]
}