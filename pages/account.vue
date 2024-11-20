<script lang="ts" setup>


</script>

<template>
  <div class="container flex-row gap-8" style="margin-top: 24px">
      <div class="flex-col gap-4" style="min-width: 320px; background-color: var(--mine-50); border-radius: 10px; padding: 24px">
        <NuxtLink to="/account">Личный кабинет</NuxtLink>
        <NuxtLink to="/account/club">Скидки и бонусы</NuxtLink>
        <NuxtLink to="/account/profile">Персональные данные</NuxtLink>
        <NuxtLink to="/account/orders">Заказы</NuxtLink>
        <NuxtLink to="/account/wishlist">Избранное</NuxtLink>
        <NuxtLink to="/account/subscribe">Подписки</NuxtLink>
        <NuxtLink to="/faq" >Вопрос-ответ</NuxtLink>
        <Button type="button">Выйти</Button>
      </div>
      <NuxtPage />
  </div>
</template>

<style scoped lang="scss">

</style>