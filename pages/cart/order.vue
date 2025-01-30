<script  lang="ts" setup>
//@ts-nocheck
import {ref, computed} from "vue";
import {v4 as uuid} from 'uuid'
import numberToRub from "../../utils/numberToRub.js";

const bouquetName =
    [
      "Романтический подарок",
      "Символ любви",
      "Признание в чувствах",
      "Романтическая композиция",
      "Сердце из цветов",
      "Романтический сюрприз",
      "Признание в любви",
      "Романтический жест",
      "Романтическая атмосфера",
      "Романтическое настроение"
    ]
const products = ref(
    [
      {
        "id": "46f4362c-5986-4aea-94e3-195834a13568",
        "title": "Fantastic Fresh Gloves",
        "price": 3378,
        "sale": 12,
        "club": 11,
        "url": "https://roots-store.ru/upload/images/products/o/e26ef0dad65fde2b512300bd3b92f697_webp.webp",
      },
    ]
)

const showSaleDescription = () => {
  console.log('salemodaldescription')
}

const bouquetNameMap = () => {
  products.value.map((el, index) => {
    el.title = bouquetName[index]
    el.count = 1
  })
}

bouquetNameMap()

const deliveryDTO = {
  title: 'Укажите адрес доставки',
  alt_title: 'Бесплатно'
}
const removeProduct = (product) => {
  products.value = products.value.filter(el => el.id !== product.id );
}
const noDeliveryCash = ref(8000)
const totalAmount = computed(() => {
  let sumWithInitial = products.value.reduce(
      (accumulator, el) => accumulator + (el.price * el.count),
      0,
  );
  return sumWithInitial
})
const deliveryAmount = computed(() => {
  return totalAmount.value < noDeliveryCash.value
      ? !!selectedAddrs.value.deliveryZonePrice
          ? numberToRub(selectedAddrs.value.deliveryZonePrice)
          : deliveryDTO.title
      : deliveryDTO.alt_title
})
const temp = ref(10)
const addresses = ref([
  { "title": "2-й микрорайон, Тюмень",
    "coordinates": [ 65.588631, 57.115134 ],
    "entrance": null,
    "floor": null,
    "flat": null,
    "deliveryZonePrice": 250,
    "village": true },
  { "title": "Береговая улица, 222, садоводческое товарищество Калинка, Тюменский район",
    "coordinates": [ 65.729774, 57.146315 ],
    "entrance": null, "floor": null, "flat": null, "deliveryZonePrice": 450, "village": true },
  { "title": "товарищество собственников недвижимости Серебряный Бор, 1096, Тюменский район",
    "coordinates": [ 65.877817, 57.12047 ], "entrance": "12", "floor": "21", "flat": "32", "deliveryZonePrice": 1000, "village": false }
])
const selectedAddrs = ref([])
const color = computed(() => {
  console.log()
  if (deliveryNoCash.value <= deliveryNoCash.value * 0.2) return 'primary'
  if (deliveryNoCash.value > noDeliveryCash.value * 0.2 && deliveryNoCash.value <= noDeliveryCash.value * 0.4) return 'orange'
  if (deliveryNoCash.value > noDeliveryCash.value * 0.4 && deliveryNoCash.value <= noDeliveryCash.value * 0.7) return 'amber'
  if (deliveryNoCash.value > noDeliveryCash.value * 0.7) return 'lime'
})
const isOpen = ref(false)
const addAddress = (address: {}) => {
  console.log(address)
  isOpen.value = false
  addresses.value = [
    ...addresses.value,
    address
  ]

}
const delAddress = (address: {}) => {
  console.log(address)
  selectedAddrs.value = []
  addresses.value = addresses.value.filter((el: {}) => el != address)
}



