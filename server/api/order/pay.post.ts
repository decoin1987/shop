//@ts-nocheck
import {
    defineEventHandler,
    getQuery,
    getRouterParam,
    readBody,
    EventHandlerRequest,
    H3Event,
    sendRedirect,
    createError
} from "h3";
import crypto from 'crypto'

const {TERMINAL:log, T_SECRET:pass} = process.env;

function sha256(str: string) {
    // Создаем экземпляр объекта hash с алгоритмом SHA-256
    const sha256 = crypto.createHash('sha256');

    // Передаем строку в объект hash и получаем её хеш
    sha256.update(str);
    const hash = sha256.digest('hex');
    return hash;
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const order = await readBody(event)
    order.Password = pass
    console.dir(order)
    const token = (ord) => {
        let temp = []
        for (let item in ord) {
            // console.log(typeof ord[item])

            if (typeof ord[item] === 'string' || typeof ord[item]  === 'number') {
                temp.push(item)
            }
        }
        temp.sort()
        console.log(temp)
        let concatArray = temp.map(el => {
            return ord[el]
        }).join('')
        const token = sha256(concatArray)
        console.log(token)
        return token
    }
    delete order.Password
    const body = {
        ...order,
        "Token": token(order)
    }

    console.log('body', body)

    const responseFromBank = await $fetch('https://securepay.tinkoff.ru/v2/Init', {
        method: "POST",
        body
    })
    console.log(responseFromBank)

    // return await sendRedirect(event, 'https://securepayments.tinkoff.ru/XhyOleOj', 302)|| createError({ message: 'Ошибка при оплате попробуйте позже'})
    return responseFromBank
    // PaymentURL
})
