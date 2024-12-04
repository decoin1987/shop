<script lang="ts" setup>
import {useCategoryStore} from "@/stores/category.store";
import {useCartStore} from "~/stores/cart.store";
// const links = ref([
//   {link: 'showcase', name: 'Витрина'},
//   {link: 'bouquets', name: 'Букеты'},
//   {link: 'flowers', name: 'Цветы'},
//   {link: 'presents', name: 'Подарки'},
//   {link: 'souvenirs', name: 'Сувениры'},
// ])
const toast = useToast()
const menu = [
  {
    name: 'Информация',
    link: '/',
    items: [{
      name: 'О нас',
      link: '/',
    },{
      name: 'Информация о доставке',
      link: '/',
    },{
      name: 'Политика безопасности',
      link: '/',
    },{
      name: 'Условия соглашения',
      link: '/',
    },{
      name: 'Инструкция по уходу',
      link: '/',
    }]
  },{
    name: 'Служба поддержки',
    link: '/',
    items: [{
      name: 'Связаться с нами',
      link: '/',
    },{
      name: 'Возврат товара',
      link: '/',
    },{
      name: 'Карта сайта',
      link: '/',
    },{
      name: 'Поиск',
      link: '/',
    }]

  },{
    name: 'Личный кабинет',
    link: '/',
    items: [{
      name: 'Личный кабинет',
      link: '/',
    },{
      name: 'История заказов',
      link: '/',
    },{
      name: 'Мои закладки',
      link: '/',
    },{
      name: 'Рассылка новостей',
      link: '/',
    }]
  }
]
const categoryStore = useCategoryStore()
// const links =
const button_ui = {
  rounded: 'rounded-full',
  variant: {
    soft: 'text-red-600 dark:text-red-400 bg-red-100 hover:bg-red-200 disabled:bg-{color}-100 aria-disabled:bg-{color}-100 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 dark:aria-disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
  },
}
const count = 0
const cartStore = useCartStore()
</script>

<template>
  <header class="py-5">
    <UContainer class="w-full flex flex-wrap flex-row items-center gap-10">
      <div class="flex flex-wrap">
        <NuxtLink to="/">
          <img style="height: 65px; width: auto;" alt="букет72.рф логотип" src="/icon/logo1.svg"/>
        </NuxtLink>
        <UDivider orientation="vertical" class="my-3 mx-6" />
        <p class="self-center">Доставка свежих цветов</p>
      </div>
      <div class="flex flex-row gap-4 items-center ml-auto">
        <UButton rounded size="md"  @click="$router.push('/login')">
          Войти
        </UButton>
        <UButton rounded size="md"  @click="$router.push('/registration')">
          Регистрация
        </UButton>
        <UButton rounded size="md" type="button" @click="$router.push('/account')">
          ЛК
        </UButton>
        <UButton rounded size="md"  type="button" @click="$router.push('/admin')">
          Админка
        </UButton>
      </div>
    </UContainer>
  </header>
  <nav class="bg-gray-100 py-6 mb-10">
    <UContainer class="w-full flex flex-row flex-wrap gap-5 items-center justify-between">
      <ul class="flex flex-row flex-wrap gap-2">
        <li v-for="link in categoryStore.categories.rows?.filter(el => !el.parent_id)">
            <UButton  :ui="button_ui" :to="`/catalog/${link.slug}`" variant="soft" color="red">{{ link.title }}</UButton>
        </li>
      </ul>
      <UChip
          :show="!!cartStore.cart.length"
          size="md"
          inset
      >
        <UButton
            :ui="{rounded: 'rounded-full',}"
            to="/cart"
            icon="i-solar-bag-heart-linear"
            size="xl"
            color="black"
            variant="solid"
            class="ml-auto"
        >
          Корзина
        </UButton>
      </UChip>

    </UContainer>
  </nav>
  <slot/>
  <UNotifications color="green" />
  <footer class="bg-gray-900">
      <UContainer class="w-full flex py-14 flex-col gap-6">
          <div class="flex flex-wrap">
            <Logo width="250px" textColor="#fff" flowerColor="red" secondaryFlowerColor="green"/>
            <template v-if="0===1">
              <UButton class="text-gray-300 ml-auto hover:text-gray-500" variant="link" size="xl">
                Войти на сайт
              </UButton>
              <UButton class="text-gray-300 hover:text-gray-500" variant="link" size="xl">
                Зарегистрироваться
              </UButton>
            </template>
            <template v-else>
              <UButton class="text-gray-300 ml-auto hover:text-gray-500" variant="link" size="xl">
                Корзина
              </UButton>
              <UButton class="text-gray-300 hover:text-gray-500" variant="link" size="xl">
                Личный кабинет
              </UButton>
              <UButton class="text-gray-300 hover:text-gray-500" variant="link" size="xl">
                Выйти
              </UButton>
            </template>

          </div>
          <div class="flex gap-20 flex-wrap" >
            <ul class="flex flex-col flex-wrap" v-for="m in menu">
              <li class="mb-3 text-gray-500">{{m.name}}</li>
              <li class="flex flex-col gap" v-if="m.items">
                <ul v-for="item in m.items" class="flex flex-row">
                  <li>
                    <UButton :ui="{
                    padding: {
                      xl: 'px-0 py-2'
                    }
                  }" class="text-gray-400 hover:text-gray-500" variant="link" size="xl">
                    {{ item.name }}
                  </UButton>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
      </UContainer>
  </footer>
</template>

<style scoped lang="scss">
nav {
  //position: sticky;
  //top: 0;
  z-index: 10;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>