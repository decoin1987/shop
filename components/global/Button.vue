<script setup lang="ts">
import {computed, ref} from "@vue/reactivity";


const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  leftIcon: Boolean,
  rightIcon: Boolean,
  rounded: {
    type: Boolean,
    default: false
  },
  color: {type: String, default: '#00000010'},
  textColor: {type: String, default: '#fff'},
})


const sizes = {
  xs: {
    fontSize: 14,
    padX: 14,
    padY: 0,
    height: 32,
  },
  md: {
    fontSize: 16,
    padX: 14,
    padY: 0,
    height: 42,
  },
  lg: {
    fontSize: 18,
    padX: 14,
    padY: 0,
    height: 52,
  },
  xl: {
    fontSize: 22,
    padX: 14,
    padY: 10,
    height: 62,
  },
}

const compSize = computed(() => {
  return `
    font-size:${sizes[props.size].fontSize}px;
    padding: ${sizes[props.size].padY}px ${sizes[props.size].padX}px;
    height: ${sizes[props.size].height}px;
    border-radius: ${props.rounded ? ' 999px' : 0 + 'px'};
    background-color:${props.color};
  `
})
</script>

<template>
  <button :style="compSize">
    <div v-if="leftIcon" :style="`width: ${sizes[props.size].height-6}px;`" class="left icon_wrapper">
      <slot name="left-icon"></slot>
    </div>
    <div :style="`margin: ${!leftIcon && !rightIcon ? sizes[props.size].height/2 +'px' : '5px'}; color:${props.textColor};`" class="text_wrapper">
      <slot></slot>
    </div>
    <div v-if="rightIcon" :style="`width: ${sizes[props.size].height-6}px;`" class="right icon_wrapper">
      <slot name="right-icon"></slot>
    </div>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  flex-wrap: nowrap;
  border: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: opacity ease-in-out 0.2s;
  border-radius: 6px;
}

button:hover {
  opacity: 0.8;
}

.icon_wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.right {
  margin-right:-10px;
}

.left {
  margin-left: -10px;
}

.text_wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 10px;
}
</style>