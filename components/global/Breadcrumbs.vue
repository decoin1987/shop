<script lang="ts" setup>
const props = defineProps({
  links: Array,
  lastLink: {}
})
</script>

<template v-if="links.length">
  <UBreadcrumb class="mb-8" :links="[...links, lastLink]"/>
</template>

<style scoped>

</style>