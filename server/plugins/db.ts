import {sequelize} from "../utils/db.connect"
import {defineNitroPlugin} from "nitropack/runtime";
import seedSuperUser from "../.seeds/su";
import 'dotenv/config'
import {users} from "./../utils/users"
import {User} from "../models/user";
import { v4 as uuid } from 'uuid'
import {useRuntimeConfig} from "nuxt/app";
import Category from "../models/category";
import Color from "../models/colors";
import Tag from "../models/tag";
import Tax from "../models/tax";
import Product from "../models/product";
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
const Colors = [
    {
        "id": "275f548d-996f-467e-b631-1c16b052a1fb",
        "title": "Белый",
        "hex": "#ffffff",
        "rgb": "255 255 255",
        "hsl": "0 0 100",
        "hwb": "0 100 0",
        "lab": "100 0.00526049995830391 -0.010408184525267927",
        "xyz": "95.05 100 108.89999999999999",
        "hsv": "0 0 100"
    },
    {
        "id": "fa3ca0d4-975f-4011-ad93-a93074f34bd9",
        "title": "Голубой",
        "hex": "#2abfe5",
        "rgb": "42 191 229",
        "hsl": "192.19251336898395 78.24267782426779 53.13725490196079",
        "hwb": "192.19251336898395 16.470588235294116 10.196078431372547",
        "lab": "71.83303209148558 -24.601825807727128 -29.581843326742295",
        "xyz": "33.72850365602078 43.41098681534116 80.73022031388435",
        "hsv": "192.19251336898395 81.6593886462882 89.80392156862746"
    },
    {
        "id": "dc285e3f-32b8-4e9f-b991-5bfd913d62cf",
        "title": "Желтый",
        "hex": "#fced23",
        "rgb": "252 237 35",
        "hsl": "55.85253456221198 97.30941704035875 56.27450980392157",
        "hwb": "55.85253456221198 13.725490196078432 1.17647058823529",
        "lab": "92.30281549794286 -13.71967229784099 86.82547157579427",
        "xyz": "70.73244366716267 81.38516964439113 13.571019395378393",
        "hsv": "55.85253456221198 86.11111111111111 98.82352941176471"
    },
    {
        "id": "96b87c8b-0d10-407f-b858-b130cd7db57b",
        "title": "Красный",
        "hex": "#d11f1f",
        "rgb": "209 31 31",
        "hsl": "0 74.16666666666666 47.05882352941176",
        "hwb": "0 12.156862745098039 18.039215686274513",
        "lab": "45.129066762485124 65.32556587564953 47.09994363748331",
        "xyz": "27.031804172288567 14.634211560256722 2.696273790377061",
        "hsv": "0 85.16746411483254 81.9607843137255"
    },
    {
        "id": "ab01f868-5307-41e0-b046-f3bf659ec7a5",
        "title": "Оранжевый",
        "hex": "#f36621",
        "rgb": "243 102 33",
        "hsl": "19.71428571428572 89.74358974358974 54.11764705882353",
        "hwb": "19.71428571428572 12.941176470588234 4.705882352941182",
        "lab": "60.48681694349018 51.11728848646058 61.42289333356773",
        "xyz": "41.988032997252844 28.667234284399395 4.759159540831698",
        "hsv": "19.714285714285715 86.41975308641975 95.29411764705881"
    },
    {
        "id": "3bd4e6e1-c840-44c4-a046-2b7340309b1e",
        "title": "Розовый",
        "hex": "#ff4788",
        "rgb": "255 71 136",
        "hsl": "338.80434782608694 100 63.921568627450974",
        "hwb": "338.80434782608694 27.84313725490196 0",
        "lab": "59.47455981515216 72.67703133294972 5.917626869390835",
        "xyz": "47.937172178353705 27.544050041385127 26.08251551400552",
        "hsv": "338.80434782608694 72.15686274509804 100"
    },
    {
        "id": "d4ec0b07-514d-4f08-88f7-93409fd129e1",
        "title": "Синий",
        "hex": "#2357bc",
        "rgb": "35 87 188",
        "hsl": "219.6078431372549 68.60986547085203 43.72549019607843",
        "hwb": "219.6078431372549 13.725490196078432 26.274509803921564",
        "lab": "39.249321813022675 20.64495316354903 -57.97368215182716",
        "xyz": "13.17843175026024 10.804555048948128 48.96786107343983",
        "hsv": "219.6078431372549 81.38297872340425 73.72549019607843"
    },
    {
        "id": "54cc8a77-145a-4697-841f-45746b8b49c9",
        "title": "Фиолетовый",
        "hex": "#733b97",
        "rgb": "115 59 151",
        "hsl": "276.5217391304348 43.80952380952381 41.17647058823529",
        "hwb": "276.5217391304348 23.137254901960784 40.78431372549019",
        "lab": "35.998024369088604 41.30558098484938 -40.875377126121016",
        "xyz": "14.220109697307004 9.007132716780964 30.267223986961657",
        "hsv": "276.5217391304348 60.92715231788079 59.2156862745098"
    }
]
const tax = [{
    "id": "5612b88a-519c-4dc7-983a-84e367400cc0",
    "title": "Без НДС (Т-Банк)",
    "description": "Без НДС интеграция Т-Банк",
    "value": "vat0"
}, {
    "id": "6b9af4f2-96c1-4a5a-b1d4-9cf6575ba09c",
    "title": "НДС 10% (Т-Банк)",
    "description": "НДС 10% для интеграции Т-Банк",
    "value": "vat10"
}, {
    "id": "b802671a-8c25-475b-b410-1541ea2ecc96",
    "title": "НДС 18% (Т-Банк)",
    "description": "НДС 18% для интеграции Т-Банк",
    "value": "vat18"
}]

