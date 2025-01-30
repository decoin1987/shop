import {useAsyncData} from "nuxt/app";

export default function useProductColor() {
    let colorsInProduct = ref(null)

    async function fetchProductColor(route) {
        console.log(route)
        try {
            // Здесь может быть реальный запрос к серверу
            colorsInProduct.value = await $fetch(`/api/catalog/product/${route}/color`)
            // colors.value = colors.value.map(el => el.color_id)
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }

    return { colorsInProduct, fetchProductColor }
}