// @ts-nocheck
import path from "path";

import fs from "fs";
import {createError} from "h3";
import {v4 as uuid} from "uuid";

export const CONFIG = {
    filePath: process.env.NODE_ENV === 'development' ? path.resolve(process.cwd(), 'public/img/product') : path.resolve(process.cwd(), '.output/public/img/product'),
    logPath: path.resolve(process.cwd(), 'log')
}

console.log(process.cwd())
console.log(CONFIG)

export const IMAGES = {
    doDirSync: (filePath: string) => {
        try {
            if (!fs.existsSync(filePath)){
                fs.mkdirSync(filePath)
                console.log(`Путь ${filePath} успешно создан`)
                return
            }
            `Путь ${filePath} проверен`
            return;
        } catch (e) {
            createError({
                message:'ошибка'
            })
        }
        console.log('Сихронизация...')
    },
    doRenameImg:(oldFileName: string) => {
        var ext = oldFileName.split('.')[1]
        return `${uuid()}.${ext}`
    },
    doSaveImage:(path: any, name: any, data: any) => {
        var fileName = name
        fs.writeFileSync(`${CONFIG.filePath + '/' +  fileName}`, data)
        try {
            IMAGES.doDirSync(CONFIG.logPath)
            fs.appendFile(`${CONFIG.logPath}/log.txt`, `\r\n${Date.now()}:  Файл ${fileName} успешно сохранен на диск`, (err:object):void => {});
        } catch (error) {
            fs.appendFile(`${CONFIG.logPath}/log.txt`, `${error}`, (err:object):void => {});
            createError({
                message: "Ошибка при сохранении файла"
            })
        }
    },
    doCheckImages: (images: []) => {
        let path:[] = []
        for (let img of images) {
            path.push(img.url)
        }
        return path
    },
    doDelImages: (item)=> {
        const path = IMAGES.doCheckImages(item)
        for (let url of path) {
            fs.unlink(CONFIG.filePath + '/' + url, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    },
}

//Транслитерация кириллицы в URL
export const stringSlugify = (str: String) => {
    str = str.toLowerCase(); // все в нижний регистр
    var cyr2latChars = [['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'],
        ['д', 'd'],  ['е', 'e'], ['ё', 'yo'], ['ж', 'zh'], ['з', 'z'],
        ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'],
        ['м', 'm'],  ['н', 'n'], ['о', 'o'], ['п', 'p'],  ['р', 'r'],
        ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'],
        ['х', 'h'],  ['ц', 'c'], ['ч', 'ch'],['ш', 'sh'], ['щ', 'shch'],
        ['ъ', ''],  ['ы', 'y'], ['ь', ''],  ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],

        ['А', 'A'], ['Б', 'B'],  ['В', 'V'], ['Г', 'G'],
        ['Д', 'D'], ['Е', 'E'], ['Ё', 'YO'],  ['Ж', 'ZH'], ['З', 'Z'],
        ['И', 'I'], ['Й', 'Y'],  ['К', 'K'], ['Л', 'L'],
        ['М', 'M'], ['Н', 'N'], ['О', 'O'],  ['П', 'P'],  ['Р', 'R'],
        ['С', 'S'], ['Т', 'T'],  ['У', 'U'], ['Ф', 'F'],
        ['Х', 'H'], ['Ц', 'C'], ['Ч', 'CH'], ['Ш', 'SH'], ['Щ', 'SHCH'],
        ['Ъ', ''],  ['Ы', 'Y'],
        ['Ь', ''],
        ['Э', 'E'],
        ['Ю', 'YU'],
        ['Я', 'YA'],

        ['a', 'a'], ['b', 'b'], ['c', 'c'], ['d', 'd'], ['e', 'e'],
        ['f', 'f'], ['g', 'g'], ['h', 'h'], ['i', 'i'], ['j', 'j'],
        ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['o', 'o'],
        ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'], ['t', 't'],
        ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
        ['z', 'z'],

        ['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'],['E', 'E'],
        ['F', 'F'],['G', 'G'],['H', 'H'],['I', 'I'],['J', 'J'],['K', 'K'],
        ['L', 'L'], ['M', 'M'], ['N', 'N'], ['O', 'O'],['P', 'P'],
        ['Q', 'Q'],['R', 'R'],['S', 'S'],['T', 'T'],['U', 'U'],['V', 'V'],
        ['W', 'W'], ['X', 'X'], ['Y', 'Y'], ['Z', 'Z'],

        [' ', '-'],['0', '0'],['1', '1'],['2', '2'],['3', '3'],
        ['4', '4'],['5', '5'],['6', '6'],['7', '7'],['8', '8'],['9', '9'],
        ['-', '-']];

    var newStr = String();

    for (var i = 0; i < str.length; i++) {

        var ch = str.charAt(i);
        var newCh = '';

        for (var j = 0; j < cyr2latChars.length; j++) {
            if (ch == cyr2latChars[j][0]) {
                newCh = cyr2latChars[j][1];

            }
        }
        // Если найдено совпадение, то добавляется соответствие, если нет - пустая строка
        newStr += newCh;

    }
    // Удаляем повторяющие знаки - Именно на них заменяются пробелы.
    // Так же удаляем символы перевода строки, но это наверное уже лишнее
    return newStr.replace(/[-]{2,}/gim, '-').replace(/\n/gim, '-');
    // return newStr
}

export function removedItems (currentValue:[], newValue:[]) {
    console.log(currentValue.filter(id => !newValue?.includes(id)))
    return currentValue.filter(id => !newValue?.includes(id));
}
export function addedItems (currentValue:[], newValue:[]) {
    console.log(newValue.filter(id => !currentValue?.includes(id)))
    return newValue.filter(id => !currentValue?.includes(id));
}

export default {
    CONFIG,
    IMAGES,
    stringSlugify,
    removedItems,
    addedItems,
}