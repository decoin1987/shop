import {sequelize} from "../utils/db.connect"
import Category from "../models/category";
import Tag from "../models/tag";
import Product from "../models/product";
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
        "title": "Ромашковый бриз",
        "count": 12,
        "price": 1200,
        "descriptions": "Нежный букет ромашек, создающий ощущение летнего бриза.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "RB001"
    },
    {
        "title": "Розовый закат",
        "count": 8,
        "price": 1800,
        "descriptions": "Элегантный букет розовых роз, напоминающих оттенки заката.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "RK002"
    },
    {
        "title": "Лавандовая мечта",
        "count": 15,
        "price": 1400,
        "descriptions": "Успокаивающий букет лаванды, создающий атмосферу уюта и спокойствия.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "LM003"
    },
    {
        "title": "Тюльпановое утро",
        "count": 20,
        "price": 1000,
        "descriptions": "Яркий букет тюльпанов, поднимающий настроение с самого утра.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "TU004"
    },
    {
        "title": "Альпийский ветерок",
        "count": 7,
        "price": 2000,
        "descriptions": "Экзотический букет альпийских растений, словно принесенный горным ветром.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "AV005"
    },
    {
        "title": "Жасминовая симфония",
        "count": 9,
        "price": 1600,
        "descriptions": "Ароматный букет жасмина, создающий мелодию свежести и чистоты.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "JS006"
    },
    {
        "title": "Орхидеевый восторг",
        "count": 6,
        "price": 2500,
        "descriptions": "Шикарный букет орхидей, олицетворяющий изысканность и роскошь.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "OV007"
    },
    {
        "title": "Подсолнуховый луч",
        "count": 11,
        "price": 1300,
        "descriptions": "Солнечный букет подсолнухов, наполняющий день радостью и теплом.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "PL008"
    },
    {
        "title": "Ирисовый вихрь",
        "count": 14,
        "price": 1700,
        "descriptions": "Динамичный букет ирисов, завораживающий своей грациозностью и яркостью.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "IV009"
    },
    {
        "title": "Пионовый вальс",
        "count": 18,
        "price": 1900,
        "descriptions": "Великолепный букет пионов, танцующий в ритме весеннего ветра.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "PV010"
    },
    {
        "title": "Фиолетовые грёзы",
        "count": 13,
        "price": 1350,
        "descriptions": "Волшебный букет фиолетовых цветов, погружающий в мир мечтаний.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "FG011"
    },
    {
        "title": "Хризантемная осень",
        "count": 17,
        "price": 1100,
        "descriptions": "Теплый осенний букет хризантем, дарящий уют и тепло.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "HO012"
    },
    {
        "title": "Георгиновый фейерверк",
        "count": 19,
        "price": 1450,
        "descriptions": "Яркий букет георгинов, сверкающий всеми цветами радуги.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "GF013"
    },
    {
        "title": "Магнолия в сумерках",
        "count": 21,
        "price": 1550,
        "descriptions": "Таинственный букет магнолии, созданный для романтических вечеров.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "MS014"
    },
    {
        "title": "Крокусовый рассвет",
        "count": 23,
        "price": 1250,
        "descriptions": "Нежный букет крокусов, символизирующий начало нового дня.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "CR015"
    },
    {
        "title": "Маргаритковая радость",
        "count": 25,
        "price": 1150,
        "descriptions": "Радостный букет маргариток, вызывающий улыбку и хорошее настроение.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "MR016"
    },
    {
        "title": "Маковый закат",
        "count": 27,
        "price": 1650,
        "descriptions": "Яркий букет маков, вдохновленный красками заходящего солнца.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "MZ017"
    },
    {
        "title": "Лилия белая ночь",
        "count": 29,
        "price": 1750,
        "descriptions": "Элегантный букет белых лилий, подходящий для самых торжественных случаев.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "LBN018"
    },
    {
        "title": "Анютины глазки",
        "count": 31,
        "price": 1050,
        "descriptions": "Веселый букет анютиных глазок, полный жизнерадостности и энергии.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "AG019"
    },
    {
        "title": "Вересковая тишина",
        "count": 33,
        "price": 1850,
        "descriptions": "Спокойный букет вереска, создающий атмосферу уединения и покоя.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "VT020"
    },
    {
        "title": "Василёк под солнцем",
        "count": 35,
        "price": 1950,
        "descriptions": "Летний букет васильков, наполненный светом и теплом солнечных лучей.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "VP021"
    },
    {
        "title": "Колокольчик лесной",
        "count": 37,
        "price": 2050,
        "descriptions": "Загадочный букет колокольчиков, найденных в глубине леса.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "KL022"
    },
    {
        "title": "Незабудковые воспоминания",
        "count": 39,
        "price": 2150,
        "descriptions": "Трогательный букет незабудок, напоминающий о самых дорогих моментах жизни.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "NV023"
    },
    {
        "title": "Одуванчики на лугу",
        "count": 41,
        "price": 2250,
        "descriptions": "Свободный букет одуванчиков, собранных на залитом солнцем лугу.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "OL024"
    },
    {
        "title": "Гладиолусы в саду",
        "count": 43,
        "price": 2350,
        "descriptions": "Роскошный букет гладиолусов, выращенных в самом сердце сада.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "GS025"
    },
    {
        "title": "Камелия в тени",
        "count": 45,
        "price": 2450,
        "descriptions": "Изящный букет камелий, скрывающийся в прохладной тени деревьев.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "CT026"
    },
    {
        "title": "Флоксовый аромат",
        "count": 47,
        "price": 2550,
        "descriptions": "Ароматный букет флоксов, источающий сладкое благоухание лета.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "FA027"
    },
    {
        "title": "Лютики в росе",
        "count": 49,
        "price": 2650,
        "descriptions": "Утренний букет лютиков, покрытых каплями росы, словно драгоценными камнями.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "LR028"
    },
    {
        "title": "Гвоздика в бокале",
        "count": 51,
        "price": 2750,
        "descriptions": "Стильный букет гвоздик, представленный в элегантном бокале.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "GB029"
    },
    {
        "title": "Азалия в вазе",
        "count": 53,
        "price": 2850,
        "descriptions": "Роскошный букет азалий, красиво расставленных в хрустальной вазе.",
        "as_consist": true,
        "showcase": true,
        "active": true,
        "decrease_stock": false,
        "vendor_code": "AZ030"
    }
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

