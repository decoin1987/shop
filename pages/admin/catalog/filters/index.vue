<script lang="ts" setup>
import {computed, ref} from "vue";

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
  {
    key: 'color',
    label: '',
  },
  {
    key: 'hex',
    label: 'HEX',
  },
  {
    key: 'rgb',
    label: 'RGB',
  },
  // {
  //   key: 'hsl',
  //   label: 'HSL',
  // },
  // {
  //   key: 'hwb',
  //   label: 'HWB',
  // },
  // {
  //   key: 'lab',
  //   label: 'LAB',
  // },
  // {
  //   key: 'xyz',
  //   label: 'XYZ',
  // },
  // {
  //   key: 'hsv',
  //   label: 'HSV',
  // },
  {
    key: 'edit',
    label: 'Редактирование',
  },
]
const state = ref({
  title: '',
  color: '#000000',
})
const rgb = computed(() => {
  return parseHex(state.value.color).join(' ');
})
const hwb = computed(() => {
  return rgb2hwb(rgb.value.split(' ')).map(el => Math.round(el)).join(' ');
})
const hsl = computed(() => {
  return rgb2hsl(rgb.value.split(' ')).map(el => Math.round(el)).join(' ');
})
const lab = computed(() => {
  return rgb2lab(rgb.value.split(' ')).map(el => Math.round(el)).join(' ');
})
const xyz = computed(() => {
  return rgb2xyz(rgb.value.split(' ')).map(el => Math.round(el)).join(' ');
})
const hsv = computed(() => {
  return rgb2hsv(rgb.value.split(' ')).map(el => Math.round(el)).join(' ');
})

const route = useRoute()
const router = useRouter()
const selected = ref([])
const nav = [
  {
    label: 'Цвет',
    icon: 'i-heroicons-home',
    click: () => router.replace({query: {tab: 'color'}}),
  },
  {
    label: 'Размер',
    icon: 'i-heroicons-home',
    click: () => router.replace({query: {tab: 'size'}}),
  },
]
const newColor = ref([])
const isEdit = ref(false)




const {data: colors, status: colorStatus, refresh: colorRefresh} = useFetch(`/api/utils/colors`)
const createColor = async () => {
  useFetch('/api/utils/colors', {
    method: "POST",
    onResponse({request, response, options}) {
      state.value = { title: '', color: '#000000', }
      colorRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {...state.value}
  })
}
const deleteColor = async (data) => {
  useFetch('/api/utils/colors', {
    method: "DELETE",
    onResponse({request, response, options}) {
      colorRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
    },
    body: {id: data.id}
  })
}
const editColor = (row) => {
  isEdit.value = row.id
  newColor.value = row.hex
}
const updateColor = async (row) => {
  useFetch('/api/utils/colors', {
    method: "PUT",
    onResponse({request, response, options}) {
      isEdit.value = false
      colorRefresh()
      if (response._data.statusCode) {
        return console.log(response._data.message)
      }
      return console.log(response._data)
    },
    body: {
      id: row.id,
      color: newColor.value
    }
  })
}
</script>

<template>
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Фильтры</h1>
    <UHorizontalNavigation size="" :links="nav" class="w-full border-b border-gray-500 dark:border-gray-800"/>
    <template v-if="route.query.tab === 'color' || route.query.tab === undefined">
      <UForm :state="state" class="flex flex-col gap-4 p-4 bg-white w-full" @submit="createColor">
        <div class="flex gap-4">
          <UFormGroup size="xs" class="w-2/6 items-center" label="Название" name="title">
            <UInput v-model="state.title" size="lg"/>
          </UFormGroup>
          <UFormGroup size="xs" class="items-center" label="Цвет" name="hex">
            <input class="ring-1 ring-slate-200"  style="display: block" type="color" v-model="state.color">
          </UFormGroup>
          <UButton type="submit" class="self-end" size="lg" label="Добавить"/>
        </div>
        <div class="flex pt-3 gap-4 border-t w-full">
          <pre class="text-sm items-center">HEX: {{ state.color }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">RGB: {{ rgb }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">HSL: {{ hsl }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">HWB: {{ hwb }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">LAB: {{ lab }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">XYZ: {{ xyz }}</pre>
          <UDivider orientation="vertical"></UDivider>
          <pre class="text-sm items-center">HSV: {{ hsv }}</pre>
        </div>
      </UForm>

      <UTable class="w-full"
              v-model="selected"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'white', variant: 'ghost', size: 'sm', square: false, ui: { rounded: 'rounded-full' } }"
              :rows="colors?.rows" :columns="columns">
        <template #edit-data="{row}">
            <UButton @click="deleteColor(row)" class="bg-malibu-600 hover:bg-malibu-800" size="sm" rounded variant="solid">Удалить</UButton>
        </template>
        <template #color-data="{row}">
          <div class="flex gap-3 items-center">
            <div class="ring-1 ring-cool-300" v-if="isEdit !== row.id" :style="`height: 40px; width: 40px; border-radius: 999px; background-color: ${row.hex}`"></div>
            <input class="ring-4 ring-cool-500"  v-if="isEdit === row.id" type="color" v-model="newColor">
            <UButton class="w-28 text-center justify-center" size="sm" @click="isEdit !== row.id ? editColor(row) : updateColor(row)">
              {{ isEdit !== row.id ? 'Изменить' : 'Сохранить' }}
            </UButton>
          </div>
        </template>
      </UTable>
    </template>

    <!-- Bulk actions section -->
<!--    <div v-if="!!selected.length" class="bg-white border-t-2 border-gray-400 flex w-full flex-row items-end p-2 mb-3"
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

    </div>-->
  </section>
</template>

<style scoped lang="scss">
input[type="color"] {
  display: flex;
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 0;
  border-radius: 999px;
}

/* -webkit */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  margin: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 999px;
  padding: 0;
  margin: 0;
}


/* firefox */
input[type=color]::-moz-focus-inner {
  border: none;
  padding: 0;
  border-radius: 999px;
  margin: 0;
}

input[type=color]::-moz-color-swatch {
  border: none;
  border-radius: 999px;
  height: 140px;
  margin: 0;
}
</style>