<script lang="ts" setup>
import {defineProps, defineEmits, ref, watch, computed} from "vue";

const emits = defineEmits([
  'update:modelValue'
])

const props = defineProps({
  modelValue: {},
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

const pathPhotos = computed(() => {
  try {
    let photosLink = []
    for (let photo of photos.value) {
      photosLink.push(URL.createObjectURL(photo))
    }
    return photosLink
  } catch (e) {
    console.log(e)
  }
})
const uploadFiles = computed(() => photos.value.length)

const photos: {} = ref(props.modelValue)
const input = ref('')

const readImg = ({currentTarget}: Event & { currentTarget: HTMLInputElement }) => {
  if (currentTarget.files) {
    photos.value = [...photos.value, ...Array.from(currentTarget.files)]
  }
}
const delPhoto = (index, photo) => {
  URL.revokeObjectURL(pathPhotos[index])
  photos.value = photos.value.filter(el => el !== photo)
}

watch(photos, () => {
  emits('update:modelValue', photos.value)
})
watch(() => props.modelValue, (newValue) => {
  photos.value = newValue;
});


</script>

<template>

  <div class="uinput-wrapper">
    <div class="drop-area">
      <input :required="req" ref="input" title="Загрузите ваши изображения" @input="readImg" multiple type="file">
      <p>{{ label }}</p>
      <span v-if="uploadFiles">
        Выбрано файлов: {{ uploadFiles }}
      </span>
      <div v-if="error" class="error-wrapper">
        <span>{{ error }}</span>
      </div>
      <div v-if="description && !error" class="description-wrapper">
        <span>{{ description }}</span>
      </div>
    </div>
    <div v-if="photos?.length" style="display: flex; min-width: 100%; justify-content: flex-start; column-gap: 10px; row-gap: 10px; margin-top: 30px; flex-wrap: wrap">
      <template v-for="(photo, index) in photos" :key="photo">
        <div v-if="photo" style="position: relative; z-index: 0">
          <button class="del-btn" type="button" @click="delPhoto(index, photo)">
            &times;
          </button>
          <img style="height: 110px; width: 110px; object-fit: cover; border-radius: 5px" :src="pathPhotos[index]" alt=""/>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

input {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0;
}

.uinput-wrapper {
  padding: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e1f1f1;
  border: 2px dashed #818383;
  border-radius: 0.5rem;
  flex-grow: 1;
}

.drop-area {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #aaaaaa50;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10%;
  color: #727272;
  position: relative;

  & p {
    font-size: 1.25rem;
    font-weight: 400;
  }
}

.description-wrapper span {
  font-size: 14px;
  color: #727272;
  font-weight: 500;
}

.error-wrapper span {
  font-size: 14px;
  color: #da4545;
  font-weight: 700;
}

.del-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2px;
  right: 2px;
  border-radius: 999px;
  border: none;
  height: 30px;
  width: 30px;
  font-size: 30px;
  padding-bottom: 3px;
  opacity: 80%;
  font-weight: 400;
  line-height: 0;
}

</style>