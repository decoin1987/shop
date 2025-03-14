<script lang="ts" setup>
//@ts-nocheck
import {useCategoryStore} from "~/stores/category.store"
import {computed, ref, watch, watchEffect} from "vue";



const categoryStore = useCategoryStore()

const state = ref({
  title: '',
  description: undefined,
  parent_id: undefined,
  is_upsale: false,
  show_menu: false,
  raw_tags: [],
  html_meta: undefined,
  html_keywords: undefined,
  html_title: undefined,
  description: undefined,
  sort: 500,
})
const is_parent = ref(false)
const onSubmit = async () => {
  await categoryStore.createCategory({
    title: state.value.title,
    description: state.value.description,
    sort: state.value.sort,
    parent_id: is_parent.value ? state.value.parent_id : null,
  })
}

const selected = ref([])
const updateState = ref({
  parent_id: undefined,
  is_upsale: undefined,
  show_menu: undefined,
})
const is_update_parent = ref(false)
const onUpdateSubmit = async (data) => {
  const categoryIds = selected.value.map(el => el.id)
  // const parent_id
  // const is_upsale
  // const show_menu
  await categoryStore.updateCategoryBulk({
    data: {
      ...data.data
    },
    ids: categoryIds
  })
  selected.value = []
  updateState.value = {
    parent_id: undefined,
    is_upsale: undefined,
    show_menu: undefined,
  }
  update_show_menu.value = false
  update_parent_id.value = false
  update_is_upsale.value = false
}

const q = ref('')
const p = ref(false)
const filteredRows = computed(() => {
  if (!p.value) {
    if (!q.value) {
      return categoryStore.categories.rows
    }
    return categoryStore.categories.rows.filter((el) => {
      return String(el.title).toLowerCase().includes(q.value.toLowerCase())
    })
  } else {
    if (!q.value) {
      console.log(categoryStore.categories.rows[0])
      return categoryStore.categories.rows.filter(el => !el.parent_id)
    }
    return categoryStore.categories.rows.filter(el => !el.parent_id).filter((el) => {
      return String(el.title).toLowerCase().includes(q.value.toLowerCase())
    })
  }
})

