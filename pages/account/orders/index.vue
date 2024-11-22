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
      <div class="flex-row" style="align-items: center">
        <IconUButton size="md" @click="goToBack" style="background-color: var(--mine-200); padding: 10px"><IconArrowLeft color="#000"/></IconUButton>
        <h1 style="font-size: 32px">Заказы</h1>
      </div>

    </section>
  </div>
</template>

<style scoped lang="scss">

</style>