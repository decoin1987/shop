// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useFetch, useRouter, useState} from 'nuxt/app';




export const useProductStore = defineStore('product', () => {
    const {data, refresh, error, pending} = useFetch('/api/product')


})
