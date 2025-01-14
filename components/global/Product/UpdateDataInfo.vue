<script lang="js" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {computed, ref} from "vue";
import {useAsyncData} from "nuxt/app";
import useProductColor from "../../../composables/useProductColors.js";


const route = useRoute()
const router = useRouter()
const props = defineProps({
  product: Object,
  productColors: Object,
  tag: Object,
  tax: Object,
})
const { colors, fetchProductColor, mapColors } = useProductColor()  
await fetchProductColor(route.params.id);


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
        <USelectMenu v-model="props.product.tax_id" size="xl" placeholder="Налог" :options="props.tax" valueAttribute="id" optionAttribute="title"/>
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
      <UFormGroup class="w-full" label="Размеры (Д x Ш x В)">
        <UInput v-model="props.product.size" size="xl" placeholder="Размеры (Д x Ш x В)"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Единица длины">
        <USelect v-model="props.product.descriptions" size="xl" placeholder="Единица длины"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Вес">
        <UInput v-model="props.product.weight" size="xl" placeholder="Вес"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Единица веса">
        <USelect v-model="props.product.descriptions" size="xl" placeholder="Единица веса"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Порядок сортировки">
        <UInput v-model="props.product.sort" size="xl" placeholder="Порядок сортировки"/>
      </UFormGroup>
      <UFormGroup class="w-full" label="Цвета">
        <USelectMenu multiple size="xl" placeholder="Цвета" v-model="colors"
                     :options="props.productColors?.rows" valueAttribute="id" optionAttribute="title">
          <template #label>
            <div v-if="colors.length" class="truncate flex h-6 items-center gap-1">
              <div v-for="color in colors"
                   :style="`background-color:`+ props.productColors?.rows.find(el => el.id === color).hex"
                   :class="['inline-block h-5 w-5 flex-shrink-0 rounded-full ring-1 ring-gray-200']">
              </div>
            </div>
            <span v-else>Выбрать цвет</span>
          </template>
          <template #option="{ option: color }">
            <span :style="`background-color:`+ color.hex"
                  :class="['inline-block h-2 w-2 flex-shrink-0 rounded-full ring-1 ring-gray-200']" aria-hidden="true" />
            <span class="truncate">{{ color.title }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>
    </div>
    <UButton class="self-start" type="submit" label="Сохранить"/>
  </UForm>
</template>

<style scoped>

</style>