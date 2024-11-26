<script lang="ts" setup>
import {ref} from "@vue/reactivity";
import Flicking from "@egjs/vue3-flicking";

const different_address = ref(false)
const prezents = [
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpcgUNUF-659eed4ee1d9d.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpg8eC2M-6737a561c86d0.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpYn2ihs-6737a546f41e7.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpJ0Gatj-646d253fc8808.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpB6iXfU-646d24c7d4659.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpDbXyef-646d24ebd80a1.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpBnguGv-64e8a7f7d1413.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phprvCOjs-646d2581165b5.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpsGvZTB-646d25a9499ea.webp',
  'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpG2BRDY-646d270811add.webp',
]
const options = {
  preventClickOnDrag: true,
  moveType: 'snap',
  align: 'center',
  threshold: 80,
  iOSEdgeSwipeThreshold: 30,
  circular: false,
  adaptive: false,
  circularFallback: 'bound',
  bound: true,
  renderOnlyVisible: false,
  preventDefaultOnDrag: true,
}
</script>

<template>
  <div class="container flex-row" style="margin-top: 24px; padding-bottom: 20px;">
    <div class="flex-col gap-4" style="align-items: stretch; flex: 1 1; height: 2000px; width: 60%; padding-right: 32px">
      <h1>Ваша корзина</h1>
      <div class="flex-row gap-4" style="padding-bottom: 20px; border-bottom: 1px solid var(--mine-200);">
        <UButton v-if="!different_address" size="xs">К определенному времени</UButton>
        <label for="diffAddr" class="gap-2" style="display: flex; align-items: center">
          <input v-model="different_address" id="diffAddr" type="checkbox">
          Доставить на разные адреса
        </label>
      </div>

      <div class="flex-col gap-1" style="width: 100%; border-bottom: 1px solid var(--mine-200); padding-bottom: 20px">
        <div v-if="different_address" class="flex-row gap-4" style="margin-bottom: 10px">
          <UButton size="xs">Выбрать адрес</UButton>
          <UButton size="xs">К определенному времени</UButton>
        </div>
        <div class="flex-row gap-4" style="padding: 10px 0; flex: 1 1;">
          <img style="object-fit: cover" src="https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp" width="100px" height="100px" alt="">
          <div class="flex-col gap-3" style="padding: 5px 0">
            <p>Романтический подарок</p>
            <div class="flex-row gap-2" style="margin-top: auto;">
              <IconButton>
                <IconMinus color="#000" />
              </IconButton>
              <Input style="width: 80px" />
              <IconButton>
                <IconPlus color="#000" />
              </IconButton>
              <IconButton size="md" style="padding: 3px">
                <IconTrash color="#00000050" />
              </IconButton>
            </div>
          </div>
          <div class="flex-col gap-1" style="margin-left: auto; margin-top: auto; align-items: flex-end;">
            <p style="font-size: 16px; text-decoration: line-through">
              {{
                numberToRub(12256)
              }}
            </p>
            <p style="font-size: 28px; color: var(--thunderbird-500); font-weight: 500">
              {{ numberToRub(10256) }}
            </p>
          </div>
        </div>
        <div class="" style="padding: 5px 0">
          <p class="order-mini-title" style="margin-top: 3px">
            Дополнительно к букету
          </p>
          <div class="flex-col gap-4">
            <p>Милые приятности:</p>
            <Flicking :options="options">
              <article  v-for="(link, i) in prezents" :key="link" class="panel">
                <div class="flex-col" style="padding: 2px; flex: 1 1; position: relative">
                  <img :src="link" alt="">
                  <p style="font-size: 11px; padding: 3px 3px">Подарок № {{ i+1 }}</p>
                  <UButton style="margin-top: auto" size="xs" color="orange">Убрать</UButton>
                </div>

              </article>
            </Flicking>
          </div>
        </div>
      </div>

    </div>
    <div class="" style="width: 35%; height: calc(100vh - 250px); align-self: flex-start; position: sticky; top: 10px;">
      <div class="" style="background-color: var(--mine-50); border-radius: 10px; padding: 15px 20px">
        <h2>Ваш заказ</h2>
        <p class="order-mini-title">Адрес заказа</p>
        <UButton size="xs">Выбрать адрес</UButton>
        <p class="order-mini-title">Состав заказа:</p>
        <hr style="margin: 20px 0">
        <p class="order-mini-title">Оплата</p>
        <p>Стоимость товаров</p>
        <p>Клубная скидка</p>
        <p>Скидка</p>
        <p>Итого</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-mini-title {
  color: var(--mine-300);
  font-size: 13px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.panel {
  width: 100px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-right: 11px;
}
</style>