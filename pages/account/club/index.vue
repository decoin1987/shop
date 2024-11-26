<script lang="ts" setup>
import {useRouter} from "nuxt/app";

const router = useRouter()

const goToBack = () => {
  router.push({ path: "/account" })
}



</script>

<template>
    <section class="flex-col gap-6" style="width: 100%">
      <div class="flex-row" style="align-items: center">
        <IconButton size="md" @click="goToBack" style="background-color: var(--mine-200); padding: 10px"><IconArrowLeft color="#000"/></IconButton>
        <h1 style="font-size: 32px">Скидки и бонусы</h1>
      </div>
      <div class="flex-col gap-3">
        <h2>Клубная карта</h2>
        <div class="club-cart">
          <img src="/icon/logo1.svg" width="150px" height="60px" alt="">
          <div class="offer_wrapper flex-col gap-2" style="color: white">
            <p>Ваша скидка: <span style="font-size: 44px">13%</span></p>
            <p>Кешбек: <span style="font-size: 44px">2%</span></p>
          </div>
          <p style="margin-top: auto; margin-bottom: -12px; color: #ffffff; font-size: 15px">
            Клубная скидка действет при заказе и оплате на сайте
          </p>
        </div>
      </div>

123
      <h2>Как увеличить сумму скидки</h2>
    </section>
</template>

<style scoped lang="scss">
.club-cart {
  display: flex;
  column-gap: 5px;
  flex-direction: column;
  color: white;
  background-color: var(--thunderbird-700);
  aspect-ratio: 80/50;
  width: 450px;
  padding: 20px;
  border-radius: 12px;
}
</style>