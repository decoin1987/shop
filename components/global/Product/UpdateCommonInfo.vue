<script lang="ts" setup>
const props = defineProps({
  product: Object
})
</script>

<template>
  <UForm :state="props.product" class="flex w-full flex-col gap-3">
    <UFormGroup label="Наименование">
      <UInput v-model="props.product.title" size="xl" placeholder="Наименование"/>
    </UFormGroup>
    <UFormGroup label="Описание">
      <UTextarea v-model="props.product.descriptions" size="xl" placeholder="Описание"/>
    </UFormGroup>
    <UDivider/>
    <pre>{{ props.product.slug }}</pre>
    <div class="flex w-full gap-3">
      <UFormGroup class="w-full"  label="HTML-Title">
        <UInput v-model="props.product.html_title" size="md" placeholder="HTML-Title"/>
      </UFormGroup>
      <UFormGroup class="w-full"  label="HTML-H1">
        <UInput v-model="props.product.html_h1" class="w-full" size="md" placeholder="HTML-H1"/>
      </UFormGroup>
    </div>

    <UFormGroup class="w-full" label="META-Description">
      <UTextarea v-model="props.product.html_tags" class="w-full" size="md" placeholder="META-Description" />
    </UFormGroup>
    <div class="flex w-full gap-3">
      <UFormGroup v-model="props.product.meta_keywords" class="w-full" label="META-Keywords">
        <UInput class="w-full" size="md" placeholder="META-Keywords"/>
      </UFormGroup>
      <UFormGroup v-model="props.product.meta_description" class="w-full" label="HTML-Tags">
        <UInput class="w-full" size="md" placeholder="HTML-Tags"/>
      </UFormGroup>
    </div>
    <UButton class="self-start" @click="$emit('saveProduct')" label="Сохранить"/>
  </UForm>
</template>

<style scoped>

</style>