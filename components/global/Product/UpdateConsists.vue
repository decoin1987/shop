<script lang="js" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useProductColor from "../../../composables/useProductColors.js";
import {useCategoryStore} from "~/stores/category.store";
import {useTagStore} from "~/stores/tag.store";
import useProductTags from "../../../composables/useProductTags.js";
import useProductConsists from "../../../composables/useProductConsists.js";
import {computed} from "vue";


const columns = [
  // {
  //   key: 'id',
  //   label: '#',
  // },
  {
    key: 'title',
    label: 'Название',
  },
  {
    key: 'count',
    label: 'Количество',
  },
  {
    key: 'edit',
    label: '',
  },
]


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
const { productsConsist, fetchProductConsists, consists, fetchConsists } = useProductConsists()
await fetchProductConsists(route.params.id);
await fetchConsists()
props.product.consist = [...productsConsist.value]

const consist = ref({})
const addConsist = () => {
  const product = {...consist.value}
  props.product.consist.push(product)
  consist.value = {}
}

const delConsist = (consist) => {
  props.product.consist = props.product.consist.filter(el => el.consist_id !== consist.consist_id)
}

const consistsSelectOptions = computed(() => {
  // console.log('Продукты в составе', props.product.consist)
  return consists.value.filter(el => el.id !== route.params.id).filter(el => !props.product.consist.map(el => el.consist_id).includes(el.id))
})

</script>


<template>
  <p>Состав</p>
  <UForm :state="props.product" class="flex w-full flex-col gap-4 p-4 bg-white">
    <div class="flex flex-col w-full gap-4 ">
<!--      <div class="flex flex-col gap-4 w-full">
        {{props.product.consist}}
        <dev class="flex" v-for="item in props.product.consist">
          <p>{{ consists.find(el => el.id === item.product).title }}</p>
          <p>{{ item.count }}</p>
          <UButton type="button" @click="delConsist(item)">Удалить</UButton>
        </dev>
      </div>-->
      <div class="flex w-full gap-4">
        <UFormGroup label="Состав" class="w-full" name="consist" v-if="tagStore">
          <USelectMenu placeholder="Состав" size="xl" v-model="consist.consist_id" :options="consistsSelectOptions"
                       valueAttribute="id" optionAttribute="title">
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="Количество" class="w-full" name="quantity">
          <UInput v-model="consist.count" size="xl" placeholder="Количество"/>
        </UFormGroup>
        <UButton class="self-end" @click="addConsist">Добавить</UButton>
      </div>

    </div>
    <UDivider />
    <UButton class="self-start" type="submit" label="Сохранить" @click="$emit('saveProduct')"/>
  </UForm>
  <UTable v-if="props.product.consist.length" class="w-full"
          :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
          :rows="props.product.consist" :columns="columns">
    <template #title-data="{row}">
      <div class="flex flex-row no-wrap gap-2">
        <p>{{ consists.find(el => el.id === row.consist_id)?.title }}</p>
      </div>
    </template>
    <template #edit-data="{row}">
      <UButton type="button" @click="delConsist(row)">Удалить</UButton>
    </template>
  </UTable>
</template>

<style scoped>

</style>