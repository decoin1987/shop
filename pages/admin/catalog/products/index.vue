<script lang="ts" setup>
import {useCategoryStore} from "../stores/category.store";
import {useTagStore} from "../stores/tag.store";
import {useProductStore} from "../stores/product.store";
import {object, string, type InferType, boolean, array, number} from 'yup'
import {computed, ref} from "vue";

const schema = object({
  title: string().required('Введите имя'),
  price:number().required('Цена обязательна для заполнения'),
  vendorCode:string().required('Введите артикул'),
  asConsist:boolean(),
  photos:array(),
  category: string(),
  tag: array(),
  consist: array(),
})
type Schema = InferType<typeof schema>

const state = ref({
  title: '123',
  price:123,
  vendorCode:'12344',
  asConsist:false,
  photos:[],
  category: undefined,
  tag: [],
  consist: [],
})

const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const productStore = useProductStore()
const actionMenu = row => [
  [{
    label: 'Изменить',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Скопировать',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Переместить',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => productStore.deleteProduct(row)
  }]
]
const columns = [
  {
    key: 'title',
    label: 'Название',
    sortable: true,
  },
  {
    key: 'productImages',
    label: 'Изображение',
  },
  {
    key: 'category',
    label: 'Категория',
  },
  {
    key: 'price',
    label: 'Цена',
    sortable: true,
  },
  {
    key: 'count',
    label: 'Остаток',
    sortable: true,
  },
  // {
  //   key: 'raw_tag',
  //   label: 'Теги для SEO',
  // },
  // {
  //   key: 'as_consist',
  //   label: 'в составе',
  //   sortable: true,
  // },
  // {
  //   key: 'showcase',
  //   label: 'На витрине',
  //   sortable: true,
  // },
  // {
  //   key: 'active',
  //   label: 'Показывать на сайте',
  //   sortable: true,
  // },
  // {
  //   key: 'decrease_stock',
  //   label: 'Вычитать со склада',
  //   sortable: true,
  // },
  {
    key: 'vendor_code',
    label: 'Артикул',
  },
  // {
  //   key: 'slug',
  //   label: 'Ссылка',
  // },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]
const selected = ref([])
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return productStore.products.rows
  }

  return productStore.products.rows.filter((el) => {
    return Object.values(el).some((el) => {
      return String(el).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
const onSubmit = async () => {
  console.log(123123)
  await productStore.createProduct({
    title: state.value.title,
    price: state.value.price,
    vendorCode: state.value.vendorCode,
    asConsist: state.value.asConsist,
    photos:state.value.photos,
    category: state.value.category,
    tag: state.value.tag,
    consist: state.value.consist,
  })
}
</script>

<template>
  <div class="flex flex-col max-w-8xl mx-auto items-start p-10">
    <h1 class="text-5xl font-medium mb-10">Товары</h1>
    <div class="flex w-full flex-col gap-2 mb-10">
      <UForm :schema="schema" :state="state" class="flex flex-row gap-10" @submit="onSubmit">
        <div class="flex w-3/6 flex-col gap-4">
          <UFormGroup label="Название" name="title">
            <UInput v-model="state.title" type="text" placeholder="Название" />
          </UFormGroup>

          <UFormGroup label="Название" name="price">
            <UInput v-model="state.price" placeholder="Цена"/>
          </UFormGroup>

          <UFormGroup label="Название" name="vendorCode">
            <UInput v-model="state.vendorCode" placeholder="Артикул" />
          </UFormGroup>

          <UFormGroup label="Категория" name="category">
            <USelect placeholder="Категория" v-model="state.category" :options="categoryStore.categories.rows" valueAttribute="id" optionAttribute="title" />
          </UFormGroup>

          <UFormGroup label="Теги" name="tag">
            <USelectMenu placeholder="Теги" v-model="state.tag" :options="tagStore.tags.rows" multiple valueAttribute="id" optionAttribute="title" />
          </UFormGroup>
          <UFormGroup label="Состав" name="consist">
            <USelectMenu placeholder="Состав" v-model="state.consist" :options="categoryStore.categories.rows" multiple valueAttribute="id" optionAttribute="title" />
          </UFormGroup>

          <UFormGroup name="asConsist">
            <UCheckbox v-model="state.asConsist" label="Может быть в составе товаров"/>
          </UFormGroup>

          <UButton class="submit-btn" type="submit">Создать</UButton>
          <!--                    <USelectMultiply v-model="form.tag" :items="tags.rows" multi valueName="id" itemName="title" label="Тег"  />-->
        </div>
        <div class="flex w-3/6 flex-col gap-4">
          <UFormGroup label="Фото" name="photos">
            <ImageLoader v-model="state.photos" />
          </UFormGroup>
        </div>
      </UForm>
    </div>
  </div>
  <div class="w-full max-w-8xl mx-auto flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
    <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
  </div>
  <UTable class="w-full  max-w-8xl mx-auto"
          v-model="selected"
          :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
          :rows="filteredRows" :columns="columns">
    <template #title-data="{row}">
      <div class="flex flex-row no-wrap gap-2">
        <NuxtLink :to="`/admin/catalog/products/${row.slug}`">{{row.title}}</NuxtLink>
      </div>
    </template>
    <template #category-data="{row}">
      <div class="flex flex-row no-wrap gap-2">
        <NuxtLink :to="`/admin/catalog/categories/${row.category?.slug}`">{{row.category?.title}}</NuxtLink>
      </div>
    </template>
    <template #productImages-data="{row}">
      <div class="flex flex-row no-wrap gap-2">
        <template v-if="row.productImages.length">
          <img height="100" width="100" style="object-fit: cover; aspect-ratio: 1/1" :src="`/img/product/${row.productImages[0].url}`" />
        </template>
      </div>
    </template>
    <template #sort-data="{row}">
      <div class="flex flex-row no-wrap gap-2">
        <UInput v-model="row.sort" />
        <UButton size="xs" @click="categoryStore.editCategory(row)">Изменить</UButton>
      </div>
    </template>
    <template #actions-data="{row}">
      {{ row.parent?.title }}
    </template>
    <template #edit-data="{row}">
      <UDropdown :items="actionMenu(row)">
        <UButton color="black" rounded variant="solid">Редактировать</UButton>
      </UDropdown>
    </template>
  </UTable>
</template>

<style scoped lang="scss">

</style>