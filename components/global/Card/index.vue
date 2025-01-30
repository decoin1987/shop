<script setup>
import CardButton from "../CardButton.vue";
import {useCartStore} from "~/stores/cart.store";


const props = defineProps({
  product: Object,
  bg: Object,
})
const card_ui = {
  base: 'hover:shadow-lg flex flex-col',
  background: 'bg-gray-50 dark:bg-gray-900',
  divide: '',
  // divide: 'divide-y divide-gray-200 dark:divide-gray-800',
  ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
  rounded: 'rounded-md rounded-br-3xl rounded-tl-3xl',
  shadow: 'shadow',
  body: {
    base: '',
    background: '',
    padding: 'px-3 py-0'
  },
  header: {
    base: '',
    background: '',
    padding: 'px-1 py-1'
  },
  footer: {
    base: 'flex justify-end items-end grow',
    background: '',
    padding: 'px-1 py-1'
  }
}
const cardStore = useCartStore()
const image = computed(() => {
  return !!props.product.product_images ? props.product?.product_images[0]?.url : false
})
const cart = useLocalStorage('cart', [])
const delItem = (product) => {
  cart.value = cart.value.filter(el => el.id !== product.id)
}
const orderItemDel = (product) => {
  const order_item = cart.value.find(el => el.id === product.id)
  if (order_item.count <= 1) order_item.count = 1
  else order_item.count--
}
const orderItemAdd = (product) => {
  const order_item = cart.value.find(el => el.id === product.id)
  if (order_item.count >= 10) order_item.count = 10
  else order_item.count++
}
</script>

<template>
  <UCard as="article" :ui="card_ui" tag="article">
    <template #header>
      <div class="relative">
        <div class="flex flex-wrap absolute gap-2" style="right: 10px; top: 10px;">
          <UBadge size="xs" color="primary" :ui="{ rounded: 'rounded-full'}" class="line-clamp-1" v-if="parseInt(props.product.price - props.product.price * (props.product.sale + props.product.club) / 100) % 2 >= 1">НОВИНКА</UBadge>
          <UBadge size="xs" color="malibu" :ui="{ rounded: 'rounded-full' }" v-if="parseInt(props.product.price - props.product.price * (props.product.sale + props.product.club) / 100) > 4000">БЕСПЛАТНАЯ ДОСТАВКА</UBadge>
        </div>
        <NuxtImg  class="rounded-sm rounded-tl-card w-full" style="aspect-ratio: 3/4; object-fit: cover" :src="`${props.product.product_images?.length ? '/img/product/' + props.product.product_images[0].url : '/img/common/nophoto.png'}`" alt="" />

      </div>
    </template>
    <NuxtLink :to="'/product/'+product?.id">
      <h1 class="text-xl lg:text-2xl" style="font-weight: 600">{{ props.product.title }}</h1>
    </NuxtLink>
    <div class="flex gap-3" style="align-items: center;"
         @click="$emit('showSaleDescription')">
      <p class="text-xs" v-if="!!product?.sale">
        Скидка -{{ props.product.sale }}&nbsp;%
      </p>
      <p class="text-xs" v-if="!!product?.sale && !!product?.club">
        |
      </p>
      <p class="text-xs" v-if="!!product?.club">
        Клуб -{{ props.product.club }}&nbsp;%
      </p>
    </div>
    <div class="flex gap-3 mb-2" style="align-items: baseline">

      <p class="text-md" style="text-decoration: line-through">
        {{ numberToRub(props.product.price) }}
      </p>
<!--      <p class="text-2xl text-red-600" style="font-weight: 500">-->
<!--        {{ numberToRub(Math.round(props.product.price - props.product.price * (props.product.sale + props.props.product.club) / 100)) }}-->
<!--      </p>-->


    </div>

    <template #footer>
      <ClientOnly>
        <template v-if="!cart.find(el => el.id === product?.id)">
          <CardButton class="w-full" @click="$emit('addToCart', product)">В корзину</CardButton>
<!--          <UButton @click="cartStore.addToCart(product)" :ui="{ rounded: 'rounded-full' }" color="black">Добавить в корзину</UButton>-->
        </template>
        <template  v-if="cart.find(el => el.id === product?.id)">
          <div class="flex w-full mr-3 items-center gap-2  h-12 rounded-md rounded-br-card rounded-tl-card bg-gray-200">
            <UButton class="h-12 rounded-md rounded-br-card rounded-tl-card" @click="orderItemDel(product)" :ui="{ rounded: 'rounded-full' }" icon="i-solar-minus-circle-linear" variant="ghost" color="primary" />
            <p style="line-height: 100%;" class="text-xl bg-white h-10 mx-auto w-20 text-center justify-center px-3 flex items-center rounded-full text-center">
              {{ cart.find(el => el.id === product?.id).count }}
            </p>
            <UButton class="h-12 rounded-md rounded-br-card rounded-tl-card" @click="orderItemAdd(product)" :ui="{ rounded: 'rounded-full' }" icon="i-solar-add-circle-linear" variant="ghost" color="primary" />
          </div>
            <UButton class="rounded-md rounded-br-card rounded-tl-card h-12 px-4 ml-auto text-white bg-red-600 hover:bg-gray-900" @click="delItem(product)" :ui="{ rounded: 'rounded-full' }" icon="i-solar-trash-bin-trash-line-duotone" variant="ghost" color="white" />
            <!--          <IconButton>-->
            <!--            <IconMinus color="#000" />-->
            <!--          </IconButton>-->
            <!--          <Input style="width: 80px" />-->
            <!--          <IconButton>-->
            <!--            <IconPlus color="#000" />-->
            <!--          </IconButton>-->
            <!--          <IconButton @click="show = true" size="md" style="padding: 3px">-->
            <!--            <IconTrash color="#00000050" />-->
            <!--          </IconButton>-->


        </template>
      </ClientOnly>

    </template>
  </UCard>
</template>

<style scoped lang="scss">

.card {
  border-radius: 0 0 25px 0;
  position: relative;
  border: 1px solid var(--mine-100);
  padding: 4px
}

.card:hover {
  border: 1px solid var(--mine-300);
  transition: border ease-in-out 0.3s;
}
</style>