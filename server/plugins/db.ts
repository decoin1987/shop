import {sequelize} from "../utils/db.connect"
// import {User} from "@/server/models/user";

export default defineNitroPlugin( async()=> {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
//         await User.sync({force: true});
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