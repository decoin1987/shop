<script lang="ts" setup>
import Flicking from "@egjs/vue3-flicking";

const show = ref(true)

const options = {
  preventClickOnDrag: true,
  moveType: 'snap',
  align: 'center',
  threshold: 80,
  iOSEdgeSwipeThreshold: 30,
  circular: false,
  adaptive: false,
  circularFallback: 'bound',
  bound: true,
  renderOnlyVisible: true,
}
</script>

<template>
  <section class="container" style="display: flex;">
    <div style="min-width: 300px; max-width: 50%">
      <img style="object-fit: cover; width: 100%; aspect-ratio: 3/4" src="https://roots-store.ru/upload/images/products/o/e26ef0dad65fde2b512300bd3b92f697_webp.webp" alt="">
    </div>
    <div class="flex-col gap-8" style="min-width: 300px; max-width: 50%; padding: 38px 44px">
      <h1 style="font-size: 44px; line-height: 1">Романтический подарок</h1>
      <div class="">
        <p>Размер букета:</p>
        <div class="flex-row gap-4" style="margin-top: 16px">
          <Button style="border: 1px solid var(--mine-400)" @click="show = false" size="xs" rounded textColor="#ccc" color="transparent">M</Button>
          <Button style="border: 1px solid #ccc" @click="show = false" size="xs" rounded textColor="#ccc" color="transparent">L</Button>
          <Button style="border: 1px solid #ccc" @click="show = false" size="xs" rounded textColor="#ccc" color="transparent">XL</Button>
        </div>
      </div>
      <div class="flex-row gap-3" style="align-items: baseline">
        <p style="font-size: 16px; text-decoration: line-through">
          {{
            numberToRub(12256)
          }}
        </p>
        <p style="font-size: 28px; color: var(--thunderbird-600); font-weight: 500">
          {{ numberToRub(10256) }}
        </p>
      </div>
      <div class="flex-row gap-2">
        <template v-if="show === true">
          <Button @click="show = false" rounded color="#000">Добавить в корзину</Button>
        </template>
        <template v-if="show===false">
          <IconButton>
            <IconMinus color="#000" />
          </IconButton>
          <Input style="width: 80px" />
          <IconButton>
            <IconPlus color="#000" />
          </IconButton>
          <IconButton @click="show = true" size="md" style="padding: 3px">
            <IconTrash color="#00000050" />
          </IconButton>
        </template>

      </div>
      <div class="">
        <h2>Вазы для вашего букета:</h2>
        <div class="flex-col" style="">
          <Flicking :options="options">
            <article  v-for="i in 10" :key="i" class="panel">
              <div class="" style="background-color: #6a6b70; flex: 1 1">
                <h1>хуй</h1>
              </div>

            </article>
            <!--      <template #viewport>-->
            <!--        <span class="item-inside-viewport"></span>-->
            <!--        <span class="item-inside-viewport"></span>-->
            <!--      </template>-->
          </Flicking>
        </div>

      </div>
      <div class="">
        <h2>Милые приятности:</h2>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss">

.panel {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  height: 150px;
  width: 150px;
}

</style>