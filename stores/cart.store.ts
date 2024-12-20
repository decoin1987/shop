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
        const cart = useLocalStorage('cart', [])
        if (cart.value.find((el) => el.id === product.id)) {
            cart.value.find((el) => el.id === product.id).count += 1
        } else {
            cart.value.push({
                ...product,
                count: 1,
                up_sale: [],
            })

        }
    }

    return { addToCart,clearCart}


},)