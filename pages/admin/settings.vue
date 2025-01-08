<script  lang="ts" setup>


const route = useRoute()
const router = useRouter()


const nav = [
  {
    label: 'Общие настройки',
    icon: 'i-heroicons-home',
    to: '/admin/settings',
    exact: true
  },
  {
    label: 'Налоги',
    icon: 'i-heroicons-home',
    to: '/admin/settings/taxes',
    exact: true
  },
  {
    label: 'Контакты',
    icon: 'i-heroicons-home',
    to: '/admin/settings/contacts',
    exact: true
  },
  {
    label: 'Единицы измерения',
    icon: 'i-heroicons-home',
    to: '/admin/settings/units',
    exact: true
  },
]
</script>

<template>
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Настройки магазина</h1>
    <UHorizontalNavigation exact="true" size="" :links="nav" class="w-full border-b border-gray-500 dark:border-gray-800"/>
    <NuxtPage />
<!--    <h2 class="text-xl my-6 font-sans">Общие</h2>-->
<!--    <p>Заголовок</p>-->
<!--    <p>Мета-тег Description:</p>-->
<!--    <p>Мета-тег Keywords:</p>-->
<!--    <p>Название магазина:</p>-->
<!--    <p>Владелец магазина:</p>-->
<!--    <p>Адрес магазина:</p>-->
<!--    <p>Время работы</p>-->
<!--    <p>Комментарий</p>-->
<!--    <p>Местоположение</p>-->
<!--    <p>E-Mail</p>-->
<!--    <p>Телефон</p>-->
<!--    <p>Страна</p>-->
<!--    <p>Регион / область:</p>-->
<!--    <p>Язык:</p>-->
<!--    <p>Язык администратора:</p>-->
<!--    <p>Валюта</p>-->
<!--    <p>Единица измерения</p>-->
<!--    <p>Вес:</p>-->
<!--    <p>Префикс счета-фактуры</p>-->
<!--    <p>Логотип</p>-->
<!--    <p>Иконка</p>-->
<!--    <h2 class="text-xl my-6 font-sans">Налоги</h2>-->
<!--    <p>Название</p>-->
<!--    <p>Описание</p>-->
<!--    <p>Значение</p>-->
<!--    <p>Переменная для интеграции</p>-->
<!--    <h2 class="text-xl my-6 font-sans">Единицы измерения</h2>-->
<!--    <h2 class="text-xl my-6 font-sans">Контакты</h2>-->
<!--    <h2 class="text-xl my-6 font-sans">Единицы измерения</h2>-->
<!--    <h2 class="text-xl my-6 font-sans">Единицы измерения</h2>-->
  </section>
</template>

<style scoped lang="scss">

</style>