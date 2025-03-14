<script  lang="ts" setup>

const state = ref({
  title: '',
  sale: '',
  conditions: [],
})

const conditions = ref([])


</script>

<template>
  <section class="flex flex-col items-start py-8 px-10" style="position: relative">
    <h1 class="text-3xl mb-6 font-sans">Группы пользователей</h1>
    <UForm :state="state" class="p-4 ring-2 ring-gray-300 rounded-lg mt-1 flex w-full flex-col gap-3 mb-10"
           @submit="">
      <div class="flex w-full flex-row gap-4">
        <UFormGroup label="Название"  class="w-full" name="title">
          <UInput size="xl" v-model="state.title" type="text" placeholder="Название"/>
        </UFormGroup>
        <UFormGroup label="Скидка" class="w-full" name="sale">
          <UInput type="number" size="xl" v-model="state.sale" placeholder="Скидка"/>
        </UFormGroup>
        <UFormGroup label="Условия назначения"     class="w-full" name="conditions">
          <USelect size="xl" placeholder="Налог" v-model="state.conditions" :options="conditions"
                   valueAttribute="id" optionAttribute="title"/>
        </UFormGroup>
      </div>
      <UButton class="submit-btn mt-5 self-start" type="submit">Создать</UButton>
    </UForm>
  </section>
</template>

<style scoped lang="scss">

</style>