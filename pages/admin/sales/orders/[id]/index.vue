<script lang="ts" setup>
import {useCategoryStore} from "~/stores/category.store";
import {useTagStore} from "~/stores/tag.store";
import {v4 as uuid} from "uuid";
import {useTemplateRef} from "@vue/runtime-core";

const slug = ref('')

const state = ref({
  title: '',
  description: null,
  sort: null,
  parent_id: null,

})
const photos = ref([])
const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const image_loader = useTemplateRef('imageLoader')

const {
  data: product,
  status: productStatus,
  refresh: productRefresh
} = useFetch(`/api/catalog/product/${route.params.id}`)

const {
  data: images,
  pending: imagePending,
  refresh: imageRefresh
} = useFetch(`/api/catalog/product/${route.params.id}/images`)

const {data: tags, pending: tagPending, refresh: tagRefresh} = useFetch(`/api/catalog/product/${route.params.id}/tags`)

const {data: colors, status: colorStatus, refresh: colorRefresh} = useFetch(`/api/utils/colors`)

const {data: tax, status: taxStatus, refresh: taxRefresh} = useFetch(`/api/utils/taxes`)

const delImg = async (itemId: string) => {
  console.log(itemId)
  await $fetch(`/api/catalog/product/${route.params.id}/images`, {
    method: 'DELETE',
    onResponse() {
      imageRefresh()
    },
    body: {
      id: itemId,
      product_id: route.params.id
    }
  })
}
const addImg = async () => {
  console.log(image_loader.value)
  const formData = new FormData()
  for await (let img of Array.from(photos.value)) {
    var filename = `${uuid()}.${img.name.split('.').pop()}`
    const file = await new Blob([img], {type: img.type})
    formData.append(filename, file);
  }
  await $fetch(`/api/catalog/product/${route.params.id}/images`, {
    method: 'POST',
    onResponse() {
      imageRefresh()
      image_loader.value.clearAllPhoto()
    },
    body: formData,
  })
}
const onSubmit = async () => {
  await $fetch(`/api/catalog/product`, {
    method: 'PUT',
    onResponse() {
      productRefresh()
      tagRefresh()
      console.log("update")
    },
    body: {
      ...product.value
    }
  })
}

const links = [
  {
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/admin'
  }, {
    label: 'Товары',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/admin/catalog/products'
  }
]
const nav = [
  {
    label: 'Общее',
    icon: 'i-heroicons-home',
    click: () => router.replace({query: {tab: 'main'}}),
  },
  {
    label: 'Данные',
    icon: 'i-heroicons-home',
    click: () => router.replace({query: {tab: 'data'}}),
  },
  {
    label: 'Изображения',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'images'}}),
  },
  {
    label: 'Связи',
    icon: 'i-heroicons-chart-bar',
    click: () => router.replace({query: {tab: 'links'}}),
  },
  {
    label: 'Акции',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'offers'}}),
  },
  {
    label: 'Опции',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'options'}}),
  },
  {
    label: 'Атрибуты',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'attr'}}),
  },
  {
    label: 'Скидки',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'sales'}}),
  },
  {
    label: 'Бонусы',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'bonuses'}}),
  },
  {
    label: 'Регулярные платежи',
    icon: 'i-heroicons-command-line',
    click: () => router.replace({query: {tab: 'payments'}}),
  },
]

const raw_tag = ref([])
const state_raw = ref({
  title: '',
  value: '',
})

const addRawTag = () => {
  if (!product.value.raw_tag) {
    product.value.raw_tag = []
  }
  if (!!state_raw.value.value && !!state_raw.value.title) {
    product.value.raw_tag.push(
        {
          title: state_raw.value.title,
          value: state_raw.value.value
        }
    )
    state_raw.value.title = ''
    state_raw.value.value = ''
  }
}
const deleteRawTag = (item: any) => {
  product.value.raw_tag = product.value.raw_tag.filter(el => el !== item)
}
</script>

