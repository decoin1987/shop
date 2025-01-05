<script lang="ts" setup>
import {useCategoryStore} from "~/stores/category.store";
import {useTagStore} from "~/stores/tag.store";
import {useProductStore} from "~/stores/product.store";
import {object, string, type InferType, boolean, array, number} from 'yup'
import {computed, ref} from "vue";

const schema = object({
  title: string().required('Введите имя'),
  price: number().required('Цена обязательна для заполнения'),
  vendorCode: string().required('Введите артикул'),
  asConsist: boolean(),
  photos: array(),
  category: string(),
  tag: array(),
  consist: array(),
})
type Schema = InferType<typeof schema>



const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const productStore = useProductStore()
const state = ref({
  title: '',
  price: 0,
  vendorCode: '',
  asConsist: false,
  photos: [],
  category: undefined,
  tag: [],
  consist: [],
})
const actionMenu = (row:any) => [
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
    key: 'product_images',
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
  await productStore.createProduct({
    title: state.value.title,
    price: state.value.price,
    vendor_code: state.value.vendor_code,
    as_consist: state.value.as_consist,
    photos: state.value.photos,
    category: state.value.category,
    tag: state.value.tag,
    consist: state.value.consist,
  })
}
</script>

<template>
<!--  {{productStore.products}}-->
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Товары</h1>
    <UForm :state="state" class="p-4 ring-2 ring-gray-300 rounded-lg mt-1 flex w-full flex-col gap-3 mb-10"
           @submit="onSubmit">
        <div class="flex w-full flex-col gap-4">
          <UFormGroup label="Название" name="title">
            <UInput size="xl" v-model="state.title" type="text" placeholder="Название"/>
          </UFormGroup>

          <UFormGroup label="Цена" name="price">
            <UInput size="xl" v-model="state.price" placeholder="Цена"/>
          </UFormGroup>

          <UFormGroup label="Артикул" name="vendorCode">
            <UInput size="xl" v-model="state.vendor_code" placeholder="Артикул"/>
          </UFormGroup>

          <UFormGroup label="Категория" name="category">
            <USelect size="xl" placeholder="Категория" v-model="state.category" :options="categoryStore.categories.rows"
                     valueAttribute="id" optionAttribute="title"/>
          </UFormGroup>
          <UFormGroup label="Цвета" name="tag">
            <USelectMenu size="xl" placeholder="Теги" v-model="state.tag" :options="tagStore.tags.rows" multiple
                         valueAttribute="id" optionAttribute="title"/>
          </UFormGroup>
          <UFormGroup label="Теги" name="tag">
            <USelectMenu size="xl" placeholder="Теги" v-model="state.tag" :options="tagStore.tags.rows" multiple
                         valueAttribute="id" optionAttribute="title"/>
          </UFormGroup>
          <UFormGroup label="Состав" name="consist">
            <USelectMenu size="xl" placeholder="Состав" v-model="state.consist" :options="categoryStore.categories.rows"
                         multiple valueAttribute="id" optionAttribute="title"/>
          </UFormGroup>

          <UFormGroup name="asConsist">
            <UCheckbox v-model="state.as_consist" label="Может быть в составе товаров"/>
          </UFormGroup>

          <UButton class="submit-btn" type="submit">Создать</UButton>
          <!--                    <USelectMultiply v-model="form.tag" :items="tags.rows" multi valueName="id" itemName="title" label="Тег"  />-->
        </div>
        <div class="flex w-3/6 flex-col gap-4">
          <UFormGroup label="Фото" name="photos">
            <ImageLoader v-model="state.photos"/>
          </UFormGroup>
        </div>
      </UForm>
    <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
      <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
    </div>
    <UTable class="w-full"
            v-model="selected"
            :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
            :rows="filteredRows" :columns="columns">
      <template #title-data="{row}">
        <div class="flex flex-row no-wrap gap-2">
          <NuxtLink :to="`/admin/catalog/products/${row.id}`">{{ row.title }}</NuxtLink>
        </div>
      </template>
      <template #category-data="{row}">
        <div class="flex flex-row no-wrap gap-2">
          <NuxtLink :to="`/admin/catalog/categories/${row.category?.slug}`">{{ row.category?.title }}</NuxtLink>
        </div>
      </template>
      <template #product_images-data="{row}">
        <div class="flex flex-row no-wrap gap-2">
          <template v-if="row.product_images.length">
            <img height="100" width="100" style="object-fit: cover; aspect-ratio: 1/1"
                 :src="`/img/product/${row.product_images[0].url}`"/>
          </template>
        </div>
      </template>
      <template #sort-data="{row}">
        <div class="flex flex-row no-wrap gap-2">
          <UInput v-model="row.sort"/>
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
  </section>

</template>

<style scoped lang="scss">

</style>