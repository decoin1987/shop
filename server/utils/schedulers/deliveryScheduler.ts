// @ts-ignore
import { useScheduler } from "#scheduler/userScheduler"
import dayjs from "dayjs";
import { bot } from "../../plugins/telegram";

export const deliveryScheduler = () => {
    const scheduler = useScheduler();
    try {
        scheduler.run(async () => {
            await bot.sendMessage(148951798, 'Слежение за статусами доставок: ' + dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за статусами доставок начало цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
            console.log('Слежение за статусами доставок конец цикла: ', dayjs().format('D MMMM YYYY -- HH:mm:ss'))
        }).everyMinutes(10);
        console.log('Cлужба слежения за статусами доставки запущена')
    } catch (e) {}
}