const modalConfig = {
  wrapper: 'relative z-50',
  inner: 'fixed inset-0 overflow-y-auto',
  container: 'flex min-h-full items-end sm:items-center justify-center text-center',
  padding: 'p-0',
  margin: 'sm:my-0',
  base: 'relative text-left rtl:text-right flex flex-col',
  overlay: {
    base: 'fixed inset-0 transition-opacity',
    background: 'bg-zinc-900/75 dark:bg-zinc-800/75',
    transition: {
      enter: 'ease-out duration-300',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'ease-in duration-200',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
  },
  background: 'bg-zinc-50 dark:bg-gray-900',
  ring: '',
  rounded: 'rounded-2xl',
  shadow: 'shadow-xl',
  width: 'w-full md:max-w-4xl',
  height: '',
  fullscreen: 'w-screen h-screen',
  transition: {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  },
}

</script>

<template>
  <UContainer>
    <div class="grid grid-cols-7 gap-10 mt-10">
      <section class="col-span-5 flex flex-col gap-5">
        <h1 class="font-serif text-zinc-950 text-4xl">Оформление заказа</h1>
        <div class="flex flex-col gap-6">
          <template v-if="products.length">
            <div v-for="(product, index) in products" class="">
              <div class="flex gap-3">
                <NuxtImg class="w-[120px]" style="aspect-ratio: 3/3; object-fit: cover" :src="product.url" alt="" />
                <div class="flex flex-1 justify-between flex-col gap-3">
                  <h1 class="font-serif text-zinc-950 text-2xl font-semibold">{{ product.title }}</h1>
                  <div class="flex items-center gap-1">
                    <UButton @click="product.count--">-</UButton>
                    <UInput disabled  style="text-align: center" size="lg" class="w-[70px] rounded-full" v-model="product.count"></UInput>
                    <UButton @click="product.count++">+</UButton>
                    <UButton class="p-2" icon="i-material-symbols-light-delete-outline" @click="removeProduct(product)" />
                  </div>
                </div>
                <div class="flex items-end">
                  <p class="font-light text-xl">{{ numberToRub(product.price * product.count) }}</p>
                </div>
              </div>
              <UDivider
                  label="Дополнительно к букету" type="dotted" class="my-3"
              />
            </div>
          </template>
          <template v-else>
            <div class="bg-zinc-100 p-10 items-center justify-center flex flex-col gap-4">
              <p>Товаров нет</p>
              <UButton>Перейти к покупкам</UButton>
            </div>

          </template>
          <h1 class="font-serif text-zinc-950 text-2xl">Адрес доставки</h1>
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


<!--            <URadioGroup :options="adresses"  v-model="selectedAddrs" />-->
<!--            <div v-for="(adrs, index) in adresses" class="bg-zinc-200">-->
<!--              <UCheckbox @change="selectedAddrs = adrs" :modelValue="adrs" name="notifications" label="Notifications" />-->
<!--              {{adrs}}-->
<!--            </div>-->
          </div>
          {{selectedAddrs}}
        </div>
        <div class="flex flex-col gap-6">
          <client-only>
            <div class="flex">
              <UButton label="Добавить адрес" @click="isOpen = true" />
            </div>
            <UModal v-model="isOpen">
              <Map @addAddress="addAddress" />
            </UModal>
          </client-only>
        </div>
<!--        <UAccordion
            :items="[
                {label: 'Ваш заказ', slot: 'order', icon: 'i-material-symbols-light-shopping-bag-outline-sharp'},
                {label: 'Основная информация', slot: 'info',  icon: 'i-material-symbols-light-shopping-bag-outline-sharp'},
                {label: 'Адрес', slot: 'address',  icon: 'i-material-symbols-light-shopping-bag-outline-sharp', defaultOpen: true,},
                ]"
            variant="soft"
            :ui="{ wrapper: 'flex flex-col w-full' }"
        >
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
              <template #leading>
                <div class="w-8 h-8 rounded-full bg-zinc-50 dark:bg-primary-400 flex items-center justify-center">
                  <UIcon :name="item.icon" class="w-4 h-4 text-zinc-600 dark:text-gray-900" />
                </div>
              </template>

              <span class="truncate">{{ item.label }}</span>

              <template #trailing>
                <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                    :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>
          <template #order>
          </template>
          <template #info>
          </template>
          <template #address>
          </template>
        </UAccordion>-->
      </section>
      <section class="ring-1 ring-inset ring-zinc-100 self-start col-span-2 p-5 bg-zinc-50">
        <h1 class="font-serif text-zinc-950 text-4xl mb-4">Оплата</h1>
        <ol>
          <li v-for="product in products" class="mb-2 flex items-baseline gap-2">
            <p class="text-sm">{{ product.title }}</p>
            <UDivider class="flex flex-1 mb-3"
                      type="dotted"
            />
            <p class="text-md">{{product.count}} <span>&times;</span> {{numberToRub(product.price * product.count) }}</p>
          </li>
        </ol>
        <p class="mt-1 text-right font-serif font-medium text-4xl">{{
            numberToRub(totalAmount)
          }}</p>
        <UDivider
            label="Доставка" class="my-3"
        />
        <div class="flex items-baseline gap-2 text-md">
          <p class="text-sm">Доставка</p>
          <UDivider class="flex flex-1 mb-3" />
          <span>{{ deliveryAmount }}</span>
        </div>

        <div class="flex">
          <TinkoffPayformApiNoDDS />
        </div>
      </section>
    </div>
  </UContainer>
</template>

<style scoped lang="scss">

</style>