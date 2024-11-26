<script lang="ts" setup>
import {ref} from "@vue/reactivity"
import {useState} from "nuxt/app";
import {useCategoryStore} from "@/stores/category.store";

// const links = ref([
//   {link: 'showcase', name: 'Витрина'},
//   {link: 'bouquets', name: 'Букеты'},
//   {link: 'flowers', name: 'Цветы'},
//   {link: 'presents', name: 'Подарки'},
//   {link: 'souvenirs', name: 'Сувениры'},
// ])

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
const links = categoryStore.categories

</script>

<template>
  <header>
    <div class="container flex-row items-center gap-10 justify-b">
      <NuxtLink to="/">
        <img style="height: 65px; width: auto; margin-top: 8px" alt="букет72.рф логотип" src="/icon/logo1.svg"/>
      </NuxtLink>
      <div class="flex-row gap-4">
        <ColorModeSwitch />
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
    </div>
  </header>
  <nav>
    <div class="container flex-row gap-5" style="align-items: center">
      <ul class="flex-row gap-2">
        <li v-for="link in links.rows">
          <template v-if="!link.parent_id">
            <MainLink hovered :to="`/catalog/${link.slug}`">{{ link.title }}</MainLink>
          </template>

<!--          <MainLink hovered :to="`/catalog/${link.link}`">{{ link.name }}</MainLink>-->
        </li>
      </ul>
      <UButton rounded style="margin-left: auto" @click="$router.push('/cart')">Корзина</UButton>
    </div>
  </nav>
    <slot/>

  <footer>

      <div class="flex w-full mt-14"  style="background-color: var(--mine-800)">
        <div class="container">
          <div class="py-6 flex w-full" style="justify-content: space-between; align-items: center">
            <Logo width="250px" textColor="#fff" flowerColor="#fff" secondaryFlowerColor="#fff"/>
            <UButton>Заказать цветы</UButton>
          </div>
          <div class="py-6 flex" >
            <ul style="color: white;" v-for="menu in menu">
              <li>{{menu.name}}</li>
              <li v-if="menu.items">
                <ul v-for="item in menu.items" style="color: white;">
                  <li>{{ item.name }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

  </footer>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: var(--mine-50);
  column-gap: 10px;
}

header {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
}
</style>