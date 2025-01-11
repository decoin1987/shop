import {useAsyncData} from "nuxt/app";

export default function useProductColor() {
    const colors = ref(null)
    const mapColors = ref(null)

    async function fetchProductColor(route) {
        try {
            // Здесь может быть реальный запрос к серверу
            colors.value = await $fetch(`/api/catalog/product/${route}/color`)
            // colors.value = colors.value.map(el => el.color_id)
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }

    return { colors, fetchProductColor }
}