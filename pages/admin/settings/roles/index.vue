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
    key: 'read',
    label: 'Чтение',
    sortable: true,
  },
  {
    key: 'change',
    label: 'Редактирование',
    sortable: true,
  },
  {
    key: 'create',
    label: 'Создание',
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
const newRole = ref({})
const state = ref({
  title: '',
  read: true,
  change: false,
  create: false,
})

const {data: role, status: roleStatus, refresh: roleRefresh} = useFetch(`/api/utils/roles`)
const createRole = async () => {
  useFetch('/api/utils/roles', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = {
        title: '',
        read: true,
        change: false,
        create: false,
      }
      roleRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteRole = async (data) => {
  useFetch('/api/utils/roles', {
    method: "DELETE",
    onResponse({request, response, options}) {
      roleRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editRole = (row) => {
  isEdit.value = row.id
  newRole.value.title = row.title
  newRole.value.read = row.read
  newRole.value.change = row.change
  newRole.value.create = row.create
}
const updateRole = async (row) => {
  useFetch('/api/utils/roles', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      roleRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      ...newRole.value
    }
  })
}
</script>

<template>
  <UForm :state="state" class="flex flex-col gap-4 p-4 bg-white w-full" @submit="createRole">
    <div class="flex gap-4">
      <UFormGroup size="xs" class="items-center" label="Название" name="title">
        <UInput v-model="state.title" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="items-center flex gap-2  ring-1 p-2 rounded-md bg-white ring-gray-300 shadow" label="Чтение" name="title">
        <UToggle v-model="state.read" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="items-center flex gap-2  ring-1 p-2 rounded-md bg-white ring-gray-300 shadow" label="Редактирование" name="title">
        <UToggle v-model="state.change" size="lg"/>
      </UFormGroup>
      <UFormGroup size="xs" class="items-center flex gap-2  ring-1 p-2 rounded-md bg-white ring-gray-300 shadow" label="Создание" name="title">
        <UToggle v-model="state.create" size="lg"/>
      </UFormGroup>
      <UButton type="submit" class="self-end" size="lg" label="Добавить"/>
    </div>
  </UForm>
      <UTable class="w-full"
              v-if="roleStatus === 'success'"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="role" :columns="columns">
        <template #title-data="{row}">
          <UInput v-model="newRole.title" v-if="isEdit === row.id" />
          <p v-else>{{ row.title }}</p>
        </template>
        <template #read-data="{row}">
          <UToggle v-model="newRole.read" v-if="isEdit === row.id" />
          <template v-else>
            <UToggle disabled v-model="row.read" />
          </template>
        </template>
        <template #change-data="{row}">
          <UToggle v-model="newRole.change" v-if="isEdit === row.id" />
          <template v-else>
            <UToggle disabled v-model="row.change" />
          </template>
        </template>
        <template #create-data="{row}">
          <UToggle v-model="newRole.create" v-if="isEdit === row.id" />
          <template v-else>
            <UToggle disabled v-model="row.create" />
          </template>
        </template>
        <template #description-data="{row}">
          <UInput v-model="newRole.description" v-if="isEdit === row.id" />
          <p v-else>{{ row.description }}</p>
        </template>
        <template #value-data="{row}">
          <UInput v-model="newRole.value" v-if="isEdit === row.id" />
          <p v-else>{{ row.value }}</p>
        </template>
        <template #edit-data="{row}">
          <div class="flex gap-4">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm" @click="isEdit !== row.id ? editRole(row) : updateRole(row)">
              {{ isEdit !== row.id ? 'Редактировать' : 'Сохранить' }}
            </UButton>
            <UButton v-if="isEdit === row.id"  @click="isEdit = false" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
              Отменить
            </UButton>
          </div>

        </template>
        <template #delete-data="{row}">
          <UButton @click="deleteRole(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
            Удалить
          </UButton>
        </template>
      </UTable>
</template>

<style scoped lang="scss">

</style>