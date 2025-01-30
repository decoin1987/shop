//@ts-nocheck
import {defineStore} from "pinia";
import {ref} from "vue";
import { useStorage, useLocalStorage } from '@vueuse/core';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
type product = {
    count: number,
    upSale: Object
}

export const useCartStore = defineStore('cart', () => {

    const clearCart = () => {
        const cart = useLocalStorage('cart', [])
        cart.value = []
    }

    const addToCart = (product): Array => {
        const addedProduct = {
            id: product.id,
            title: product.title,
            count: product.count,
            price: product.price,
            slug: product.slug,
            tax_id: product.tax.value,
            product_images: product.product_images[0]?.url || null,
        }
        const cart = useLocalStorage('cart', [])
        if (cart.value.find((el) => el.id === addedProduct.id)) {
            cart.value.find((el) => el.id === addedProduct.id).count += 1
        } else {
            cart.value.push({
                ...addedProduct,
                count: 1,
                up_sale: [],
            })

        }
    }

    return { addToCart,clearCart}


},)