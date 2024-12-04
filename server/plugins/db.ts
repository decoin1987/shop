import {sequelize} from "../utils/db.connect"
import {Category} from "../models/category";
import {Tag} from "../models/tag";
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

const flowers = [
    {
        "title": "Пионы",
        "descriptions": null,
        "sort": 1000,
        "slug": "piony",
    },
    {
        "title": "Розы",
        "descriptions": null,
        "sort": 1000,
        "slug": "rozy",
    },
    {
        "title": "Тюльпаны",
        "descriptions": null,
        "sort": 1000,
        "slug": "tulpany",
    },
    {
        "title": "Хризантемы",
        "descriptions": null,
        "sort": 1000,
        "slug": "khrizantemy",
    },
    {
        "title": "Хуйзантемы",
        "descriptions": null,
        "sort": 1000,
        "slug": "khyizantemy",
    },
]

const tags = [
    {

    "title": "День рождения",
    "descriptions": null,
    "sort": "500",
    "slug": "den_rozhdeniya"
}, {

    "title": "Поздравления",
    "descriptions": null,
    "sort": "500",
    "slug": "pozdravleniya"
}, {

    "title": "Симпатия",
    "descriptions": null,
    "sort": "500",
    "slug": "simpatiya"
}, {

    "title": "Годовщина",
    "descriptions": null,
    "sort": "500",
    "slug": "godovshchina"
}, {

    "title": "Свадьба",
    "descriptions": null,
    "sort": "500",
    "slug": "svadba"
}, {

    "title": "Рождение ребенка",
    "descriptions": null,
    "sort": "500",
    "slug": "rozhdenie_rebenka"
}, {

    "title": "Поправляйся",
    "descriptions": null,
    "sort": "500",
    "slug": "popravlyaysya"
}]

export default defineNitroPlugin(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
//         await User.sync({force: true});
        await Category.bulkCreate(cat)
        const flower = await Category.findOne({where: {title: "Сувениры"}})

// Добавляем parent_id ко всем цветам
        const flowersWithParent = flowers.map(item => ({
            ...item,
            parent_id: flower.id
        }))

// Создаем все подкатегории цветов одним запросом
        await Category.bulkCreate(flowersWithParent)
        await Tag.bulkCreate(tags)

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