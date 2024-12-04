<script lang="ts" setup>
import {useCategoryStore} from "../stores/category.store";
import {object, string, type InferType, boolean, array, number} from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import {reactive} from "@vue/reactivity";
import {ref} from "vue";
import {useFetch} from "nuxt/app";
import {v4 as uuid} from 'uuid'

const schema = object({
  title: string().required('Введите имя'),
  price:number().required('Цена обязательна для заполнения'),
  vendorCode:string().required('Введите артикул'),
  asConsist:boolean(),
  photos:array(),
  category: string().required('Категория обязательна для заполнения'),
  tag: array(),
  consist: array(),
})
type Schema = InferType<typeof schema>
const form = ref()
const state = reactive({
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  // console.log(form.value.clear)
  // form.value.clear()
}

const getProducts = async () => await useFetch('http://localhost:3000/api/admin/products/?'+ doQuery(), {
  onResponse({request, response, options}) {
    pending.value = false
    products.value = JSON.parse(JSON.stringify(response._data))
  },
  onRequest({request, options}) {
    pending.value = true
  },
  onRequestError({request, options, error}) {
    pending.value = false
  },
  onResponseError({request, response, options}) {
    pending.value = false
  },
  method: 'GET',
});

const doCreateProduct = async (event, copy = false, ) => {
  const formData = new FormData()
  console.log(event.data)
  // for await (let img of Array.from(event.data.photos)) {
  //
  //   var filename = `${uuid()}.${img.name.split('.').pop()}`
  //   const file = await new Blob([img], {type: img.type})
  //   formData.append(filename, file);
  // }
  // formData.append('title', event.data.title)
  // formData.append('price', event.data.price)
  // formData.append('vendorCode', event.data.vendorCode)
  // formData.append('asConsist', event.data.asConsist)
  // formData.append('category', event.data.category)
  // formData.append('tag', event.data.tag)
  // formData.append('consist', event.data.consist)
  await useFetch('/api/catalog/product', {
    onResponse({request, response, options}) {
      console.log(response._data)
      // doResetForm()
    },
    onRequest({request, options}) {

    },
    onRequestError({request, options, error}) {

    },
    onResponseError({request, response, options}) {

    },
    method: 'POST',
    body: event.data,
    headers: {
      // 'Content-Type': 'multipart/form-data; boundary=----buket----'
    }
  })
}
</script>

<template>

  <div class="flex flex-col max-w-8xl mx-auto items-start p-10">
    <h1 class="text-5xl font-medium mb-10">Товары</h1>
    <div class="flex w-full flex-col gap-2 mb-10">
      <UForm :schema="schema" :state="state" class="flex flex-row gap-10" @submit.prevent="doCreateProduct">
        <div class="flex flex-col gap-4">
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
            <USelectMenu placeholder="Теги" v-model="state.tag" :options="categoryStore.categories.rows" multiple valueAttribute="id" optionAttribute="title" />
          </UFormGroup>
          <UFormGroup label="Состав" name="consist">
            <USelectMenu placeholder="Состав" v-model="state.consist" :options="categoryStore.categories.rows" multiple valueAttribute="id" optionAttribute="title" />
          </UFormGroup>

          <UFormGroup name="asConsist">
            <UCheckbox v-model="state.asConsist" label="Может быть в составе товаров"/>
          </UFormGroup>

          <UFormGroup label="Фото" name="photos">
            <ImageLoader v-model="state.photos" />
          </UFormGroup>

          <UButton class="submit-btn" type="submit">Создать</UButton>
          <!--                    <USelectMultiply v-model="form.tag" :items="tags.rows" multi valueName="id" itemName="title" label="Тег"  />-->
        </div>

      </UForm>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>