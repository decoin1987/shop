<script lang="ts" setup>

</script>

<template>
  <UContainer class="flex w-full flex-row gap-8">
    <div class="flex flex-col gap-3 min-w-[320px] pb-10 px-4">
      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/account">Личный кабинет</NuxtLink>
      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/account/club">Скидки и бонусы</NuxtLink>
      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/account/orders">Заказы</NuxtLink>
      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/account/wishlist">Избранное</NuxtLink>
      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/account/subscribe">Подписки</NuxtLink>
<!--      <NuxtLink class="bg-cool-200 rounded-full px-4 py-2" to="/faq">Вопрос-ответ</NuxtLink>-->
      <UButton color="white" class="ring-1 ring-cool-900 flex justify-center rounded-full items-center text-center" type="button">Выйти</UButton>
    </div>
    <NuxtPage/>
  </UContainer>
</template>

<style scoped lang="scss">

</style>