<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
import {useTemplateRef} from "@vue/runtime-core";

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
const sliderOptions = {
  preventClickOnDrag: true,
  moveType: 'snap',
  align: 'center',
  threshold: 80,
  iOSEdgeSwipeThreshold: 30,
  circular: true,
  adaptive: false,
  circularFallback: 'bound',
  bound: true,
  preventDefaultOnDrag: true,
}

const slider = useTemplateRef('flickSlider')

const next = () => {
  try {
    slider.value.next();
  } catch (e) {
    // console.log(e)
  }

}
const prev = () => {
  try {
    slider.value.prev();
  } catch (e) {
    // console.log(e)
  }
}

</script>

<template>
  <section class="container" style="display: flex; padding: 0">
    <div class="flex-col gap-4" style="min-width: 300px; max-width: 50%; position: relative; align-self: flex-start">
      <div style="position: relative">
        <div class="flex-row" style="flex:1 1; justify-content: space-between; position: absolute; top: calc(50% - 22px); left: 15px; right: 15px; z-index: 999">
          <IconButton size="lg" class="arrows" @click="next">
            <IconArrowLeft height="32" style="margin-right: 2px"/>
          </IconButton>
          <IconButton size="lg" class="arrows" @click="prev">
            <IconArrowRight height="32" style="margin-left: 2px"/>
          </IconButton>
        </div>
        <Flicking ref="flickSlider" :options="sliderOptions">
          <article @click="console.log('рыготница')" v-for="(link, i) in flowers" :key="i" style="width: 100%">
            <img style="object-fit: cover; width: 100%; aspect-ratio: 1/1" :src="link" alt="">
          </article>
        </Flicking>
      </div>

      <div class="flex-col gap-3" style="padding: 0 10px">
        <h2>Состав букета:</h2>
        <ul class="flex-row gap-1">
          <li>Хризантемы</li>
          <li>Розы</li>
        </ul>
      </div>
    </div>
    <div class="flex-col gap-8" style="min-width: 300px; max-width: 50%; padding: 38px 44px; align-self: flex-start">
      <h1 style="font-size: 44px; line-height: 1">Романтический подарок</h1>
      <div class="flex-row gap-3" style="align-items: baseline; margin-top: -10px">
        <p style="font-size: 16px; text-decoration: line-through">
          {{
            numberToRub(12256)
          }}
        </p>
        <p style="font-size: 28px; color: var(--thunderbird-600); font-weight: 500">
          {{ numberToRub(10256) }}
        </p>
      </div>
      <div class="">
        <p>Размер букета:</p>
        <div class="flex-row gap-4" style="margin-top: 16px">
          <Button style="border: 1px solid var(--mine-400)" size="xs" rounded textColor="#85868B" color="transparent">M</Button>
          <Button style="border: 1px solid var(--mine-400)" size="xs" rounded textColor="#85868B" color="transparent">L</Button>
          <Button style="border: 1px solid var(--mine-400)" size="xs" rounded textColor="#85868B" color="transparent">XL</Button>
        </div>
      </div>

      <div class="flex-row gap-2">
        <template v-if="show === true">
          <Button @click="show = false" rounded color="#000">Добавить в корзину</Button>
        </template>
        <template v-if="show===false">
          <IconButton>
            <IconMinus color="#000" />
          </IconButton>
          <Input style="width: 80px" />
          <IconButton>
            <IconPlus color="#000" />
          </IconButton>
          <IconButton @click="show = true" size="md" style="padding: 3px">
            <IconTrash color="#00000050" />
          </IconButton>
        </template>

      </div>
      <div class="flex-col gap-4">
        <p>Вазы для вашего букета:</p>
        <div class="flex-col">
          <Flicking :options="options">
            <article  v-for="(link, i) in vazes" :key="i" class="panel">
              <div class="flex-col" style="padding: 2px; flex: 1 1; position: relative">
                <img :src="link" alt="">
                <p style="font-size: 13px; padding: 3px 3px">Ваза для ваших цветов № {{ i+1 }}</p>
                <Button size="xs" color="#000">Добавить</Button>
              </div>

            </article>
          </Flicking>
        </div>

      </div>
      <div class="flex-col gap-4">
        <p>Милые приятности:</p>
        <Flicking :options="options">
          <article  v-for="(link, i) in prezents" :key="link" class="panel">
            <div class="flex-col" style="padding: 2px; flex: 1 1; position: relative">
              <img :src="link" alt="">
              <p style="font-size: 13px; padding: 3px 3px">Подарок № {{ i+1 }}</p>
              <Button size="xs" color="#000">Добавить</Button>
            </div>

          </article>
        </Flicking>
      </div>

    </div>
  </section>
</template>


<style scoped lang="scss">
.arrows {
  background-color: var(--thunderbird-200);
}
.arrows:hover {
  background-color: var(--mine-950);
  opacity: 1;
}
.panel {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-right: 11px;
  width: 150px;
}

</style>