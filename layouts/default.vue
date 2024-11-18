<script lang="ts" setup>
import {ref} from "@vue/reactivity"

const links = ref([
  {link: 'showcase', name: 'Витрина'},
  {link: 'bouquets', name: 'Букеты'},
  {link: 'flowers', name: 'Цветы'},
  {link: 'presents', name: 'Подарки'},
  {link: 'souvenirs', name: 'Сувениры'},
])

</script>

<template>
  <header>
    <div class="container flex-row items-center gap-10 justify-b">
      <NuxtLink to="/">
        <img style="height: 65px; width: auto; margin-top: 8px" alt="букет72.рф логотип" src="/icon/logo1.svg"/>
      </NuxtLink>
      <div class="flex-row gap-4">
        <Button rounded size="md" color="#f43f48">
          Войти
        </Button>
      </div>
    </div>
  </header>
  <nav>
    <div class="container flex-row gap-5">
      <ul class="flex-row gap-2">
        <li v-for="link in links">
          <MainLink hovered to="/">{{ link.name }}</MainLink>
        </li>
      </ul>

    </div>
  </nav>
  <slot/>
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