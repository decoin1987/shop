<script lang="ts" setup>
import {useTagStore} from "~/stores/tag.store";
import {computed, ref, watch} from "vue";

const columns = [
  {
    key: 'id',
  },
  {
    key: 'phone',
    label: 'Телефон',
    sortable: true,
  },
  {
    key: 'created_at',
    label: 'Создан',
    sortable: true,
  },
  {
    key: 'updated_at',
    label: 'Изменен',
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
    click: () => deleteUser(row.id)
  }]
]

const selected = ref([])
const isEdit = ref(false)
const q = ref('')
const newUser = ref('')
const state = ref({})

const {data: user, status: userStatus, refresh: userRefresh} = useFetch(`/api/customers`)
const createUser = async () => {
  useFetch('/api/identity/users', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = {
        title: '',
        description: '',
        value: '',
      }
      userRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteUser = async (data) => {
  useFetch('/api/identity/users', {
    method: "DELETE",
    onResponse({request, response, options}) {
      userRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editUser = (row) => {
  isEdit.value = row.id
  newUser.value.title = row.title
  newUser.value.description = row.description
  newUser.value.sort = row.sort
}
const updateUser = async (row) => {
  useFetch('/api/identity/users', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      userRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      ...newUser.value
    }
  })
}

</script>

<template>
  <section>
    <div class="flex flex-col items-start p-10">
      <h1 class="text-5xl font-medium mb-10">Покупатели</h1>
      <div class="w-full flex px-3 py-3.5 border-b border-t border-gray-200 dark:border-gray-700">
        <UInput variant="none" class="w-full" v-model="q" placeholder="Поиск"/>
      </div>
      <UTable class="w-full"
              v-if="userStatus === 'success'"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="user" :columns="columns"
      >
        <template #created_at-data="{row}">
          <!--            <p>{{ row.role.role.toString(10) }}</p>-->
          <p>{{$dayjs(row.created_at).format('DD-MM-YYYY, HH:MM')}}</p>
        </template>
        <template #updated_at-data="{row}">
          <!--            <p>{{ row.role.role.toString(10) }}</p>-->
          <p>{{$dayjs(row.updated_at).format('DD-MM-YYYY, HH:MM')}}</p>
        </template>
        <template #edit-data="{row}">
          <div class="flex gap-4">
            <UButton class="bg-malibu-600 hover:bg-malibu-800" size="sm"
                     @click="isEdit !== row.id ? editUser(row) : updateUser(row)">
              {{ isEdit !== row.id ? 'Редактировать' : 'Сохранить' }}
            </UButton>
            <UButton v-if="isEdit === row.id" @click="isEdit = false" class="bg-malibu-600 hover:bg-malibu-800" size="sm"
                     rounded variant="solid">
              Отменить
            </UButton>
          </div>

        </template>
        <template #delete-data="{row}">
          <UButton @click="deleteUser(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">
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