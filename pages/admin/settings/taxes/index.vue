<script lang="ts" setup>
import {useFetch} from "nuxt/app";

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
    key: 'value',
    label: 'Значение для интеграции',
    sortable: true,
  },
  {
    key: 'edit',
    label: 'Редактировать',
  },
  {
    key: 'delete',
    label: 'Удалить',
  },
]
const selected = ref([])
const isEdit = ref(false)
const newTax = ref({})
const state = ref({
  title: '',
  description: '',
  value: '',
})

const {data: tax, status: taxStatus, refresh: taxRefresh} = useFetch(`/api/utils/taxes`)
const createTax = async () => {
  useFetch('/api/utils/taxes', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = {
        title: '',
        description: '',
        value: '',
      }
      taxRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteTax = async (data) => {
  useFetch('/api/utils/taxes', {
    method: "DELETE",
    onResponse({request, response, options}) {
      taxRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editTax = (row) => {
  isEdit.value = row.id
  newTax.value.title = row.title
  newTax.value.description = row.description
  newTax.value.value = row.value
}
const updateTax = async (row) => {
  useFetch('/api/utils/taxes', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      taxRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      ...newTax.value
    }
  })
}
</script>

<template>
  <UForm :state="state" class="flex flex-col gap-4 p-4 bg-white w-full" @submit="createTax">
    <div class="flex gap-4">
      <UFormGroup size="xs" class="w-2/6 items-center" label="Название" name="title">
        <UInput v-model="state.title" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="w-2/6 items-center" label="Описание" name="description">
        <UInput v-model="state.description" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="w-2/6 items-center" label="Значение для интеграции" name="value">
        <UInput v-model="state.value" size="lg"/>
      </UFormGroup>
      <UButton type="submit" class="self-end" size="lg" label="Добавить"/>
    </div>
  </UForm>
      <UTable class="w-full"
              v-if="taxStatus === 'success'"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="tax?.rows" :columns="columns">
        <template #title-data="{row}">
          <UInput v-model="newTax.title" v-if="isEdit === row.id" />
          <p v-else>{{ row.title }}</p>
        </template>
        <template #description-data="{row}">
          <UInput v-model="newTax.description" v-if="isEdit === row.id" />
          <p v-else>{{ row.description }}</p>
        </template>
        <template #value-data="{row}">
          <UInput v-model="newTax.value" v-if="isEdit === row.id" />
          <p v-else>{{ row.value }}</p>
        </template>
        <template #edit-data="{row}">
          <div class="flex gap-4">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm" @click="isEdit !== row.id ? editTax(row) : updateTax(row)">
              {{ isEdit !== row.id ? 'Редактировать' : 'Сохранить' }}
            </UButton>
            <UButton v-if="isEdit === row.id"  @click="isEdit = false" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
              Отменить
            </UButton>
          </div>

        </template>
        <template #delete-data="{row}">
          <UButton @click="deleteTax(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
            Удалить
          </UButton>
        </template>
      </UTable>
</template>

<style scoped lang="scss">

</style>