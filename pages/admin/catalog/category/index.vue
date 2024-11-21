<script lang="ts" setup>


import {useCategoryStore} from "../stores/category.store";
import {useCartStore} from "../stores/cart.store";
import {useAuthStore} from "../stores/auth.store";
import {ref} from "vue";
import {useTemplateRef} from "@vue/runtime-core";

const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const title = ref('')
const description = ref(null)
const sort = ref(null)
const parent_id = ref(null)

const slider = useTemplateRef('newTitle')
</script>

<template>
  <section>
    <div class="flex-col gap-6" style="padding: 20px; align-items: flex-start;">
      <h1 style="font-size: 44px">Категории</h1>
      <Button style="background-color: var(--mine-700)" rounded size="xs" @click="categoryStore.getCategory">Создать категорию</Button>
      <div class="flex-col" style="padding: 20px; background-color: var(--deep-100)">
          <input v-model="title">
          <textarea v-model="description" />
          <input v-model="sort">
          <select v-model="parent_id">
            <option :value="null" selected>Без категории</option>
            <option  v-for="item in categoryStore.categories.rows" :value="item.id" :key="item.id">{{item.title}}</option>
          </select>
        <button @click.prevent="categoryStore.createCategory({title, description, sort, parent_id})">12341234</button>
      </div>
      <table>
        <tr v-if="categoryStore.categories?.rows[0]">
          <td v-for="name in Object.keys(categoryStore.categories.rows[0])">{{name}}</td>
        </tr>
        <tr v-for="object in categoryStore.categories.rows">
          <td v-for="item in object">
            <p>{{item}}</p>
          </td>
          <td><button @click="categoryStore.deleteCategory(object.id)">Удалить</button></td>
          <td><button @click="">Обновить</button></td>
        </tr>
      </table>
      <pre>
      {{ slider }}
    </pre>
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