<template>
  <div v-if="productStatus === 'success'" class="flex flex-col items-start py-8 px-10">
    <Breadcrumbs v-if="product?.title"
                 :links="links"
                 :lastLink="{
                    label: product.title,
                    icon: 'i-heroicons-link'
                  }"
    />
    <div class="flex w-full">
      <NuxtImg v-if="images?.[0]" class="self-end mr-5" style="height:110px; aspect-ratio: 1; object-fit: cover" :src="`/img/product/${images[0].url}`" alt=""/>
      <div class="w-full">
        <h1 class="text-3xl mb-6 font-sans">{{ product.title }}</h1>
        <UHorizontalNavigation size="" :links="nav" class="w-full border-b border-gray-500 dark:border-gray-800"/>
      </div>
    </div>

    <template v-if="route.query.tab === 'main' || route.query.tab === undefined">
      <UDivider class="my-6" label="Общее"/>
      <ProductUpdateCommonInfo :product="product" @saveProduct="onSubmit"/>
    </template>
    <template v-if="route.query.tab === 'data'">
      <UDivider class="my-6" label="Данные"/>
      <ProductUpdateDataInfo :product="product" :tag="tags" :tax="tax" :colors="colors"
                             :tagStore="tagStore.tags" :categoryStore="categoryStore.categories"
                             @saveProduct="onSubmit"/>
    </template>
    <template v-if="route.query.tab === 'images'">
      <UDivider class="my-6" label="Изображения"></UDivider>
      <div class="bg-white p-6 w-full">
        <ImageLoader v-model="photos" ref="imageLoader"/>
        <div v-if="!!photos.length" class="flex mt-4 gap-4">
          <UButton color="black" @click="image_loader?.clearAllPhoto">Удалить всё</UButton>
          <UButton type="button" @click="addImg">Сохранить</UButton>
        </div>
      </div>

      <div class="mt-10 flex flex-row gap-5 flex-wrap">
        <div class="flex flex-col w-1/6" v-for="img in images">
          <NuxtImg  style="aspect-ratio: 1; object-fit: cover" :src="`/img/product/${img.url}`" alt="" />
          <UButton size="sm" label="удалить" @click="delImg(img.id)"></UButton>
        </div>
      </div>
    </template>
    <template v-if="route.query.tab === 'links'">
      <UDivider class="my-6" label="Связи"/>
      <ProductUpdateConsists :product="product" :tag="tags" :tax="tax" :colors="colors"
                             :tagStore="tagStore.tags" :categoryStore="categoryStore.categories"
                             @saveProduct="onSubmit"/>
      <!--      <UForm :state="state" class="flex f-full flex-col gap-3" @submit="onSubmit">
              <UInput size="xl" placeholder="Производитель"></UInput>
              <UInput size="xl" placeholder="Главная категория"></UInput>
              <UInput size="xl" placeholder="Показывать в категориях"></UInput>
              <UInput size="xl" placeholder="Фильтры"></UInput>
              <UInput size="xl" placeholder="Магазины"></UInput>
              <UInput size="xl" placeholder="Загрузки"></UInput>
              <UInput size="xl" placeholder="Сопутствующие товары"></UInput>
            </UForm>-->
    </template>
    <template v-if="route.query.tab === 'offers'">
      <UDivider class="my-6" label="Акции"></UDivider>
    </template>
    <template v-if="route.query.tab === 'options'">
      <UDivider class="my-6" label="Опции"></UDivider>
    </template>
    <template v-if="route.query.tab === 'attr'">
      <UDivider class="my-6" label="Атрибуты"/>
      <!--TODO RAW_TAGS-->
      <template v-for="tag in product.raw_tag">
        <div class="flex gap-2 pb-2 mb-3 border-b ">
          <UFormGroup label="Значение атрибута">
            <UInput size="md" v-model="tag.title"/>
          </UFormGroup>
          <UFormGroup label="Текст">
            <UInput size="md" v-model="tag.value"/>
          </UFormGroup>
          <UButton class="self-end" size="md" label="Удалить" @click="deleteRawTag(tag)"/>
        </div>
      </template>
      <template v-for="tag in raw_tag">
        <div class="flex gap-2 pb-2 mb-3 border-b ">
          <UFormGroup label="Значение атрибута">
            <UInput size="md" v-model="tag.title"/>
          </UFormGroup>
          <UFormGroup label="Текст">
            <UInput size="md" v-model="tag.value"/>
          </UFormGroup>
          <UButton class="self-end" size="md" label="Удалить" @click="deleteRawTag(tag)"/>
        </div>
      </template>
      <div class="flex my-3 gap-3">
        <UInput v-model="state_raw.title" size="xl" placeholder="Название"/>
        <UInput v-model="state_raw.value" size="xl" placeholder="Значение"/>
        <UButton size="xl" label="Добавить" @click="addRawTag"></UButton>
      </div>
      <UButton size="xl" @click="onSubmit" label="Сохранить все"/>
    </template>
    <template v-if="route.query.tab === 'sales'">
      <UDivider class="my-6" label="Скидки"></UDivider>
    </template>
    <template v-if="route.query.tab === 'bonuses'">
      <UDivider class="my-6" label="Бонусы"></UDivider>
    </template>
    <template v-if="route.query.tab === 'payments'">
      <UDivider class="my-6" label="Регулярные платежи"></UDivider>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>