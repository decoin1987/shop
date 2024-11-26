<script lang="ts" setup>
import {useRouter} from "nuxt/app";
import {useAuthStore} from "../../../stores/auth.store";

const router = useRouter()

const goToBack = () => {
  router.push({ path: "/account" })
}


</script>

<template>
  <div class="w-full">
    <section class="flex flex-col gap-10">
      <div class="flex-row" style="align-items: center">
        <IconButton size="md" @click="goToBack" style="background-color: var(--mine-200); padding: 10px"><IconArrowLeft color="#000"/></IconButton>
        <h1 style="font-size: 32px">Профиль</h1>

      </div>
      <UButton class="self-start">Удалить профиль</UButton>



    </section>
  </div>
</template>

<style scoped lang="scss">

</style>