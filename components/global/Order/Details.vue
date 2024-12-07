<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
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
const props = defineProps({
  subSales: Array
})
</script>

<template>
  <div class="flex flex-row gap-4">
    <label for="diffAddr" class="gap-2 bg-gray-900 text-white px-4 flex items-center rounded-full h-9">
      <input v-model="different_address" id="diffAddr" type="checkbox">
      Доставить на разные адреса
    </label>
    <UButton :ui="{rounded:'rounded-full'}" v-if="!different_address" color="black"
             icon="i-solar-sort-by-time-outline" size="md">К определенному времени
    </UButton>
  </div>
  <UDivider class="mt-2 mb-2"/>
  <div class="flex-col gap-1">
    <template v-for="i in 5">
      <div class="product-card rounded-lg rounded-tl-3xl rounded-br-2xl p-2 bg-gray-50">
        <div v-if="different_address" class="flex flex-row gap-4 mb-2">
          <UButton :ui="{rounded:'rounded-full'}" size="xs">Выбрать адрес</UButton>
          <UButton :ui="{rounded:'rounded-full'}" size="xs">К определенному времени</UButton>
        </div>
        <div class="flex flex-row gap-4">
          <img class="rounded-lg rounded-tl-2xl rounded-br-2xl" style="object-fit: cover; aspect-ratio: 1/1"
               src="https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
               width="100" height="100" alt="">
          <div class="flex flex-col gap-3 p-1">
            <p class="font-medium text-lg">Романтический подарок</p>
            <div class="flex flex-row items-center gap-2 mt-auto">
              <UButton @click="count--" :ui="{ rounded: 'rounded-full' }" icon="i-solar-minus-circle-linear"
                       variant="ghost" color="primary"/>
              <p class="flex items-center justify-center w-14 h-9 ring-1 ring-gray-400 rounded-full text-center">
                {{ count }}</p>
              <UButton @click="count++" :ui="{ rounded: 'rounded-full' }" icon="i-solar-add-circle-linear"
                       variant="ghost" color="primary"/>
              <UButton @click="" :ui="{ rounded: 'rounded-full' }" icon="i-solar-trash-bin-trash-line-duotone"
                       variant="ghost" color="black"/>
            </div>
          </div>
          <div class="flex-col gap-1 ml-auto mt-auto items-end">
            <p class="text-md text-right line-through">
              {{
                numberToRub(12256)
              }}
            </p>
            <p class="text-3xl font-medium">
              {{ numberToRub(10256) }}
            </p>
          </div>
        </div>
        <div v-if="props.subSales.length" class="pt-1">
          <p class="text-sm mb-2" style="margin-top: 3px">
            Дополнительно к букету
          </p>
          <div class="flex flex-row gap-4">
              <article v-for="(link, i) in props.subSales" :key="i"
                       class="panel bg-white rounded-md rounded-tl-xl rounded-br-xl">
                <div class="flex-col p-0.5">
                  <img class="rounded-md" :src="link" alt="">
                  <p class="text-xs p-2">Ваза для ваших цветов № {{ i + 1 }}</p>
                  <UButton :ui="{rounded: 'rounded-md rounded-tl-xl rounded-br-xl'}" size="xs" color="white" variant="solid" block>
                    убрать
                  </UButton>
                </div>
              </article>
          </div>
        </div>
      </div>
      <UDivider class="mt-2 mb-2"/>
    </template>
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
  width: 120px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-right: 11px;
}
</style>