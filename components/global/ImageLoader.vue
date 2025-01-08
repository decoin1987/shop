<script lang="ts" setup>
import {defineProps, defineEmits, ref, watch, computed} from "vue";
import {useTemplateRef} from "@vue/runtime-core";
import {useFileDialog} from '@vueuse/core'

const emits = defineEmits([
  'update:modelValue'
])

const props = defineProps({
  modelValue: Array,
  req: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Перетащите сюда картинки',
  },
  error: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
const photos: [] = ref(props.modelValue)
// const pathPhotos = ref([])
const delPhoto = (index, photo) => {
  photos.value = photos.value.filter(el => el !== photo)
  console.log(pathPhotos.value)
}
const clearAllPhoto = () => {
  for (let photo of photos.value) {
    delPhoto(0, photo)
  }
  reset()
}
const pathPhotos = computed(() => {
  const photosLink = ref([])
  for (let photo of photos.value) {
    photosLink.value.push(URL.createObjectURL(photo))
  }
  if (photos.value.length < 1) reset()
  console.log(pathPhotos.value)
  console.log(photos.value)
  return photosLink.value
})
watch(photos, () => {
  emits('update:modelValue', photos.value)
})
watch(() => props.modelValue, (newValue) => {
  photos.value = newValue;
});
defineExpose({clearAllPhoto})


const {files, open, reset, onCancel, onChange} = useFileDialog({
  accept: 'image/*',
  multiple: true,
})

onChange((files) => {
  photos.value = [...photos.value, ...files || []]
})
</script>

<template>
  <div>
    <UButton type="button" @click="open">
      Выберите файлы
    </UButton>
    <div v-if="photos?.length" class="bg-cool-200 mt-6 gap-4 flex flex-wrap p-4 w-full">
      <template v-for="(photo, index) in photos" :key="photo">
        <div v-if="photo" style="position: relative; z-index: 0">
          <UButton color="white" variant="ghost" :ui="{ rounded: 'rounded-md'}" class="del-btn" type="button" @click="delPhoto(index, photo)">
            Удалить
          </UButton>
          <img class="rounded-md" style="height: 110px; width: 110px; object-fit: cover;" :src="pathPhotos[index]"
               alt=""/>
        </div>
      </template>
      <slot/>
    </div>
  </div>

</template>

<style scoped lang="scss">

.del-btn {
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  justify-content: center;
  position: absolute;
  transition: opacity 0.1s ease-in-out;
}
.del-btn:hover {
  opacity: 1;
}

</style>