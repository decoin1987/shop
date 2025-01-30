import {useAsyncData} from "nuxt/app";

export default function useProductTags() {
    const tagsInProduct = ref(null)

    async function fetchProductTags(route) {
        try {
            // Здесь может быть реальный запрос к серверу
            tagsInProduct.value = await $fetch(`/api/catalog/product/${route}/tags`)
            // colors.value = colors.value.map(el => el.color_id)
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }

    return { tagsInProduct, fetchProductTags }
}