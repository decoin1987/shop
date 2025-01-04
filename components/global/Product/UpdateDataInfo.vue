
<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const props = defineProps({
  product: Object
})

const date = ref();
</script>

<template>
  <UForm :state="props.product" class="flex w-full flex-col gap-3">
    <div class="flex frex-row w-full gap-4">
      <UFormGroup class="w-full" label="Артикул">
        <UInput v-model="props.product.vendor_code" size="xl" placeholder="Артикул"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Цена">
        <UInput v-model="props.product.price" size="xl" placeholder="Цена"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Количество">
        <UInput v-model="props.product.count" size="xl" placeholder="Количество"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Налог">
        <USelect v-model="props.product.price" size="xl" placeholder="Налог"/>
      </UFormGroup>
    </div>
    <div class="flex frex-row w-full gap-4">
      <UFormGroup class="w-full" label="Собран">
        <VueDatePicker v-model="props.product.created_at" readonly  model-type="iso" timezone="Asia/Tashkent"></VueDatePicker>
      </UFormGroup>
      <UFormGroup class="w-full" label="Изменен">
        <VueDatePicker v-model="props.product.updated_at" readonly  model-type="iso" timezone="Asia/Tashkent"></VueDatePicker>
      </UFormGroup>
    </div>
    <UDivider />
    <div class="flex frex-row w-full gap-4">
      <UFormGroup label="Показывать на сайте">
        <UToggle v-model="props.product.active" size="xl" placeholder="Показывать на сайте"/>
      </UFormGroup>
      <UFormGroup label="Показывать на витрине">
        <UToggle v-model="props.product.showcase" size="xl" placeholder="Показывать на сайте"/>
      </UFormGroup>
      <UFormGroup label="Вычитать со склада">
        <UToggle v-model="props.product.decrease_stock" size="xl" placeholder="Вычитать со склада"/>
      </UFormGroup>
      <UFormGroup label="Может быть в составе">
        <UToggle v-model="props.product.as_consist" size="xl" placeholder="Может быть в составе"/>
      </UFormGroup>
    </div>
    <UDivider />
    <div class="flex frex-row w-full gap-4">
      <UFormGroup label="Размеры (Д x Ш x В)">
        <UInput v-model="props.product.size" size="xl" placeholder="Размеры (Д x Ш x В)"/>
      </UFormGroup>
      <UFormGroup label="Единица длины">
        <USelect v-model="props.product.descriptions" size="xl" placeholder="Единица длины"/>
      </UFormGroup>
      <UFormGroup label="Вес">
        <UInput v-model="props.product.weight" size="xl" placeholder="Вес"/>
      </UFormGroup>
      <UFormGroup label="Единица веса">
        <USelect v-model="props.product.descriptions" size="xl" placeholder="Единица веса"/>
      </UFormGroup>
      <UFormGroup label="Порядок сортировки">
        <UInput v-model="props.product.sort" size="xl" placeholder="Порядок сортировки"/>
      </UFormGroup>
    </div>
    <UButton class="self-start" type="submit" label="Сохранить"/>
  </UForm>
</template>

<style scoped>

</style>