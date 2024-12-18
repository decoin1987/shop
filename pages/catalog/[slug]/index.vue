<script lang="ts" setup>
import {useProductStore} from "../stores/product.store";
import {useCartStore} from "../stores/cart.store";
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
const products =
    [
      {
        "id": "46f4362c-5986-4aea-94e3-195834a13568",
        "title": "Fantastic Fresh Gloves",
        "price": 3378,
        "sale": 12,
        "club": 11,
        "url": "https://roots-store.ru/upload/images/products/o/e26ef0dad65fde2b512300bd3b92f697_webp.webp"
      },
      {
        "id": "8873a091-31a7-43b2-800b-6c1d0a08315f",
        "title": "Sleek Granite Gloves",
        "price": 6458,
        "sale": '',
        "club": 3,
        "url": "https://roots-store.ru/upload/images/products/o/11fcf69613f97487d3b43a9ceab1d4c0.jpg"
      },
      {
        "id": "236960b5-85d2-4023-a666-efecd2955e6b",
        "title": "Generic Concrete Car",
        "price": 7322,
        "sale": 18,
        "club": 12,
        "url": "https://roots-store.ru/upload/images/products/o/b626aaaf3078be914e8e65326224ca19.jpg"
      },
      {
        "id": "e8e468c1-14c3-41c6-9fa6-c94b79b2b813",
        "title": "Small Cotton Chair",
        "price": 7500,
        "sale": 24,
        "club": 12,
        "url": "https://букет72.рф/image/cache/catalog/111/dblkl./lavfdswxqka-900x900.jpg"
      },
      {
        "id": "a9201d1f-6b85-4a7c-97a5-169069086806",
        "title": "Handcrafted Granite Computer",
        "price": 7117,
        "sale": 11,
        "club": 8,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "d8b3ad3d-4683-4958-be11-eb54e71ab3a8",
        "title": "Oriental Bronze Soap",
        "price": 5710,
        "sale": 23,
        "club": 11,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "1d5d7d30-e52f-46d1-a1fa-f7891cd5ed5f",
        "title": "Recycled Plastic Chips",
        "price": 2742,
        "sale": 14,
        "club": 0,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "9dfe5870-5a05-4586-8b98-8f9cb0cab20a",
        "title": "Tasty Fresh Chips",
        "price": 7235,
        "sale": 9,
        "club": 6,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "c3affa47-7740-43d1-8990-403af50dadbe",
        "title": "Sleek Granite Chicken",
        "price": 3673,
        "sale": 8,
        "club": 11,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "b7280e81-8bed-44fe-9096-ec6195499750",
        "title": "Generic Plastic Salad",
        "price": 4035,
        "sale": 20,
        "club": 3,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      }
    ]
const showSaleDescription = () => {
  console.log('salemodaldescription')
}
const bouquetNameMap = () => {
  products.map((el, index) => {
    el.title = bouquetName[index]
  })
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
bouquetNameMap()
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