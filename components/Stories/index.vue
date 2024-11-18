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
}

const stories = ref([
  {
    id: 1,
    link: '/',
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
    link: '/',
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
    link: '/',
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
    link: '/',
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
    link: '/',
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
    link: '/',
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
    link: '/',
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
    link: '/',
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
  <div class="">
    <Flicking :options="options">
      <article v-for="(store, index) in stories" :key="store.id + index" class="panel">
        <div class="story-card">
          <h1>{{ store.label }}</h1>
        </div>
      </article>
<!--      <template #viewport>-->
<!--        <span class="item-inside-viewport"></span>-->
<!--        <span class="item-inside-viewport"></span>-->
<!--      </template>-->
    </Flicking>
  </div>
</template>

<style scoped lang="scss">
.panel {
  padding: 10px;
  width: 300px;
  aspect-ratio: 3/4.5;
  display: flex;
}

.story-card {
  background-color: #9d171d;
  display: flex;
  flex: 1 1;
  border-radius: 10px;
}
</style>