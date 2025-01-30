<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";
import {ref} from "@vue/reactivity";
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
  renderOnlyVisible: true,
  preventDefaultOnDrag: true,
}

const stories = ref([
  {
    id: 1,
    link: 'cat1.png',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: 'cat2.png',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: 'cat3.png',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: 'cat4.png',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: '5.jpg',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: '6.jpg',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: '7.jpg',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
  {
    id: 1,
    link: '10.jpg',
    label: 'Режим работы',
    minTitle: 'Закроемся:',
    title: '23:00',
    button: false,
    buttonLabel: '',
    to: '/',
    bg: ''
  },
])
</script>

<template>
    <Flicking :options="options">
      <article v-for="(store, index) in stories" :key="store.id + index" class="panel w-4/6 sm:w-3/6 md:w-2/6 lg:w-1/4" style="position: relative">
        <div class="story-card" style="position: relative">
          <h1>{{ store.label }}</h1>
          <NuxtImg  style="object-fit: cover; position: absolute; top: 0; bottom: 0; right: 0; left: 0;" :src="`/images/${store.link}`" alt="" />
        </div>
      </article>
<!--      <template #viewport>-->
<!--        <span class="item-inside-viewport"></span>-->
<!--        <span class="item-inside-viewport"></span>-->
<!--      </template>-->
    </Flicking>
</template>

<style scoped lang="scss">
.panel {
  padding: 10px;
  //width: calc(100vw/4);
  aspect-ratio: 3/4.5;
  display: flex;
}

.story-card {
  background-color: #9d171d;
  display: flex;
  flex: 1 1;
  border-radius: 10px;
  overflow: hidden;
}
</style>