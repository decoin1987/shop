<script setup>
import CardButton from "../CardButton.vue";

defineProps({
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
</script>

<template>
  <UCard as="article" :ui="card_ui" tag="article">
    <template #header>
      <div class="relative">
        <div class="flex flex-wrap absolute gap-2" style="right: 10px; top: 10px;">
          <UBadge size="xs" color="primary" :ui="{ rounded: 'rounded-full'}" class="line-clamp-1" v-if="parseInt(product.price - product.price * (product.sale + product.club) / 100) % 2 >= 1">НОВИНКА</UBadge>
          <UBadge size="xs" color="malibu" :ui="{ rounded: 'rounded-full' }" v-if="parseInt(product.price - product.price * (product.sale + product.club) / 100) > 4000">БЕСПЛАТНАЯ ДОСТАВКА</UBadge>
        </div>
        <NuxtImg class="rounded-sm rounded-tl-card w-full" style="aspect-ratio: 3/4; object-fit: cover" :src="product?.url" alt=""></NuxtImg>
      </div>
    </template>
    <NuxtLink :to="'/product/'+product?.id">
      <h1 class="text-xl lg:text-2xl" style="font-weight: 600">{{ product.title }}</h1>
    </NuxtLink>
    <div class="flex gap-3" style="align-items: center;"
         @click="$emit('showSaleDescription')">
      <p class="text-xs" v-if="!!product?.sale">
        Скидка -{{ product.sale }}&nbsp;%
      </p>
      <p class="text-xs" v-if="!!product?.sale && !!product?.club">
        |
      </p>
      <p class="text-xs" v-if="!!product?.club">
        Клуб -{{ product.club }}&nbsp;%
      </p>
    </div>
    <div class="flex gap-3 mb-2" style="align-items: baseline">

      <p class="text-md" style="text-decoration: line-through" v-if="!!product.sale || !!product.club">
        {{ numberToRub(product.price) }}
      </p>
      <p class="text-2xl text-red-600" style="font-weight: 500">
        {{ numberToRub(Math.round(product.price - product.price * (product.sale + product.club) / 100)) }}
      </p>


    </div>
    <template #footer>
        <CardButton>В корзину</CardButton>
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