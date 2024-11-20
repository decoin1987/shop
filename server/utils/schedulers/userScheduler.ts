import { useScheduler } from "#scheduler/userScheduler"
import dayjs from "dayjs";
import {bot} from "~/server/plugins/telegram";

export const userScheduler = () => {
    const scheduler = useScheduler();
    try {
        scheduler.run(async () => {
            await bot.sendMessage(148951798, 'Слежение за днями рождения: ' + dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за днями рождения конец цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за днями рождения конец цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
        }).everyHours(10);
        console.log('Cлужба слежения за статусами заказов запущена')
    } catch (e) {}
}