const CategoryNames = [
    "Монобукеты",
    "Авторские букеты",
    "Цветы в коробке",
    "Цветы в корзине",
    "Букеты из сухоцветов",
    "Цветы для интерьера",
    "Цветы в ящиках",
    "Букеты невесты",
    "Подарочные наборы",
    "Мягкие игрушки",
    "Вазы",
    "Подарки и сувениры",
    "Цветы по подписке",
    "Цветы поштучно"
]

const categoryToSaveBase = CategoryNames.map((elementNames, index) => {
    return {
        title: elementNames,
        sort: 100 + index,
        slug: stringSlugify(elementNames)
    }
})
const flowersToSaveBase = FlowersNames.map(elementNames => {
    return {
        title: elementNames,
        sort: 500,
        slug: stringSlugify(elementNames)
    }
})

export default defineNitroPlugin(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        // await User.sync({force: true});

        // await Category.bulkCreate(categoryToSaveBase)
        // const flower = await Category.findOne({where: {title: "Цветы поштучно"}})
        //
        // // Добавляем parent_id ко всем цветам
        // const flowersWithParent = flowersToSaveBase.map(item => ({
        //     ...item,
        //     parent_id: flower.id
        // }))
        //
        // await Category.bulkCreate(flowersWithParent)
        // await Tag.bulkCreate(tags)
        // await Product.bulkCreate(product)

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