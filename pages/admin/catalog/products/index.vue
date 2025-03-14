<script lang="ts" setup>
import {useCategoryStore} from "~/stores/category.store";
import {useTagStore} from "~/stores/tag.store";
import {useProductStore} from "~/stores/product.store";
import {object, string, type InferType, boolean, array, number} from 'yup'
import {useRoute} from "nuxt/app";
import {computed} from "vue";


const schema = object({
  title: string().required('Введите имя'),
  price: number().required('Цена обязательна для заполнения'),
  vendorCode: string().required('Введите артикул'),
  as_consist: boolean(),
  showcase: boolean(),
  active: boolean(),
  decrease_stock: boolean(),
  photos: array(),
  category: string(),
  tag: array(),
  consist: array(),
})
type Schema = InferType<typeof schema>
const page  = ref(1)
const viewMore = ref(1)
const pageSize = computed(()=> {
  return 5 * viewMore.value
})
const route = useRoute()

const {data: colors, status: colorStatus, refresh: colorRefresh} = useFetch(`/api/utils/colors`)
const {data: tax, status: taxStatus, refresh: taxRefresh} = useFetch(`/api/utils/taxes`)
    // ?page=${page.value}&pageSize=${pageSize.value}
let {data: products, status: productsStatus, refresh: productsRefresh} = useFetch(`/api/catalog/product`, {
    query: { page: page, pageSize: pageSize },
    watch: [page, pageSize],
    // immediate: false
})



const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const productStore = useProductStore()
const state = ref({
  title: '',
  price: 0,
  vendorCode: '',
  as_consist: false,
  showcase: false,
  active: true,
  decrease_stock: false,
  photos: [],
  category: undefined,
  tag: [],
  tax: undefined,
  colors: [],
  consist: [],
})
const actionMenu = (row: any) => [
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
    key: 'id',
    label: '#',
  },
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
  {
    key: 'vendor_code',
    label: 'Артикул',
  },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]
const selected = ref([])
const q = ref('')


const filteredRows = computed(() => {
  try {
    if (!q.value) {
      return products.value.rows
    }

    return products.value.rows.filter((el) => {
      return Object.values(el).some((el) => {
        return String(el).toLowerCase().includes(q.value.toLowerCase())
      })
    })
  }
  catch (e) {
    return
  }
})

const onSubmit = async () => {
  await productStore.createProduct({
    title: state.value.title,
    price: state.value.price,
    vendor_code: state.value.vendor_code,
    as_consist: state.value.as_consist,
    showcase: state.value.showcase,
    active: state.value.active,
    decrease_stock: state.value.decrease_stock,
    photos: state.value.photos,
    category: state.value.category,
    tag: state.value.tag,
    tax: state.value.tax,
    colors: state.value.colors,
    consist: state.value.consist,
  })
}

</script>

<template>
  <!--  {{productStore.products}}-->
<!--  {{products}}-->
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Товары</h1>
    <UForm :state="state" class="p-4 ring-2 ring-gray-300 rounded-lg mt-1 flex w-full flex-col gap-3 mb-10"
           @submit="onSubmit">
      <div class="flex w-full flex-row gap-4">
        <UFormGroup label="Название"  class="w-full" name="title">
          <UInput size="xl" v-model="state.title" type="text" placeholder="Название"/>
        </UFormGroup>
        <UFormGroup label="Цена"      class="w-full" name="price">
          <UInput type="number" size="xl" v-model="state.price" placeholder="Цена"/>
        </UFormGroup>
        <UFormGroup label="Артикул"   class="w-full" name="vendorCode">
          <UInput size="xl" v-model="state.vendor_code" placeholder="Артикул"/>
        </UFormGroup>
        <UFormGroup label="Налог"     class="w-full" name="tax">
          <USelect v-if="taxStatus === 'success'" size="xl" placeholder="Налог" v-model="state.tax" :options="tax"
                   valueAttribute="id" optionAttribute="title"/>
        </UFormGroup>
      </div>
      <div class="flex flex-row gap-4">
        <UFormGroup label="Категория" class="w-full" name="category">
          <USelect size="xl" placeholder="Категория" v-model="state.category" :options="categoryStore.categories.rows"
                   valueAttribute="id" optionAttribute="title"/>
        </UFormGroup>
        <UFormGroup label="Цвет"      class="w-full" v-if="colorStatus==='success'"  name="tag">
          <USelectMenu size="xl" placeholder="Цвет" v-model="state.colors" :options="colors.rows" multiple
                       valueAttribute="id" optionAttribute="title">
            <template #label>
              <div v-if="state.colors.length" class="truncate flex h-6 items-center gap-1">
                <div v-for="color in state.colors"
                     :style="`background-color:`+ colors.rows.find(el => el.id === color).hex"
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
        <UFormGroup label="Теги"      class="w-full" name="tag">
          <USelectMenu size="xl" placeholder="Теги" v-model="state.tag" :options="tagStore.tags" multiple
                       valueAttribute="id" optionAttribute="title"/>
        </UFormGroup>
        <UFormGroup label="Состав"    class="w-full" name="consist">
          <USelectMenu size="xl" placeholder="Состав" v-model="state.consist" :options="productStore.products.rows"
                       multiple valueAttribute="id" optionAttribute="title"/>
        </UFormGroup>
      </div>
      <div class="flex gap-4">

        <UFormGroup label="Может быть в составе товаров"
                    class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                    name="as_consist"
        >
          <UToggle v-model="state.as_consist" />
        </UFormGroup>
        <UFormGroup label="Показывать на витрине"
                    class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                    name="showcase"
                    >
          <UToggle v-model="state.showcase" />
        </UFormGroup>
        <UFormGroup label="Доступен к покупке"
                    class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                    name="active"
                    >
          <UToggle v-model="state.active" />
        </UFormGroup>
        <UFormGroup label="Вычитать со склада"
                    class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                    name="decrease_stock"
                    >
          <UToggle v-model="state.decrease_stock" />
        </UFormGroup>
        <!-- <USelectMultiply v-model="form.tag" :items="tags.rows" multi valueName="id" itemName="title" label="Тег"  />-->
      </div>
      <div class="flex w-full flex-col gap-4 p-4 bg-white ring-1 ring-gray-300 rounded-md">
        <UFormGroup label="Фото" name="photos">
          <ImageLoader v-model="state.photos"/>
        </UFormGroup>
      </div>

      <UButton class="submit-btn mt-5 self-start" type="submit">Создать</UButton>
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
            <NuxtImg  height="100" width="100" style="object-fit: cover; aspect-ratio: 1/1"
                 :src="`/img/product/${row.product_images[0].url}`" />
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
    <div class="flex w-full justify-center mt-10">
      <UPagination
          v-if="products?.count > 1 && Math.ceil(products?.count / pageSize) > 1"
          size="xl"
          v-model="page"
          :page-count="pageSize"
          :total="products?.count"
          :ui="{rounded: 'first:rounded-s-full last:rounded-e-full'}"
          :prev-button="{ icon: 'i-solar-alt-arrow-left-bold-duotone', label:'назад', color: 'gray' }"
          :next-button="{ icon: 'i-solar-alt-arrow-right-bold-duotone', label:'вперед', trailing: true,color: 'gray' }"
      />
    </div>
    <UButton class="self-center mt-5" v-if="Math.ceil(products?.count / pageSize) > 1" type="button" @click="viewMore += 1; console.log(pageSize)">Показать еще{{ viewMore }}</UButton>
  </section>

</template>

<style scoped lang="scss">

</style>