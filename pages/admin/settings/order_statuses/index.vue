<script lang="ts" setup>

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
    key: 'time',
    label: 'Время для выполнения',
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
const newStatus = ref({})
const state = ref({
  title: '',
  description: '',
  time: '',
  value: '',
})

const {data: status, status: statusesStatus, refresh: statusesRefresh} = useFetch(`/api/utils/order_status`)
const createTax = async () => {
  useFetch('/api/utils/order_status', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = {
        title: '',
        description: '',
        time: '',
        value: '',
      }
      statusesRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteStatus = async (data) => {
  useFetch('/api/utils/order_status', {
    method: "DELETE",
    onResponse({request, response, options}) {
      statusesRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editStatus = (row) => {
  isEdit.value = row.id
  newStatus.value.title = row.title
  newStatus.value.description = row.description
  newStatus.value.time = row.time
  newStatus.value.value = row.value
}
const updateStatus = async (row) => {
  useFetch('/api/utils/order_status', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      statusesRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      ...newStatus.value
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
      <UFormGroup size="xs" class="w-2/6 items-center" label="Время выполнения(мин)" name="value">
        <UInput v-model="state.time" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="w-2/6 items-center" label="Значение для интеграции" name="value">
        <UInput v-model="state.value" size="lg"/>
      </UFormGroup>
      <UButton type="submit" class="self-end" size="lg" label="Добавить"/>
    </div>
  </UForm>
      <UTable class="w-full"
              v-if="statusesStatus === 'success'"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="status" :columns="columns">
        <template #title-data="{row}">
          <UInput v-model="newStatus.title" v-if="isEdit === row.id" />
          <p v-else>{{ row.title }}</p>
        </template>
        <template #time-data="{row}">
          <UInput v-model="newStatus.time" v-if="isEdit === row.id" />
          <p v-else>{{ row.time }}</p>
        </template>
        <template #description-data="{row}">
          <UInput v-model="newStatus.description" v-if="isEdit === row.id" />
          <p v-else>{{ row.description }}</p>
        </template>
        <template #value-data="{row}">
          <UInput v-model="newStatus.value" v-if="isEdit === row.id" />
          <p v-else>{{ row.value }}</p>
        </template>
        <template #edit-data="{row}">
          <div class="flex gap-4">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm" @click="isEdit !== row.id ? editStatus(row) : updateStatus(row)">
              {{ isEdit !== row.id ? 'Редактировать' : 'Сохранить' }}
            </UButton>
            <UButton v-if="isEdit === row.id"  @click="isEdit = false" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
              Отменить
            </UButton>
          </div>

        </template>
        <template #delete-data="{row}">
          <UButton @click="deleteStatus(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
            Удалить
          </UButton>
        </template>
      </UTable>
</template>

<style scoped lang="scss">

</style>