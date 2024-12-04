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
    label: 'Клубы',
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
  <section class="flex flex-row" style="min-height: 100vh;">
    <nav class="flex-col gap-8" style="position:sticky; top: 0; padding: 20px; background-color: var(--mine-400); min-width: 320px; height: 100vh; overflow-y: scroll">
      <img src="/icon/logo2.svg" width="200px" alt="">
      <ul class="flex-col gap-4">
        <li>
          <NuxtLink to="/admin" class="menu-button">Панель управления</NuxtLink>
        </li>
        <li>
          <span>Каталог</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in catalogLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Продажи</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in salesLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Склад</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in warehouseLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Покупатели</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in customersLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Маркетинг</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in marketingLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Система</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in systemLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <span>Отчеты</span>
          <ul class="flex-col gap-1" style="margin-top: 8px">
            <li v-for="link in reportLinks" :key="link.label">
              <NuxtLink :to="link.to" class="menu-button">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="flex-col" style="width: 100%">
      <nav class="flex-row gap-2" style="z-index:1; background-color: var(--mine-300); padding: 20px; position: sticky; top: 0;">
        <NuxtLink to="/">На главную</NuxtLink>
      </nav>
      <ClientOnly>
        <NuxtPage/>
      </ClientOnly>
    </div>

  </section>


</template>

<style scoped lang="scss">
.menu-button {
  color: var(--mine-50);
  font-size: 18px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  background-color: var(--mine-700);
  flex: 1 1;
}
</style>