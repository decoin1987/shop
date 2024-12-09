<script lang="ts" setup>
import {useAsyncData, useFetch, useRequestHeaders, useState} from "nuxt/app";
import {computed, ref, shallowRef} from "vue";
import {useCategoryStore} from "../stores/category.store"

const slug = ref('')

const state = ref({
  title: '',
  description: null,
  sort: null,
  parent_id: null,

})

const route = useRoute()
const categoryStore = useCategoryStore()

const onSubmit = async () => {
  console.log(123)
}
const {
  data: product,
  refresh: productRefresh,
  pending: productPending
} = useFetch(`/api/catalog/product/${route.params.id}`)
const {
  data: images,
  pending: imagePending,
  refresh: imageRefresh
} = useFetch(`/api/catalog/product/${route.params.id}/images`)
const {data: tags, pending: tagPending, refresh: tagRefresh} = useFetch(`/api/catalog/product/${route.params.id}/tags`)

const delImg = async (itemId: string) => {
  console.log(itemId)
  const {data, pending, error, refresh} = useFetch(`/api/catalog/product/${route.params.id}/images`, {
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


</script>

<template>
  <!--  {{data}}-->

  <div class="flex flex-col items-start py-4 px-10">
    {{ route.params.id }}
    <h1 class="text-3xl mb-6 font-sans">{{ product?.title }}</h1>
    <UButton @click="imageRefresh()">refresh</UButton>
    <div class="">
      <UButton v-for="item in tags">{{ item.tag.title }}</UButton>
    </div>
    <div class="flex flex-row gap-3">

      <div v-for="img in images" :key="img.id" class="flex flex-col">
        <img width="100px" height="100px"
             style="aspect-ratio: 1/1; object-fit: cover"

             :src="`/img/product/${img.url}`"
             alt=""

        >
        <UButton @click="delImg(img.id)" label="delete"/>
      </div>


    </div>
    <UForm :state="state" class="flex w-5/6 flex-col gap-3 pr-7" @submit="onSubmit">
      <div class="flex flex-row gap-2 items-end">
        <UFormGroup class="w-3/6" label="Название категории" name="title">
          <UInput placeholder="Название категории" type="text" v-model="state.title"/>
        </UFormGroup>
        <UFormGroup class="w-2/6" label="Сортировка" name="sort">
          <UInput v-model="state.sort"/>
        </UFormGroup>
        <div class="flex  flex-row items-end">

          <!--<UFormGroup  name="is_parent">-->
          <!--<UCheckbox class="flex p-1 bg-gray-300" label="Добавить в категорию" v-model="is_parent"/>-->
          <!--</UFormGroup>-->
          <UFormGroup class="w-full" label="Родительская категория" name="parent_id">
            <div class="flex flex-row">
              <USelect :ui="{rounded: 'rounded-r-md'}" v-model="state.parent_id"
                       :options="categoryStore.categories.rows"
                       optionAttribute="title" valueAttribute="id"/>
            </div>

          </UFormGroup>
        </div>
      </div>

      <UTextarea placeholder="Описание" v-model="state.description"/>

      <UButton size="md" type="submit" class="self-start">
        Создать категорию
      </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss">

</style>