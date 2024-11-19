<script lang="ts" setup>
const props = defineProps({
  color: {type: String, default: 'white'}
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" :stroke="color" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="m9 5l6 7l-6 7"/>
  </svg>
</template>
<style scoped lang="scss">

</style>