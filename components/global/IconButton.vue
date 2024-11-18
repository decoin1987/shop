<script setup lang="ts">
import {computed, ref} from "@vue/reactivity";


const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'transparent',
  }
})


const sizes = {
  xs: {
    height: 32,
  },
  md: {
    height: 42,
  },
  lg: {
    height: 52,
  },
  xl: {
    height: 62,
  },
}

const compSize = computed(() => {
  return `
    height: ${sizes[props.size].height}px;
    width: ${sizes[props.size].height}px;
    background-color:${props.color};
  `
})
</script>

<template>
  <button :style="compSize">
      <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  flex-wrap: nowrap;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity ease-in-out 0.2s;
  border-radius: 999px;
}

button:hover {
  opacity: 0.8;
}


</style>