import TelegramBot from 'node-telegram-bot-api'
import fs from "fs";
import {CONFIG, IMAGES} from "../utils/helpers";
// process.env.NTBA_FIX_350 = true; // fix telegram api



export default defineNitroPlugin( async () => {
    await start()
})

const token:string | undefined = process.env.BOT_TOKEN;
export const bot = new TelegramBot(token, { polling: true });
IMAGES.doDirSync(CONFIG.filePath)

const start = async () => {
    console.log('Starting bot...')
    bot.on('polling_error', (error) => {
        console.log('polling_error', error);  // => 'EFATAL'
    });
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id
        console.log(chatId);
        return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Buket72`);
    })

    // const imageBuffer = fs.readFileSync(CONFIG.filePath +'/8fd6509f-a4a2-476b-b9f0-fc4a00cd1733.webp');
    // await bot.sendPhoto(148951798, imageBuffer, {
    //     caption: '<b>⭐️ Картинка\n</b>  Цена: <b>4500</b> рублей',
    //     parse_mode: 'HTML'
    // });
    // await bot.sendPhoto(6971284116, imageBuffer, {
    //     caption: '<b>⭐️ Картинка\n</b>  Цена: <b>4500</b> рублей',
    //     parse_mode: 'HTML'
    // });
}
