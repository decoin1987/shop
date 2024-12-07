<script lang="ts" setup>
import {useAsyncData, useFetch, useState} from "nuxt/app";
import {ref} from "vue";
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
const { data:category, status, error, pending, refresh, clear } = useFetch(`/api/catalog/category/${route.params.slug}`)
const onSubmit = async () => {
  console.log(123)
  // await categoryStore.updateCategory({
  //   title: state.value.title,
  //   description: state.value.description,
  //   sort: state.value.sort,
  //   parent_id: is_parent.value ? state.value.parent_id : null,
  // })
}

</script>

<template>
  <div v-if="!pending" class="flex flex-col items-start py-4 px-10">
      <h1 class="text-3xl mb-6 font-sans">{{ route.params.slug }}</h1>
      <h1 class="text-3xl mb-6 font-sans">{{ category.title }}</h1>
      <p class="text-sm mb-6 font-sans">{{ category }}</p>
    <UButton @click="refresh">refresh</UButton>
    <UForm :state="state" class="flex w-5/6 flex-col gap-3 pr-7" @submit="onSubmit">
      <div class="flex flex-row gap-2 items-end">
        <UFormGroup class="w-3/6" label="Название категории" name="title">
          <UInput placeholder="Название категории" type="text" v-model="state.title"/>
        </UFormGroup>
        <UFormGroup class="w-2/6" label="Сортировка" name="sort">
          <UInput  v-model="state.sort"/>
        </UFormGroup>
        <div class="flex  flex-row items-end">

          <!--              <UFormGroup  name="is_parent">-->
          <!--                <UCheckbox class="flex p-1 bg-gray-300" label="Добавить в категорию" v-model="is_parent"/>-->
          <!--              </UFormGroup>-->
          <UFormGroup class="w-full" label="Родительская категория" name="parent_id">
            <div class="flex flex-row">
              <USelect :ui="{rounded: 'rounded-r-md'}" v-model="state.parent_id" :options="categoryStore.categories.rows"
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