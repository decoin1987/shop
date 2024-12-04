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
    <div class="flex flex-col max-w-8xl mx-auto items-start p-10">
      <h1 class="text-5xl font-medium mb-10">Категории</h1>
      <div class="flex w-full flex-col gap-2 mb-10">
        {{ state }}
        <UForm :state="state" class="flex flex-col gap-3" @submit="onSubmit">
          <div class="flex flex-row gap-2">
            <UInput placeholder="Название категории" class="w-3/6" v-model="state.title"/>
            <UInput class="w-1/6" v-model="state.sort"/>
            <div class="flex flex-row gap-2  items-center">
              <UCheckbox label="Добавить в категорию"  v-model="is_parent"/>
              <USelect v-model="state.parent_id" :disabled="!is_parent" :options="categoryStore.categories.rows"
                       optionAttribute="title" valueAttribute="id"/>
            </div>
          </div>

          <UTextarea placeholder="Описание" v-model="state.description"/>

          <UButton size="md" type="submit" class="self-start">
            Создать категорию
          </UButton>
        </UForm>

      </div>
      <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
        <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
      </div>
      <UTable class="w-full"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'black', variant: 'solid', size: 'xs', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="filteredRows" :columns="columns">
        <template #title-data="{row}">
          <div class="flex flex-row no-wrap gap-2">
            <NuxtLink :to="`/admin/catalog/categories/${row.slug}`">{{row.title}}</NuxtLink>
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