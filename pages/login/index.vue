<script lang="ts" setup>
import {useAuthStore} from "~/stores/auth.store";
import {ref} from "vue";

const authStore = useAuthStore()
const state = ref({
  email:'de_coin@mail.ru',
  password:'123123',
})

</script>

<template>
  <UContainer class="w-full">
    <div class="pt-5 pb-10 flex gap-10">
      <UForm class="flex flex-col rounded-md bg-cool-100 p-10 gap-5" style="flex: 1 0" @submit="authStore.useSignIn({...state})">
        <div class="flex  items-baseline gap-2">
          <h1 class="p-0 m-0 text-5xl mb-6">Вход на сайт</h1>
        </div>
        <UFormGroup label="E-mail">
          <UInput v-model="state.email" size="xl" placeholder="Введите адрес вашей электронной почты" />
        </UFormGroup>
        <UFormGroup label="Пароль">
          <UInput  v-model="state.password" size="xl" placeholder="Придумайте пароль для входа на сайт" />
        </UFormGroup>
        <UButton type="submit" label="Войти" class="self-end rounded-full" />
        <UDivider />
        <div class="flex  items-baseline gap-2">
          <span>Нет учетной записи?</span><NuxtLink class="text-red-600" to="/registration">Зарегистрируйтесь на сайте</NuxtLink>
        </div>
      </UForm>
      <div class="" style="flex: 1 0">
        <h2 class="p-0 m-0 text-2xl mb-6">После регистрации вам будут доступны:</h2>
        <ul>
          <li>• Персональные скидки на наши цветы</li>
          <li>• Уведомления о распродажах</li>
          <li>• Сервис "Подписка на цветы"</li>
          <li>• Уведомления в телеграм</li>
          <li>• Заказ букетов через приложение в телеграм</li>
        </ul>
        <!--        <img class="flex" style="height: 500px; width: 500px; object-fit: cover" src="/images/8.jpg" alt="">-->
      </div>
    </div>
  </UContainer>
</template>

<style scoped lang="scss">

</style>