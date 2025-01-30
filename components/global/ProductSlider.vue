<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
import {useTemplateRef} from "@vue/runtime-core";
import product from "~/server/models/product";
const props = defineProps({
  aspect: { type: Number, default: 1},
  images: { type: Array, required: true, default: []},
})

const slider = useTemplateRef('flickSlider')

const next = () => {
  try {
    if (!slider.value.animating) {
      slider.value.next();
    }
  } catch (e) {
    return
  }

}
const prev = () => {
  try {
    if (!slider.value.animating) {
      slider.value.prev();
    }
  } catch (e) {
    return
  }
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
  // bound: true,
  preventDefaultOnDrag: true,
}
</script>

<template>
  <div class="relative w-full">
    <UButton v-if="images.length > 1" :ui="{ rounded: 'rounded-full' }" size="xl" @click="prev" icon="i-solar-alt-arrow-left-line-duotone" color="black" variant="solid" style="position: absolute; top: calc(50% - 22px); left: 15px; z-index: 5" />
    <UButton v-if="images.length > 1" :ui="{ rounded: 'rounded-full' }" size="xl" @click="next" icon="i-solar-alt-arrow-right-line-duotone" color="black" variant="solid" style="position: absolute; top: calc(50% - 22px); right: 15px; z-index: 5" />
    <Flicking ref="flickSlider" :options="sliderOptions">
      <article @click="console.log('click')" v-for="(image, i) in images" :key="i" style="width: 100%">
        <NuxtImg  :style="`aspect-ratio: ${aspect}`" style="object-fit: cover; width: 100%;" :src="`/img/product/${image.url}`" alt="" />
      </article>
    </Flicking>
  </div>
</template>

<style scoped lang="scss">
.arrows {
  background-color: var(--thunderbird-200);
}
.arrows:hover {
  background-color: var(--mine-950);
  opacity: 1;
}
</style>