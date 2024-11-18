<script lang="ts" setup>
const props = defineProps({
  to: String,
  color: {
    type: String,
    default: '#f43f48'
  },
  hovered: Boolean
})

</script>

<template>
  <NuxtLink :class="`
  ${props.hovered ? 'hovered' : ''}
  `"
            :style="`color: ${props.color}`" :to="props.to">
    <slot></slot>
  </NuxtLink>
</template>

<style scoped lang="scss">
.hovered {
  border-radius: 999px;
  padding: 10px 20px;
  background-color: transparent;
  transition: background-color ease-in-out 0.2s;
}

.hovered:hover {
  background-color: #f43f4810;

}

a {
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
}

a:hover {
  //text-decoration: underline;
  //text-decoration-thickness: 1px;
  //text-underline-offset: 3px;
}
</style>