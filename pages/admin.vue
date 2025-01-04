<script lang="ts" setup>

definePageMeta({
  layout: false,
});
const catalogLinks = [
  {
    label: 'Категории',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/catalog/categories',
  },
  {
    label: 'Товары',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/products',
  },
  {
    label: 'Подписки',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/subscription',
  },
  {
    label: 'Фильтры',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/filters',
  },
  {
    label: 'Атрибуты',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/attributes',
  },
  {
    label: 'Теги',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/tags',
  },
  {
    label: 'Производители',
    icon: 'i-ph-flower-light',
    to: '/admin/catalog/vendors',
  },
]
const salesLinks = [
  {
    label: 'Заказы',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/sales/orders',
  },
  {
    label: 'Возвраты',
    icon: 'i-ph-flower-light',
    to: '/admin/sales/returns',
  },
]
const warehouseLinks = [
  {
    label: 'Приход',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/store/supply',
  },
  {
    label: 'Списания',
    icon: 'i-ph-flower-light',
    to: '/admin/store/refuse',
  },
]
const customersLinks = [
  {
    label: 'Покупатели',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/customers/customers',
  },
  {
    label: 'Группы',
    icon: 'i-ph-flower-light',
    to: '/admin/customers/groups',
  },
  {
    label: 'Клуб',
    icon: 'i-ph-flower-light',
    to: '/admin/customers/clubs',
  },
]
const marketingLinks = [
  {
    label: 'Баннеры',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/marketing/banners',
  },
  {
    label: 'Купонатор',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/coupons',
  },
  {
    label: 'Клубная система',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/club-system',
  },
  {
    label: 'Реферальная система',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/refferal-system',
  },
  {
    label: 'Постоянные скидки',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/offers',
  },
  {
    label: 'Периодические скидки',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/periodic-offers',
  },
  {
    label: 'Календарь праздников',
    icon: 'i-ph-flower-light',
    to: '/admin/marketing/calendar',
  },
]
const systemLinks = [
  {
    label: 'Настройки',
    icon: 'i-material-symbols-light-folder-copy-outline',
    to: '/admin/settings',
  },
]
const reportLinks = [

]
</script>

<template>
  <section class="flex flex-row">
    <nav class="aside-nav flex-col gap-8 h-svh bg-gray-500 pb-10" style="position:sticky; top: 0; min-width: 320px; overflow-y: scroll">
      <div class="pt-3 pb-1 px-5 bg-gray-500 shadow-lg" style="height: 70px; position: sticky; top: 0; border-bottom: 1px #ffffff20 solid">
        <NuxtLink to="/admin">
          <Logo height="100%" />
        </NuxtLink>
      </div>
      <ul class="flex flex-col w-full">
        <li class="border-b border-gray-700 border-solid">
          <NuxtLink to="/admin" class="flex text-gray-100 py-4 px-5">Панель управления</NuxtLink>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Каталог</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in catalogLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Продажи</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in salesLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Склад</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in warehouseLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Покупатели</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in customersLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Маркетинг</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in marketingLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Система</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in systemLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <p class="border-b border-gray-700 border-solid font-light text-xs py-1 px-5 text-gray-950">Отчеты</p>
          <ul class="flex flex-col">
            <li class="border-b border-gray-700 border-solid" v-for="link in reportLinks" :key="link.label">
              <NuxtLink :to="link.to" class="flex font-medium text-gray-100 px-6 py-3">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class=" flex flex-col w-full bg-gray-100">
      <nav class="pt-3 pb-4 px-5 bg-gray-500 shadow-lg" style="height: 70px; position: sticky; top: 0; z-index: 1">
        <NuxtLink to="/">На главную</NuxtLink>
      </nav>
      <ClientOnly>
        <NuxtPage/>
      </ClientOnly>
    </div>

  </section>


</template>

<style scoped lang="scss">
.aside-nav {
  border-right: 1px solid #00000030
}
.aside-nav::-webkit-scrollbar {
  width: 3px;
}
</style>