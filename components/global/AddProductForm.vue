<script  lang="ts" setup>
import {useState, useFetch, useAsyncData} from "nuxt/app";
import {v4 as uuid} from 'uuid'
import {defineProps, defineEmits, ref, watch, computed} from "vue";
import {useCategoryStore} from "~/store/category.store";

const pending = ref(false)
const form  = ref( {
  name: '',
  price:undefined,
  vendorCode:undefined,
  asConsist:false,
  photos:[],
  category: [],
  tag: [],
  consist: [],
})

const emits = defineEmits(['submitted'])

defineProps({
  tags: {},
  products: {},
})

const doResetForm = () => {
  form.value.name = ''
  form.value.price = undefined
  form.value.vendorCode = undefined
  form.value.asConsist = false
  form.value.photos = []
  form.value.category = []
  form.value.tag = []
  form.value.consist = []
}
const categoryStore = useCategoryStore()
const { data: categories } = await useAsyncData('categories',
    () => $fetch('http://localhost:3000/api/admin/categories', {
    }))
categoryStore.set(categories.value)
const category = computed(() => categoryStore.theCategories)

const doCreateProduct = async (copy = false) => {
  const formData = new FormData()
  for await (let img of Array.from(form.value.photos)) {
    var filename = `${uuid()}.${img.name.split('.')[1]}`
    const file = await new Blob([img], {type: img.type})
    formData.append(filename, file);
  }
  formData.append('name', form.value.name)
  formData.append('price', form.value.price)
  formData.append('vendorCode', form.value.vendorCode)
  formData.append('asConsist', form.value.asConsist)
  formData.append('category', form.value.category)
  formData.append('tag', form.value.tag)
  formData.append('consist', form.value.consist)
  await useFetch('http://localhost:3000/api/admin/products', {
    onResponse({request, response, options}) {
      pending.value = false
      doResetForm()
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
    method: 'POST',
    body: formData,
    headers: {
      // 'Content-Type': 'multipart/form-data; boundary=----buket----'
    }
  })
  emits('submitted')
}

</script>

<template>
  <form @submit.prevent="doCreateProduct(true)" style="display: flex; column-gap: 20px">
    <div style="width: 100%">
      <UInput req v-model="form.name" type="text" label="Название" />
      <UInput req v-model="form.price" label="Цена"/>
      <UInput v-model="form.vendorCode" label="Артикул" />
      <USelect req v-model="form.category" :items="category" valueName="id" itemName="name" label="Категория" />
      <USelectMultiply v-model="form.tag" :items="tags.rows" multi valueName="id" itemName="title" label="Тег"  />
      <USelectMultiply v-model="form.consist" :items="products" multi valueName="id" itemName="name" label="Состав"  />
      <UCheckbox v-model="form.asConsist" label="Может быть в составе товаров"/>
      <div>
        <button class="submit-btn" type="submit">Создать</button>
      </div>
    </div>
    <div style="width: 40vw">
      <UImageLoader v-model="form.photos" />
    </div>
  </form>
</template>

<style scoped lang="scss">
.submit-btn {
  margin: 15px 0 ;
  height: 37px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0 20px;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  background-color: cadetblue;
  color: white;
}
</style>