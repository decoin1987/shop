<script lang="ts" setup>
import {useRouter} from "nuxt/app";
import {useAuthStore} from "../../../stores/auth.store";

const router = useRouter()
const isOpen = ref(false)


const goToBack = () => {
  router.push({ path: "/account" })
}

const state = ref({
  email: 'admin',
  password: 'admin',
  new_password: 'admin',
})

const onSubmit = async () => {
  await $fetch(`/api/identity/users/change`, {
    method: 'PUT',
    onResponse() {
      console.log("update password")
    },
    body: {
      ...state.value
    }
  })
}


</script>

<template>
  <div class="w-full">
    <section class="flex flex-col gap-10">
      <div class="flex-row" style="align-items: center">
<!--        <IconButton size="md" color="bg-cool-300" @click="goToBack" style="padding: 10px"><IconArrowLeft color="#000"/></IconButton>-->
        <h1 style="font-size: 32px">Профиль</h1>
      </div>
      <UButton class="self-start rounded-full">Удалить профиль</UButton>
      <UButton class="self-start  rounded-full" type="button"  @click="isOpen = !isOpen">Сменить пароль</UButton>
      <UModal v-model="isOpen" prevent-close>
        <div class="flex flex-col p-4 gap-4">
          <h1 class="text-2xl">Изменение пароля</h1>
          <UForm class="flex flex-col gap-4" @submit="onSubmit">
            <UFormGroup label="E-mail">
              <UInput v-model="state.email" size="xl" placeholder="Введите адрес вашей электронной почты" />
            </UFormGroup>
            <UFormGroup label="Пароль">
              <UInput  v-model="state.password" size="xl" placeholder="Придумайте пароль для входа на сайт" />
            </UFormGroup>
            <UFormGroup label="Новый пароль">
              <UInput  v-model="state.new_password" size="xl" placeholder="Придумайте пароль для входа на сайт" />
            </UFormGroup>
          </UForm>
          <div class="flex gap-4 w-full justify-end">
            <UButton class="self-start  rounded-full" type="button" color="gray"  @click="isOpen = false">Отмена</UButton>
            <UButton class="self-start  rounded-full" type="button" color="black" @click="onSubmit">Изменить пароль</UButton>
          </div>
        </div>
      </UModal>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>