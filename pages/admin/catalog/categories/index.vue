<script lang="ts" setup>
//@ts-nocheck
import {useCategoryStore} from "~/stores/category.store"
import {computed, ref, watch} from "vue";


const categoryStore = useCategoryStore()

const state = ref({
  title: '',
  description: null,
  sort: null,
  parent_id: null,

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
      key: 'is_upsale',
      label: 'Категория для допродаж',
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
  // if (!q.value) {
  //   return categoryStore.categories.rows
  // }
  //
  // return categoryStore.categories.rows.filter((el) => {
  //     return String(el.title).toLowerCase().includes(q.value.toLowerCase())
  // })
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
    <div class="flex flex-col items-start py-4 px-10">
      <h1 class="text-3xl mb-6 font-sans">Категории</h1>
      <div class="flex w-full flex-row mb-10">
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
                  <UButton icon="i-solar-add-folder-linear" size="sm" @click="is_parent = !is_parent" :ui="{rounded: 'rounded-l-md'}" :color="is_parent?'black':'white'" />
                  <USelect :ui="{rounded: 'rounded-r-md'}" v-model="state.parent_id" :disabled="!is_parent" :options="categoryStore.categories.rows"
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
        <div class="rounded-lg self-start w-1/6 bg-gray-200 p-5">
          Всего категорий: {{categoryStore.categories.count}}
        </div>
      </div>
      <div class="w-full items-center flex px-4 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
        <UCheckbox v-model="p" label="Только&nbsp;родительские" />
        <UDivider orientation="vertical" class="self-stretch mx-4"/>
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
            <UInput class="max-w-20" v-model="row.sort" />
            <UButton size="xs" icon="i-lets-icons-check-fill" color="black" @click="categoryStore.editCategory(row)" />
          </div>
        </template>
        <template #actions-data="{row}">
          {{ row.parent?.title }}
        </template>
        <template #edit-data="{row}">
          <UDropdown :items="items(row)">
            <UButton color="black" size="sm" rounded variant="solid">Редактировать</UButton>
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