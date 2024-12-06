import {sequelize} from "../utils/db.connect"
import {Category} from "../models/category";
import {Tag} from "../models/tag";
import {Product} from "../models/product";
import {stringSlugify} from "../utils/helpers";
import {elementNames} from "dom-serializer/lib/foreignNames";
// import {User} from "@/server/models/user";
const cat = [
    {
        "title": "Букеты",
        "descriptions": null,
        "sort": 500,
        "slug": "bukety",
    },
    {
        "title": "Цветы",
        "descriptions": null,
        "sort": 500,
        "slug": "cvety",
    },
    {
        "title": "Подарки",
        "descriptions": null,
        "sort": 500,
        "slug": "podarki",
    },
    {
        "title": "Вазы",
        "descriptions": null,
        "sort": 500,
        "slug": "vazy",
    },
    {
        "title": "Сувениры",
        "descriptions": null,
        "sort": 500,
        "slug": "suveniry",
    },
    {
        "title": "Мягкие игрушки",
        "descriptions": null,
        "sort": 500,
        "slug": "myagkie_igruishki",
    }
]

const tags = [
    {

    "title": "День рождения",
    "descriptions": null,
    "sort": "500",
    "slug": "den_rozhdeniya"
},
    {
    "title": "Поздравления",
    "descriptions": null,
    "sort": "500",
    "slug": "pozdravleniya"
},
    {

    "title": "Симпатия",
    "descriptions": null,
    "sort": "500",
    "slug": "simpatiya"
},
    {

    "title": "Годовщина",
    "descriptions": null,
    "sort": "500",
    "slug": "godovshchina"
},
    {

    "title": "Свадьба",
    "descriptions": null,
    "sort": "500",
    "slug": "svadba"
},
    {

    "title": "Рождение ребенка",
    "descriptions": null,
    "sort": "500",
    "slug": "rozhdenie_rebenka"
},
    {

    "title": "Поправляйся",
    "descriptions": null,
    "sort": "500",
    "slug": "popravlyaysya"
}]

const product = [
    {

        "title": "Букет",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "byket",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {

        "title": "Букет2",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket2",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет3",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket3",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет4",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket4",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет5",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket5",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет6",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket6",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет7",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket7",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет8",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket8",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет9",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket9",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
    {
        "title": "Букет10",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket10",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",

    },
    {
        "title": "Букет11",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket11",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",

    },
    {
        "title": "Букет12",
        "count": null,
        "price": 123,
        "descriptions": null,
        "raw_tag": null,
        "slug": "buket12",
        "as_consist": false,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "12344",
    },
]

const FlowersNames = [
    "Роза",
    "Пион",
    "Тюльпан",
    "Ирис",
    "Лилия",
    "Хризантема",
    "Орхидея",
    "Альстромерия",
    "Эустома",
    "Георгин",
    "Ромашка",
    "Фрезия",
    "Подсолнечник",
    "Герберы",
    "Крокус",
    "Маргаритка",
    "Гортензия",
    "Лаванда",
    "Мак",
    "Анютины глазки",
    "Жасмин",
    "Ландыш",
    "Нигелла",
    "Протея",
    "Стрелиция",
    "Калла",
    "Циния",
    "Дельфиниум",
    "Вероника",
    "Гипсофила",
    "Лизиантус",
    "Ранункулюс",
    "Анемона",
    "Бруния",
    "Ваксфлауэр",
    "Амми",
    "Клематисы",
    "Гладиолусы",
    "Лизиантусы",
    "Левкой",
    "Мускари",
    "Нарцисс",
    "Папоротники",
    "Пролеска",
    "Сирень",
    "Суккуленты",
    "Фаленопсис",
    "Ятрышник"
]

const flowersToSaveBase = FlowersNames.map(elementNames  => {
    return {
        title: elementNames,
        slug: stringSlugify(elementNames)
    }
})

export default defineNitroPlugin(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
//         await User.sync({force: true});
        await Category.bulkCreate(cat)
        const flower = await Category.findOne({where: {title: "Цветы"}})

// Добавляем parent_id ко всем цветам
        const flowersWithParent = flowersToSaveBase.map(item => ({
            ...item,
            parent_id: flower.id
        }))

// Создаем все подкатегории цветов одним запросом
        await Category.bulkCreate(flowersWithParent)
        await Tag.bulkCreate(tags)
        await Product.bulkCreate(product)

        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log(
            'Невозможно выполнить подключение к БД:'
            +
            '\n ----------------------------------- \n',
            e,
            '\n -----------------------------------'
        )
    }
})