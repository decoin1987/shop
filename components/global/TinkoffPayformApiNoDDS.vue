<script lang="ts" setup>
import {useHead} from "@unhead/vue";
import {navigateTo, useAsyncData, useCookie, useRouter} from "nuxt/app";


const router = useRouter()


const token = useCookie('token', {maxAge: 3 * 24 * 60 * 60 * 1000})
useHead({
  title: 'Корзина',
  // meta: [
  //   { name: 'description', content: 'My amazing site.' }
  // ],
  // bodyAttrs: {
  //   class: ''
  // },
  // script: [
  //   {
  //     src: 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js',
  //     // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
  //     tagPosition: 'head'
  //   }
  // ]
})

// const cartStore = useCartStore()
// const orderItems = computed(() => cartStore.theCart)


// const orderAmount = computed(() => {
//   const count = Object.keys(cartStore.theCart).reduce(function (previous, key) {
//     return previous + cartStore.theCart[key].count * cartStore.theCart[key].price;
//   }, 0)
//   return count
// })
// const orderAmount = {
//   value: '7808'
// }
// const formTinkoff = ref(null);
// onMounted(async () => {
//   const form = formTinkoff.value;
//   form.amount.value = orderAmount.value
//   form.receipt.value = JSON.stringify({
//     "EmailCompany": "mail@mail.com",
//     "Taxation": "patent",
//     "FfdVersion":"1.2",
//     "Items": [
//       {
//         "Name": form.description.value || "Оплата",
//         "Price": form.amount.value + '00',
//         "Quantity": 1.00,
//         "Amount": form.amount.value + '00',
//         "PaymentMethod": "full_prepayment",
//         "PaymentObject": "service",
//         "Tax": "none",
//         "MeasurementUnit": "ед."
//       }
//     ]
//   });
// });

const payOrder = async () => {
  await useFetch('/api/order/pay', {
    onRequest({request, options}) {
      options.method = 'POST'
      options.headers = options.headers || {}
      options.headers.authorization = !!token.value ? 'Bearer ' + token.value : ''
    },
    onRequestError({request, options, error}) {
      // Handle the request errors
    },
    async onResponse({request, response, options}) {
      // Process the response data
      if (response._data.statusCode === 500) {
        console.log(response._data)
      }
      console.log(response._data)
      await navigateTo(response._data.PaymentURL, {
        external: true
      })
    },
    onResponseError({request, response, options}) {
      console.error(response._data)
      // Handle the response errors
    },
    body: {
      "TerminalKey": "1695022074642DEMO",
      "OrderId": "1211132311211111", // идентификатр заказа в системе  - у нас к каждому заказу будет формироваться транзакция - транзакция и будет orderId
      "PaymentId": "5353155",
      "Amount": "851500",
      "Receipt": {
        "Email": "123321@shmail.ru",
        "Taxation": "osn",
        "Items": [{
          "Name": "Футболка-поло с золотистым воротничком",
          "Price": "851500",
          "Quantity": "1",
          "Amount": "851500",
          "Tax": "vat18"
        }]
      }
    }
  })
}

</script>

<template>
  <UButton @click="payOrder" class="mt-10">Перейти к оплате</UButton>
</template>

<style scoped lang="scss">

</style>