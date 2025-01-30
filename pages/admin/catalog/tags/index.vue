<script lang="ts" setup>
import {useTagStore} from "~/stores/tag.store";
import {computed, ref, watch} from "vue";

const state = ref({
  title: '',
  description: null,
  sort: null,
})



const columns = [
  {
    key: 'id',
  },
  {
    key: 'title',
    label: 'Название',
    sortable: true,
  },
  {
    key: 'description',
    label: 'Описание',
    sortable: true,
  },
  {
    key: 'sort',
    label: 'Сортировка',
    sortable: true,
  },
  // {
  //   key: 'slug',
  //   label: 'Ссылка',
  //   sortable: true,
  // },
  {
    key: 'edit',
    label: 'Редактировать',
  },
  {
    key: 'delete',
    label: 'Удалить',
  },
]
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
    click: () => deleteTag(row.id)
  }]
]

const newTag = ref({})
const selected = ref([])
const isEdit = ref(false)
const q = ref('')


const {data: tags, status: tagStatus, refresh: tagRefresh} = useFetch(`/api/catalog/tags`)
const createTag = async () => {
  useFetch('/api/catalog/tags', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = {
        title: '',
        description: '',
        value: '',
      }
      tagRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteTag = async (data) => {
  useFetch('/api/catalog/tags', {
    method: "DELETE",
    onResponse({request, response, options}) {
      tagRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editTag = (row) => {
  isEdit.value = row.id
  newTag.value.title = row.title
  newTag.value.description = row.description
  newTag.value.sort = row.sort
}
const updateTag = async (row) => {
  useFetch('/api/catalog/tags', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      tagRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      ...newTag.value
    }
  })
}

</script>

<template>
  <section>
    <div class="flex flex-col items-start p-10">
      <h1 class="text-5xl font-medium mb-10">Теги</h1>
      <div class="flex w-full flex-col gap-2 mb-10">
        <UForm :state="state" class="flex flex-col gap-4 p-4 bg-white w-full" @submit="createTag">
          <div class="flex gap-4">
            <UFormGroup size="xs" class="w-2/6 items-center" label="Название" name="title">
              <UInput v-model="state.title" size="lg"/>
            </UFormGroup>
            <UFormGroup size="xs" class="w-2/6 items-center" label="Описание" name="description">
              <UInput v-model="state.description" size="lg"/>
            </UFormGroup>
            <UFormGroup size="xs" class="w-2/6 items-center" label="Сортировка" name="sort">
              <UInput v-model="state.sort" size="lg"/>
            </UFormGroup>
            <UButton type="submit" class="self-end" size="lg" label="Добавить"/>
          </div>
        </UForm>
      </div>
      <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
        <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
      </div>
      <UTable class="w-full"
              v-if="tagStatus === 'success'"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="tags" :columns="columns">
        <template #title-data="{row}">
          <UInput v-model="newTag.title" v-if="isEdit === row.id"/>
          <p v-else>{{ row.title }}</p>
        </template>
        <template #description-data="{row}">
          <UInput v-model="newTag.description" v-if="isEdit === row.id"/>
          <p v-else>{{ row.description }}</p>
        </template>
        <template #sort-data="{row}">
          <UInput v-model="newTag.sort" v-if="isEdit === row.id"/>
          <p v-else>{{ row.sort }}</p>
        </template>
        <template #edit-data="{row}">
          <div class="flex gap-4">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm"
                     @click="isEdit !== row.id ? editTag(row) : updateTag(row)">
              {{ isEdit !== row.id ? 'Редактировать' : 'Сохранить' }}
            </UButton>
            <UButton v-if="isEdit === row.id" @click="isEdit = false" class="bg-malibu-600 hover:bg-malibu-800" size="sm"
                     rounded variant="solid">
              Отменить
            </UButton>
          </div>

        </template>
        <template #delete-data="{row}">
          <UButton @click="deleteTag(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
            Удалить
          </UButton>
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