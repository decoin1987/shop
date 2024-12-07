<script lang="ts" setup>
import {ref} from "@vue/reactivity";

import {computed} from "vue";

const orderDTO = [
  {
    address: {
      street: '',
      floor: '',
      flat: '',
      entrance: '',
      intercom: '',
    },
    time: '',
    recipient: {
      initials: ''
    },
    payer_id: '',
    order: {
      product_id: '',
      quantity: '',
    },
    payment_method: ''
  }
]
const different_address = ref(false)
const prezents = [
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpcgUNUF-659eed4ee1d9d.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpg8eC2M-6737a561c86d0.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpYn2ihs-6737a546f41e7.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpJ0Gatj-646d253fc8808.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpB6iXfU-646d24c7d4659.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpDbXyef-646d24ebd80a1.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpBnguGv-64e8a7f7d1413.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phprvCOjs-646d2581165b5.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpsGvZTB-646d25a9499ea.webp',
  // 'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpG2BRDY-646d270811add.webp',
]


const count = ref(1)
const isOpen = ref(false)
const addresses = ref({}
//     [
//   { "title": "2-й микрорайон, Тюмень",
//     "coordinates": [ 65.588631, 57.115134 ],
//     "entrance": null,
//     "floor": null,
//     "flat": null,
//     "deliveryZonePrice": 250,
//     "village": true },
//   { "title": "Береговая улица, 222, садоводческое товарищество Калинка, Тюменский район",
//     "coordinates": [ 65.729774, 57.146315 ],
//     "entrance": null, "floor": null, "flat": null, "deliveryZonePrice": 450, "village": true },
//   { "title": "товарищество собственников недвижимости Серебряный Бор, 1096, Тюменский район",
//     "coordinates": [ 65.877817, 57.12047 ], "entrance": "12", "floor": "21", "flat": "32", "deliveryZonePrice": 1000, "village": false }
// ]
)
const selectedAddrs = ref([])
const addAddress = (address: {}) => {
  console.log(address)
  isOpen.value = false
  // addresses.value = [
  //   ...addresses.value,
  //   address
  // ]
  addresses.value =
    // ...addresses.value,
    address


}
const delAddress = (address: {}) => {
  console.log(address)
  selectedAddrs.value = []
  addresses.value = addresses.value.filter((el: {}) => el != address)
}
</script>

<template>
  <UContainer class="flex w-full flex-row">
    <div class="flex flex-col w-4/6">
      <h1 class="text-3xl mb-10">Ваша корзина</h1>
      <OrderDetails :subSales="prezents" />
    </div>
    <div class="" style="width: 35%; height: calc(100vh - 250px); align-self: flex-start; position: sticky; top: 10px;">
      <div class="" style="background-color: var(--mine-50); border-radius: 10px; padding: 15px 20px">
        <h2>Ваш заказ</h2>
        <p class="order-mini-title">Адрес заказа <br> <span>{{addresses}}</span></p>
        <UButton v-if="!addresses.length" @click="isOpen=true" size="xs">Выбрать адрес</UButton>
        <p class="order-mini-title">Состав заказа:</p>
        <hr style="margin: 20px 0">
        <p class="order-mini-title">Оплата</p>
        <p>Стоимость товаров</p>
        <p>Клубная скидка</p>
        <p>Скидка</p>
        <p>Итого</p>
      </div>
    </div>
  </UContainer>
  <UModal v-model="isOpen" prevent-close fullscreen>
    <div class="w-full ">
      <UContainer class="flex bg-gray-100 p-2 w-full h-full justify-end">
        <UButton @click="isOpen=false" trailing size="xl" icon="i-solar-close-circle-linear" :ui="{rounded: 'rounded-full'}" color="black" variant="solid" label="Закрыть" />
      </UContainer>
    </div>
    <UContainer class="w-full h-full p-4">
      <div class="flex flex-col justify-center content-center gap-4">
        <div v-for="address of addresses" :key="address.title" class="flex ring-1 p-0 ring-zinc-200 items-stretch">
          <URadio :value="address.title"  v-model="selectedAddrs" :name="addAddress.title" v-bind="address">
            <template #label>
              <div :class="selectedAddrs === address ? 'bg-zinc-200' : ''" class="flex flex-1">
                <p class="px-6 py-4 cursor-pointer">{{address.title.charAt(0).toUpperCase() + address.title.slice(1)}},
                  <template v-if="!address.village">
                    <br>
                    <span>Подъезд: {{ address.entrance ? address.entrance : 'не указан' }},
                    <span> этаж: {{ address.floor ? address.floor : 'не указан' }},</span>
                    <span> квартира: {{ address.flat ? address.flat : 'не указан' }}</span>
                  </span>
                  </template>
                  <template v-else>
                    <span> частный дом</span>
                  </template>
                </p>
              </div>
            </template>
          </URadio>
          <UButton class="rounded-none p-4" icon="i-material-symbols-light-delete-outline" @click="delAddress(address)" />
        </div>
      </div>
      <Map @addAddress="addAddress"/>
    </UContainer>

  </UModal>
</template>

<style scoped lang="scss">

</style>