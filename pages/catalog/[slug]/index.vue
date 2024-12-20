<script lang="ts" setup>
import {useProductStore} from "../stores/product.store";
import {useCartStore} from "../stores/cart.store";
import products from "~/pages/admin/sale/products/products.vue";
const showSaleDescription = () => {
  console.log('salemodaldescription')
}
const links = [
    {
  label: 'Главная страница',
  icon: 'i-solar-home-linear',
  to: '/'
},
  {
    label: 'Витрина',
    // icon: 'i-heroicons-link'
  }
]
const cartStore = useCartStore()
const productStore = useProductStore()
const page = ref(1)
</script>

<template>
  <UContainer id="links" as="section" class="w-full mb-14">
    <UBreadcrumb class="mb-6" :links="links"/>
    <h1 class="p-0 m-0 text-5xl mb-6">Витрина</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <Card
          v-for="product in productStore.products.rows"
          :key="product.id"
          @showSaleDescription="showSaleDescription"
          :product="product"
          @addToCart="cartStore.addToCart"
      />
    </div>
    <div class="flex w-full justify-center mt-10">
      <UPagination
          size="xl"
          v-model="page"
          :page-count="2"
          :total="productStore.products.count"
          :ui="{rounded: 'first:rounded-s-full last:rounded-e-full'}"
          :to="(page: Number) => ({ query: { page } })"
          :prev-button="{ icon: 'i-solar-alt-arrow-left-bold-duotone', label:'назад', color: 'gray' }"
          :next-button="{ icon: 'i-solar-alt-arrow-right-bold-duotone', label:'вперед', trailing: true,color: 'gray' }"
      />

    </div>
  </UContainer>
</template>

<style scoped lang="scss">
</style>