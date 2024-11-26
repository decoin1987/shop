<script  lang="ts" setup>
import {useHead} from "@unhead/vue";
import {computed, onMounted, ref} from "vue";
// import {useCartStore} from "~/store/cart.store";

useHead({
  title: 'Корзина',
  // meta: [
  //   { name: 'description', content: 'My amazing site.' }
  // ],
  // bodyAttrs: {
  //   class: ''
  // },
  script: [
    {
      src: 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'head'
    }
  ]
})

// const cartStore = useCartStore()
// const orderItems = computed(() => cartStore.theCart)


// const orderAmount = computed(() => {
//   const count = Object.keys(cartStore.theCart).reduce(function (previous, key) {
//     return previous + cartStore.theCart[key].count * cartStore.theCart[key].price;
//   }, 0)
//   return count
// })
const orderAmount = {
  value: '7808'
}
const formTinkoff = ref(null);
onMounted(async () => {
  const form = formTinkoff.value;
  form.amount.value = orderAmount.value
  form.receipt.value = JSON.stringify({
    "EmailCompany": "mail@mail.com",
    "Taxation": "patent",
    "FfdVersion":"1.2",
    "Items": [
      {
        "Name": form.description.value || "Оплата",
        "Price": form.amount.value + '00',
        "Quantity": 1.00,
        "Amount": form.amount.value + '00',
        "PaymentMethod": "full_prepayment",
        "PaymentObject": "service",
        "Tax": "none",
        "MeasurementUnit": "ед."
      }
    ]
  });
});

</script>

<template>
  <div>
    <form class="payform-tinkoff" name="payform-tinkoff" ref="formTinkoff" onsubmit="pay(this); return false;" id="payform-tinkoff">
      <input class="payform-tinkoff-row" type="hidden" name="terminalkey" value="1695022074642DEMO">
      <input class="payform-tinkoff-row" type="hidden" name="frame" value="false">
      <input class="payform-tinkoff-row" type="hidden" name="language" value="ru">
      <input class="payform-tinkoff-row" type="hidden" name="receipt" value="">
      <input class="payform-tinkoff-row" type="hidden" name="DATA" value="order=1234">
      <input class="payform-tinkoff-row" type="hidden" name="details">
      <input class="payform-tinkoff-row" type="text" placeholder="Сумма заказа" name="amount" value="" required>
      <input class="payform-tinkoff-row" type="hidden" placeholder="Номер заказа" name="order">
      <input class="payform-tinkoff-row" type="text" placeholder="Описание заказа" name="description">
      <input class="payform-tinkoff-row" type="text" placeholder="ФИО плательщика" name="name">
      <input class="payform-tinkoff-row" type="email" placeholder="E-mail" name="email" required>
      <input class="payform-tinkoff-row" type="tel" placeholder="Контактный телефон" name="phone">
      <input class="payform-tinkoff-row payform-tinkoff-btn" type="submit" value="Оплатить">
    </form>
  </div>
</template>

<style scoped lang="scss">

</style>