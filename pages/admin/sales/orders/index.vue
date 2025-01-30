<script lang="ts" setup>

import {useFetch} from "nuxt/app";

const columns = [
  {
    key: 'title',
    label: 'Название',
  },
  {
    key: 'product_images',
    label: 'Изображение',
  },
  {
    key: 'category',
    label: 'Категория',
  },
  {
    key: 'price',
    label: 'Цена',
    sortable: true,
  },
  {
    key: 'count',
    label: 'Остаток',
    sortable: true,
  },
  {
    key: 'vendor_code',
    label: 'Артикул',
  },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]

const { data, status, refresh} = useFetch(`/api/order/`)

</script>

<template>
  <!--  {{productStore.products}}-->
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Заказы</h1>
    <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
      <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
    </div>
    <UTable class="w-full"
            :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
            :rows="[{}]" :columns="columns">
    </UTable>
  </section>

</template>

<style scoped lang="scss">

</style>