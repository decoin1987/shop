<script lang="ts" setup>
import {useRouter} from "nuxt/app";
const router = useRouter()

const goToBack = () => {
  router.push({ path: "/account" })
}



</script>

<template>
  <div>
    <section class="flex-col gap-8">
      <div class="flex-row" style="align-items: center">
        <IconButton size="md" @click="goToBack" style="background-color: var(--mine-200); padding: 10px"><IconArrowLeft color="#000"/></IconButton>
        <h1 style="font-size: 32px">Избранное</h1>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>