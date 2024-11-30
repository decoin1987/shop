<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
import {useTemplateRef} from "@vue/runtime-core";
const props = defineProps({
  aspect: { type: Number, default: 1},
  images: { type: Array, required: true},
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
    <IconButton size="lg" class="arrows" @click="prev" style="position: absolute; top: calc(50% - 22px); left: 15px; z-index: 5">
      <IconArrowLeft height="32" style="margin-right: 2px"/>
    </IconButton>
    <IconButton size="lg" class="arrows" @click="next" style="position: absolute; top: calc(50% - 22px); right: 15px; z-index: 5">
      <IconArrowRight height="32" style="margin-left: 2px"/>
    </IconButton>
    <Flicking ref="flickSlider" :options="sliderOptions">
      <article @click="console.log('click')" v-for="(link, i) in images" :key="i" style="width: 100%">
        <img :style="`aspect-ratio: ${aspect}`" style="object-fit: cover; width: 100%;" :src="link" alt="">
      </article>
    </Flicking>
  </div>
</template>

<style scoped lang="scss">

</style>