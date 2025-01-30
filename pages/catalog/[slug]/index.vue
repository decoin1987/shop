<script lang="ts" setup>
import {useProductStore} from "~/stores/product.store";
import {useCartStore} from "~/stores/cart.store";
import {useRoute, useRouter} from "nuxt/app";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
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
const products = await $fetch(`/api/catalog/category/${route.params.slug}/products?page=1`)
const category = await $fetch(`/api/catalog/category/${route.params.slug}`)
const page = ref(1)
</script>

<template>
  <UContainer id="links" as="section" class="w-full mb-14">
    <UBreadcrumb class="mb-6" :links="links"/>
    <h1 class="p-0 m-0 text-5xl mb-6">{{ category.title }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <Card
          v-for="product in products?.rows"
          :key="product.id"
          @showSaleDescription="showSaleDescription"
          :product="product"
          @addToCart="cartStore.addToCart"
      />
    </div>
    <div class="flex w-full justify-center mt-10">
      <UPagination
          v-if="products?.count > 1"
          size="xl"
          v-model="page"
          :page-count="1"
          :total="products?.count"
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