const items = (row) => [
  [
    // {
    //   label: 'Изменить',
    //   icon: 'i-heroicons-pencil-square-20-solid',
    //   click: () => console.log('Edit', row.id)
    // },
    {
      label: 'Скопировать',
      icon: 'i-heroicons-document-duplicate-20-solid',
      click: () => categoryStore.copyCategory(row.id)
    }],
  // [{
  //   label: 'Переместить',
  //   icon: 'i-heroicons-arrow-right-circle-20-solid'
  // }]
  , [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => categoryStore.deleteCategory([row.id])
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
  // {
  //   key: 'descriptions',
  //   label: 'Описание',
  // },
  {
    key: 'actions',
    label: 'Родительская категория',
  },
  {
    key: 'sort',
    label: 'Сортировка',
    sortable: true,
  },
  {
    key: 'is_upsale',
    label: 'Категория для допродаж',
    sortable: true,
  },
  {
    key: 'show_menu',
    label: 'Показывать в меню',
    sortable: true,
  },
  {
    key: 'slug',
    label: 'Ссылка',
  },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]

const update_show_menu = ref(false)
const update_parent_id = ref(false)
const update_is_upsale = ref(false)
watchEffect([update_show_menu, update_parent_id, update_is_upsale], () => {
  if (update_show_menu.value === false) {
    update_show_menu.value = false
    delete updateState.value.show_menu
  } else if (update_show_menu.value === true) {
    updateState.value.show_menu = false
  }
  if (update_parent_id.value === false) {
    is_update_parent.value = false
    delete updateState.value.parent_id
  } else if (update_parent_id.value === true) {
    updateState.value.parent_id = null
  }
  if (update_is_upsale.value === false) {
    update_is_upsale.value = false
    delete updateState.value.is_upsale
  } else if (update_is_upsale.value === true) {
    updateState.value.is_upsale = false
  }
})

</script>

<template>
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
      <h1 class="text-3xl mb-6 font-sans">Категории</h1>
      <UForm :state="state" class="p-4 ring-2 ring-gray-300 rounded-lg mt-1 flex w-full flex-col gap-3 mb-10"
             @submit="onSubmit">
        <UFormGroup size="xs" class="w-full items-center" label="Название&nbsp;категории" name="title">
          <UInput size="xl" placeholder="Название категории" type="text" v-model="state.title"/>
        </UFormGroup>
        <UFormGroup size="xs" class="w-full" label="Описание категории" name="title">
          <UTextarea size="xl"  placeholder="Описание" v-model="state.description"/>
        </UFormGroup>
        <div class="flex flex-row gap-2 w-full">
          <UFormGroup
              class="items-center flex justify-start gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
              label="Родительская категория" name="parent_id">
            <div class="flex flex-row items-center gap-3">
              <UToggle v-model="is_parent"/>
              <USelect size="lg" v-model="state.parent_id" :disabled="!is_parent" :options="categoryStore.categories.rows"
                       optionAttribute="title" valueAttribute="id"/>
            </div>
          </UFormGroup>
          <UFormGroup class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                      label="Показывать в&nbsp;меню" name="show_menu">
            <UToggle v-model="state.show_menu"/>
          </UFormGroup>
          <UFormGroup class="items-center flex gap-2  ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                      label="Каталог допродаж" name="is_upsale">
            <UToggle v-model="state.is_upsale"/>
          </UFormGroup>
          <UFormGroup class="items-center flex gap-2 ring-1 p-2 rounded-md bg-white ring-gray-300 shadow"
                      label="Сортировка" name="sort">
            <UInput size="lg" v-model="state.sort"/>
          </UFormGroup>
        </div>
        <UButton class="submit-btn mt-5 self-start" type="submit">
          Создать категорию
        </UButton>
      </UForm>
      <!-- Search section -->
      <div class="w-full items-center bg-white flex px-4 py-3.5 border-b border-t border-gray-200 dark:border-gray-700 mb-5">
        <UCheckbox v-model="p" label="Только&nbsp;родительские"/>
        <UDivider orientation="vertical" class="self-stretch mx-4"/>
        <UInput size="xl" variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
      </div>
      <!-- Table section -->
      <UTable class="w-full"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="filteredRows" :columns="columns">
        <template #title-data="{row}">
          <div class="flex flex-row no-wrap gap-2">
            <NuxtLink :to="`/admin/catalog/categories/${row.slug}`">{{ row.title }}</NuxtLink>
          </div>
        </template>
        <template #sort-data="{row}">
          <div class="flex flex-row no-wrap">
            <UInput class="max-w-20" v-model="row.sort"/>
            <UButton size="xs" icon="i-lets-icons-check-fill" color="green" @click="categoryStore.editCategory(row)"/>
          </div>
        </template>
        <template #is_upsale-data="{row}">
          <div class="flex flex-row no-wrap gap-2">
            <UToggle color="green" class="max-w-20" v-model="row.is_upsale" @click="categoryStore.editCategory(row)"/>
            <!--            <UButton size="xs" icon="i-lets-icons-check-fill" color="black" @click="categoryStore.editCategory(row)"/>-->
          </div>
        </template>
        <template #show_menu-data="{row}">
          <div class="flex flex-row no-wrap gap-2">
            <UToggle color="green" class="max-w-20" v-model="row.show_menu" @click="categoryStore.editCategory(row)"/>
            <!--            <UButton size="xs" icon="i-lets-icons-check-fill" color="black" @click="categoryStore.editCategory(row)"/>-->
          </div>
        </template>
        <template #actions-data="{row}">
          {{ row.parent?.title }}
        </template>
        <template #edit-data="{row}">
          <UDropdown :items="items(row)">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">Редактировать</UButton>
          </UDropdown>
        </template>
      </UTable>
      <!-- Bulk actions section -->
      <div v-if="!!selected.length" class="bg-white border-t-2 border-gray-400 flex w-full flex-row items-end p-2 mb-3"
           style="position: sticky; bottom:0px">
        <UForm :state="updateState" @submit="onUpdateSubmit" class="flex flex-row gap-3 px-0 bg-gray-100">
          <UFormGroup name="show_menu">
            <div class="border px-5 flex h-14 items-center gap-3">
              <label class="flex gap-2 items-center">
                <UCheckbox color="malibu" v-model="update_show_menu"/>
                <span class="text-xs">Показывать<br>в&nbsp;меню</span>
              </label>
              <span>-</span>
              <UToggle color="green" :disabled="!update_show_menu" v-model="updateState.show_menu"/>
            </div>
          </UFormGroup>

          <UFormGroup name="is_upsale">
            <div class="border px-5 flex h-14 items-center gap-3">
              <label class="flex gap-2 items-center">
                <UCheckbox color="malibu" v-model="update_is_upsale"/>
                <span class="text-xs">Категория<br>для&nbsp;допродаж</span>
              </label>
              <span>-</span>
              <UToggle color="green" :disabled="!update_is_upsale" v-model="updateState.is_upsale"/>
            </div>
          </UFormGroup>

          <UFormGroup name="parent_id">
            <div class="border pl-3 pr-4 flex h-14 items-center gap-3">
              <label class="flex gap-2 items-center">
                <UCheckbox color="malibu" v-model="update_parent_id"/>
                <span class="text-xs">Родительская<br>категория</span>
              </label>
              <div class="flex flex-row gap-3">
                <USelect v-model="updateState.parent_id" :disabled="!update_parent_id"
                         :options="categoryStore.categories.rows"
                         optionAttribute="title" valueAttribute="id"/>
              </div>
            </div>
          </UFormGroup>
          <UButton size="md" type="submit">Изменить</UButton>
        </UForm>
        <UButton class="ml-auto self-stretch" color="black" size="md"
                 @click="categoryStore.deleteCategory(selected.map(el => el.id))">Удалить
        </UButton>

      </div>
  </section>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}

tr {
  border-bottom: 1px solid #000;
}

tr:last-child {
  border-bottom: 0px solid #000;
}

td {
  padding: 3px;

  border-left: 1px solid #000;
}

td:first-child {
  border-left: 0px solid #000;
}

input, textarea {
  font-size: 18px;
  padding: 5px 15px;
}
</style>