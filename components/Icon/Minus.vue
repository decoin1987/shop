<script lang="ts" setup>
const props = defineProps({
  color: {type: String, default: 'white'}
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g fill="none" :stroke="color" stroke-width="0.5">
      <circle cx="12" cy="12" r="10" opacity="0.5"/>
      <path stroke-linecap="round" d="M15 12H9"/>
    </g>
  </svg>
</template>
<style scoped lang="scss">

</style>