<script lang="ts" setup>
import {useRouter} from "nuxt/app";

const router = useRouter()

const goToBack = () => {
  router.push({ path: "/account" })
}



</script>

<template>
  <div>
    <section>
      <div>
        <h1>FAQ</h1>
      </div>

    </section>
  </div>
</template>

<style scoped lang="scss">

</style>