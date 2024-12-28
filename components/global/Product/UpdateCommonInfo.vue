<script lang="ts" setup>
  const props = defineProps({
    product: Object
  })
</script>

<template>
  <UForm :state="props.product" class="flex w-full flex-col gap-3">
    <UInput v-model="props.product.title" size="xl" placeholder="Наименование"></UInput>
    <p class="text-sm">Ссылка: {{ product.slug }}</p>
    <UTextarea v-model="props.product.descriptions" size="xl" placeholder="Описание"></UTextarea>
    <UDivider/>
    <div class="flex w-full gap-3">
      <UInput class="w-full" size="md" placeholder="HTML-Title"></UInput>
      <UInput class="w-full" size="md" placeholder="HTML-H1"></UInput>
    </div>
    <UTextarea class="w-full" size="md" placeholder="META-Description"></UTextarea>
    <div class="flex w-full gap-3">
      <UInput class="w-full" size="md" placeholder="META-Keywords"></UInput>
      <UInput class="w-full" size="md" placeholder="HTML-Tags"></UInput>
    </div>
    <UButton class="self-start" type="submit" label="Сохранить"/>
  </UForm>
</template>

<style scoped>

</style>