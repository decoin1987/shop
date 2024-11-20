import { useScheduler } from "#scheduler/userScheduler"
import dayjs from "dayjs";
import {bot} from "~/server/plugins/telegram";

export const orderScheduler = () => {
    const scheduler = useScheduler();
    try {
        scheduler.run(async () => {
            await bot.sendMessage(148951798, 'Слежение за статусами заказов: ' + dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за статусами заказов начало цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за статусами заказов конец цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
        }).everyMinutes(10);
        console.log('Cлужба слежения за статусами заказов запущена')
    } catch (e) {}
}