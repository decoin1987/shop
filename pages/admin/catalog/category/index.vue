<script lang="ts" setup>


import {useCategoryStore} from "../stores/category.store";
import {useCartStore} from "../stores/cart.store";
import {useAuthStore} from "../stores/auth.store";
import {computed, ref, watch} from "vue";


const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const cartStore = useCartStore()


const state = ref({
  title: '',
  description: null,
  sort: null,
  parent_id: null,

})
const is_parent = ref(false)

const onSubmit = async () => {
  console.log(123123)
  await categoryStore.createCategory({
    title: state.value.title,
    description: state.value.description,
    sort: state.value.sort,
    parent_id: is_parent.value ? state.value.parent_id : null,
  })
}
const columns = [
  {
    key: 'title',
    label: 'Название',
    sortable: true,
  },
  {
    key: 'descriptions',
    label: 'Описание',
  },
  {
    key: 'sort',
    label: 'Сортировка',
  },
  {
    key: 'slug',
    label: 'Ссылка',
  },
  {
    key: 'actions',
    label: 'Родительская категория',
  },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]

const selected = ref([])
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return categoryStore.categories.rows
  }

  return categoryStore.categories.rows.filter((el) => {
    return Object.values(el).some((el) => {
      return String(el).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
const items = row => [
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
    click: () => categoryStore.deleteCategory(row.id)
  }]
]

</script>

<template>
  <section>
    {{selected}}
    <div class="flex-col gap-6" style="padding: 20px; align-items: flex-start;">
      <h1 style="font-size: 44px">Категории</h1>
      <UButton style="background-color: var(--mine-700)" rounded size="xs" @click="categoryStore.getCategory">Создать
        категорию
      </UButton>
      <div class="flex-col gap-2" style="padding: 20px; background-color: var(--deep-100)">
        {{ state.parent_id }}
        <UForm :state="state" class="flex-col gap-3" @submit="onSubmit">
          <UInput v-model="state.title"/>
          <UTextarea v-model="state.description"/>
          <UInput v-model="state.sort"/>
          <div class="">
            <UCheckbox v-model="is_parent"/>
            <USelect v-model="state.parent_id" :disabled="!is_parent" :options="categoryStore.categories.rows"
                     optionAttribute="title" valueAttribute="id"/>
          </div>
          <button type="submit">12341234</button>
        </UForm>

      </div>
      <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
        <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
      </div>
      <UTable class="w-full"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="filteredRows" :columns="columns">
        <template #sort-data="{row}">
          <div class="flex-row">
            <UInput class="flex gap-3" v-model="row.sort"></UInput><UButton @click="categoryStore.editCategory(row)">Изменить</UButton>
          </div>
        </template>
        <template #actions-data="{row}">
          {{ row.parent?.title }}
        </template>
        <template #edit-data="{row}">
          <UDropdown :items="items(row)">
            <UButton color="black" rounded variant="solid">Редактировать</UButton>
          </UDropdown>
        </template>
      </UTable>
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