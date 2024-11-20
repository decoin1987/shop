<script setup>
defineProps({
  product: Object,
  bg: Object,
})
</script>

<template>
  <article style="" class="card flex-col">
    <template v-if="!!product">
      <div style="position: relative">
        <div style="position: absolute; top: 12px; left: 12px; display: flex; flex-wrap: wrap; gap: 4px;">
          <div style="
              display: flex;
              align-items: center;
              padding: 4px 8px;
              background-color: white;
              border-radius: 999px;
              color: #1284b5;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.07rem;
            " v-if="parseInt(product.price - product.price * (product.sale + product.club) / 100) % 2 >= 1"
          >
            НОВИНКА
          </div>
          <div style="
              display: flex;
              align-items: center;
              padding: 4px 12px;
              background-color: white;
              opacity: 0.75;
              border-radius: 999px;
              color: var(--thunderbird-500);;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.07rem;
            " v-if="parseInt(product.price - product.price * (product.sale + product.club) / 100) > 4000">
            БЕСПЛАТНАЯ ДОСТАВКА
          </div>
        </div>
        <NuxtLink :to="'/product/'+product?.id">
          <img style="object-fit: cover; aspect-ratio: 3/4; width: 100%"
               :src="product?.url" alt="">
        </NuxtLink>
      </div>

      <header style="flex: 1 1 100%; align-items: stretch; justify-content: space-between; padding-left: 8px" class="flex-col gap-2">
        <NuxtLink>
          <h1 style="font-size: 20px; font-weight: 600">{{ product.title }}</h1>
        </NuxtLink>
        <div class="flex-row gap-3" style="bottom: 12px; left: 12px; align-items: center;" @click="$emit('showSaleDescription')">
          <p style="font-size: 12px" v-if="!!product?.sale">
            Скидка -{{ product.sale }}&nbsp;%
          </p>
          <p style="font-size: 12px" v-if="!!product?.sale && !!product?.club">
            |
          </p>
          <p style="font-size: 12px" v-if="!!product?.club">
            Клуб -{{ product.club }}&nbsp;%
          </p>
        </div>
          <div class="flex-row gap-2" style="margin-bottom: auto; align-items: baseline">

              <p style="font-size: 14px; text-decoration: line-through" v-if="!!product.sale || !!product.club">
                {{ numberToRub(product.price) }}
              </p>
              <p style="font-size: 22px; color: var(--thunderbird-600); font-weight: 500">
                {{ numberToRub(Math.round(product.price - product.price * (product.sale + product.club) / 100)) }}
              </p>


          </div>
        <div class="flex-row" style="justify-content: space-between; align-items: center">
          <Button color="#000" style="align-self: flex-end; border-radius: 21px 0 21px 0; margin-left: auto">
            Заказать
          </Button>
        </div>
      </header>
    </template>
  </article>
</template>

<style scoped lang="scss">
.card {
  border-radius: 0 0 25px 0;
  position: relative;
  border: 1px solid var(--mine-100);
  padding: 4px
}

.card:hover {

  border: 1px solid var(--mine-300);
  transition: border ease-in-out 0.3s;
}
</style>