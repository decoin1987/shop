<script lang="ts" setup>
import {useRouter} from "nuxt/app";

const router = useRouter()

const goToBack = () => {
  router.push({ path: "/account" })
}



</script>

<template>
  <div class="w-full">
    <section class="flex flex-col gap-10">
      <div class="flex-col gap-3" style="align-items: center">
        <h1 class="" style="font-size: 32px">Личный кабинет</h1>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>