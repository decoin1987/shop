import {useAsyncData} from "nuxt/app";

export default function useProductConsists() {
    const productsConsist = ref(null)
    const consists = ref([])

    async function fetchProductConsists(route) {
        try {
            // Здесь может быть реальный запрос к серверу
            productsConsist.value = await $fetch(`/api/catalog/product/${route}/consists`)
            // colors.value = colors.value.map(el => el.color_id)
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    async function fetchConsists() {
        try {
            // Здесь может быть реальный запрос к серверу
            consists.value = await $fetch(`/api/catalog/product/productConsists`)
            // colors.value = colors.value.map(el => el.color_id)
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }

    console.log('Состав продукта', consists.value)

    return { productsConsist, fetchProductConsists, fetchConsists, consists }
}