const categoryToSaveBase = CategoryNames.map((elementNames, index) => {
    return {
        title: elementNames,
        sort: 100 + index,
        slug: elementNames
    }
})
const flowersToSaveBase = FlowersNames.map(elementNames => {
    return {
        title: elementNames,
        sort: 500,
        slug: elementNames
    }
})

export default defineNitroPlugin(async () => {
    // console.log(process.env)
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        // const userForSave = users.filter(el => el.email != '').map((user, index) => {
        //     if (!!user.email && !!user.telephone && !!user.salt && !!user.password) {
        //         console.log(user.email != '', user.telephone != '', user.salt != '', user.password != '')
        //         return {
        //             telephone: '+7'+ user.telephone.replaceAll(' ', '').replaceAll('-', '').slice(-10),
        //             email: user.email.toLowerCase(),
        //             password: null,
        //             salt: null,
        //             activationLink: uuid(),
        //             activated: true,
        //             role_id: '893d8743-cc68-4089-8011-3c6d6418bf7c',
        //         }
        //     }
        // })
        // for (let el of userForSave) {
        //     try {
        //         if (!!el.email) {
        //             console.log(el.email)
        //             await User.create(el);
        //         }
        //
        //     } catch (e) {
        //         console.log (e)
        //     }
        // }
        // await User.sync({force: true});
        // await User.bulkCreate(userForSave)
        // const flower = await Category.findOne({where: {title: "Цветы поштучно"}})
        //
        // // Добавляем parent_id ко всем цветам
        // const flowersWithParent = flowersToSaveBase.map(item => ({
        //     ...item,
        //     parent_id: flower.id
        // }))
        //
        // await Category.bulkCreate(flowersWithParent)
        await seedSuperUser()


        // await Category.bulkCreate(categoryToSaveBase)
        // await Color.bulkCreate(Colors)
        // await Tag.bulkCreate(tags)
        // await Tax.bulkCreate(tax)
        // await Product.bulkCreate(product.map(el => el = {...el, slug: el.title}))

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