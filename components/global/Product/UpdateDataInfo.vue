<script lang="js" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useProductColor from "../../../composables/useProductColors.js";
import useProductTags from "../../../composables/useProductTags.js";

const route = useRoute()
const router = useRouter()
const props = defineProps({
  product: Object,
  colors: Object,
  tax: Object,
  tagStore: Object,
  categoryStore: Object,
})

const { colorsInProduct, fetchProductColor } = useProductColor()
await fetchProductColor(route.params.id);
const { tagsInProduct, fetchProductTags } = useProductTags()
await fetchProductTags(route.params.id);

props.product.colors = []
props.product.colors = [...colorsInProduct.value]
props.product.consist = []
props.product.tags = tagsInProduct.value.map(el => el.tag_id)

</script>


<template>
  <UDivider />

  <UForm :state="props.product" class="flex w-full flex-col gap-3">
    <div class="flex flex-row w-full gap-4">
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
    <div class="flex flex-row w-full gap-4">
      <UFormGroup label="Теги" class="w-full" name="tag" v-if="tagStore">
        <USelectMenu placeholder="Теги" size="xl" v-model="product.tags" :options="tagStore" multiple
                     valueAttribute="id" optionAttribute="title">
          <template #label>
            <div v-if="props.product.tags?.length" class="truncate flex h-6 items-center gap-1">
              <UBadge v-for="tag in props.product?.tags">
                {{
                  tagStore.find(el => el.id === tag).title
                }}
              </UBadge>
            </div>
            <span v-else>Выбрать тег</span>
          </template>
        </USelectMenu>
      </UFormGroup>
      <UFormGroup label="Категория" class="w-full" name="category">
        <USelectMenu size="xl" placeholder="Теги" v-model="product.category_id" :options="categoryStore.rows"
                     valueAttribute="id" optionAttribute="title"/>
      </UFormGroup>
    </div>
    <UDivider />
    <div class="flex flex-row w-full gap-4">
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
    <div class="flex flex-row w-full gap-4">
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
        <USelectMenu multiple size="xl" placeholder="Цвета" v-model="props.product.colors"
                     :options="props.colors?.rows" valueAttribute="id" optionAttribute="title">
          <template #label>
            <div v-if="props.product.colors?.length" class="truncate flex h-6 items-center gap-1">
              <div v-for="color in props.product.colors"
                   :style="`background-color:`+ props.colors?.rows.find(el => el.id === color).hex"
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
    <div class="flex flex-row w-full gap-4">
      <UFormGroup class="w-full" label="Собран">
        <VueDatePicker v-model="props.product.created_at" readonly  model-type="iso" timezone="Asia/Tashkent"></VueDatePicker>
      </UFormGroup>
      <UFormGroup class="w-full" label="Изменен">
        <VueDatePicker v-model="props.product.updated_at" readonly  model-type="iso" timezone="Asia/Tashkent"></VueDatePicker>
      </UFormGroup>
    </div>
    <UButton class="self-start" type="submit" label="Сохранить" @click="$emit('saveProduct')"/>
  </UForm>
</template>

<style scoped>

</style>