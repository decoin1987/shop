import {deliveryScheduler} from "~/server/utils/schedulers/deliveryScheduler";
import {orderScheduler} from "~/server/utils/schedulers/orderScheduler";
import {userScheduler} from "~/server/utils/schedulers/userScheduler";



export default defineNitroPlugin(() => {
    // startScheduler()
})

function startScheduler() {
    // Слежение за статусами доставок
    deliveryScheduler()
    // Слежение за статусами заказов
    orderScheduler()
    // Слежение за днями рождения
    userScheduler()
}