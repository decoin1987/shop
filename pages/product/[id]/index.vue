<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
import {ref} from "@vue/reactivity";

const show = ref(true)
const vazes = [
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/php2AAlou-646d26d2b6fb3.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpoUYhJ6-646d26eb5ebc5.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpWaULJG-6737a578cc644.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpJYolFm-646d24a7478ac.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpd0KrCr-646d25c49810d.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpvlCE0u-646d25095fbde.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpA75CBF-646d262fbe167.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpNxcJpu-646d255a846e4.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/phpdYIJQW-6737a599d37cc.webp',
    'https://www.odealarose.com/media/cache/185_185_webp/accessory/php6rrZ7f-646d260139b15.webp',
]
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
const flowers = [
    'https://букет72.рф/image/cache/catalog/111/dblkl./lavfdswxqka-900x900.jpg',
    'https://букет72.рф/image/cache/catalog/111/qz-xir7m89w-900x900.jpg',
    'https://букет72.рф/image/cache/catalog/2500bukety/2400fjz-900x900.jpg',
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

const heart = ref(true)
const count = ref(1)


</script>

<template>
  <UContainer as="section" class="w-full -mt-14 flex flex-col md:flex-row flex-wrap w-full mb-6">
    <div class="flex-col gap-4 w-full md:w-2/4">
      <ProductSlider :images="flowers" :aspect="0.75" />
    </div>

    <div class="flex-col gap-8 w-full px-0 pt-10 md:w-2/4 md:pl-10 md:pr-7 ">
      <div class="flex flex-wrap flex-row gap-3 items-center">
        <h1 class="text-4xl">Романтический подарок</h1>
        <ClientOnly>
            <UButton :ui="{ rounded: 'rounded-full' }" icon="i-solar-heart-bold" @click="heart = !heart" :color="!!heart ? 'primary' : 'black'" variant="ghost" size="xl" />
        </ClientOnly>

      </div>
      <div class="flex flex-row gap-3 mb-4" style="align-items: baseline">
        <p class="text-sm line-through" style="text-decoration: line-through">
          {{
            numberToRub(12256)
          }}
        </p>
        <p class="text-3xl text-red-600 font-medium" style="font-weight: 500">
          {{ numberToRub(10256) }}
        </p>
      </div>
      <div class="mb-10">
        <p class="text-xs mb-1">Размер букета:</p>
        <div class="flex flex-row gap-2">
          <UButton :ui="{rounded: 'rounded-full'}" size="lg" icon color="black">M</UButton>
          <UButton :ui="{rounded: 'rounded-full'}" size="lg" icon color="black">L</UButton>
          <UButton :ui="{rounded: 'rounded-full'}" size="lg" icon color="black">XL</UButton>
        </div>
      </div>

      <div class="flex flex-row items-center gap-2 mb-10">
        <template v-if="show === true">
          <UButton :ui="{ rounded: 'rounded-full' }" @click="show = false" color="black">Добавить в корзину</UButton>
        </template>
        <template v-if="show===false">
          <UButton @click="count--" :ui="{ rounded: 'rounded-full' }" icon="i-solar-minus-circle-linear" variant="ghost" color="primary" />
          <p class="w-14 ring-1 ring-gray-400 rounded-full text-center  py-2">{{count}}</p>
          <UButton @click="count++" :ui="{ rounded: 'rounded-full' }" icon="i-solar-add-circle-linear" variant="ghost" color="primary" />
          <UButton @click="show=true" :ui="{ rounded: 'rounded-full' }" icon="i-solar-trash-bin-trash-line-duotone" variant="ghost" color="black" />
<!--          <IconButton>-->
<!--            <IconMinus color="#000" />-->
<!--          </IconButton>-->
<!--          <Input style="width: 80px" />-->
<!--          <IconButton>-->
<!--            <IconPlus color="#000" />-->
<!--          </IconButton>-->
<!--          <IconButton @click="show = true" size="md" style="padding: 3px">-->
<!--            <IconTrash color="#00000050" />-->
<!--          </IconButton>-->
        </template>

      </div>
      <div class="flex flex-col gap-2 mb-6">
        <p>Вазы для вашего букета:</p>
        <div class="flex-col">
          <Flicking :options="options">
            <article  v-for="(link, i) in vazes" :key="i" class="panel rounded-md rounded-tl-xl rounded-br-xl">
              <div class="flex-col" style="padding: 2px; flex: 1 1; position: relative">
                <img class="rounded-md" :src="link" alt="">
                <p style="font-size: 13px; padding: 3px 3px">Ваза для ваших цветов № {{ i+1 }}</p>
                <UButton :ui="{rounded: 'rounded-md rounded-tl-xl rounded-br-xl'}" size="xs" color="black" block>Добавить</UButton>
              </div>

            </article>
          </Flicking>
        </div>

      </div>
      <div class="flex flex-col gap-4 mb-6">
        <p>Милые приятности:</p>
        <Flicking :options="options">
          <article  v-for="(link, i) in prezents" :key="link" class="panel rounded-md rounded-tl-xl rounded-br-xl">
            <div class="flex-col" style="padding: 2px; flex: 1 1; position: relative">
              <img class="rounded-md" :src="link" alt="">
              <p style="font-size: 13px; padding: 3px 3px">Подарок № {{ i+1 }}</p>
              <UButton :ui="{rounded: 'rounded-md rounded-tl-xl rounded-br-xl'}" size="xs" color="black" block>Добавить</UButton>
            </div>

          </article>
        </Flicking>
      </div>
    </div>
  </UContainer>
  <UContainer as="section" class="w-full flex flex-col md:flex-row wrap w-full">
    <h1 class="text-2xl">Состав букета</h1>
  </UContainer>
</template>


<style scoped lang="scss">
.panel {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-right: 11px;
  width: 150px;
}

</style>