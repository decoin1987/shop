// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useRouter, useState} from 'nuxt/app';
import {defineTask} from "nitropack/runtime";
import {v4 as uuid} from "uuid";
import {ref, shallowRef} from "vue";


export const useProductStore = defineStore('product', () => {
    const updateProducts = (data) => {
        if (data) {
            products.value = data
        }
    }
    const getProducts = async () => {
        useFetch('/api/catalog/product', {
            onResponse({response}) {
                // console.dir(response._data)
                return updateProducts(response._data)
            },
            method: "GET"
        })
        // return updateCategory(data.value)
    }
    const deleteProduct = async (product) => {
        useFetch('/api/catalog/product', {
            onResponse({response}) {
                // console.dir(response._data)
                return updateProducts(response._data)
            },
            method: "DELETE",
            body: {
                ...product
            }
        })
        // return updateCategory(data.value)
    }
    const createProduct = async (event, copy = false, ) => {
        const formData = new FormData()
        for await (let field of Object.keys(event)) {
            if (field === 'photos') {
                for await (let img of event[field]) {
                    var filename = `${uuid()}.${img.name.split('.').pop()}`
                    const file = await new Blob([img], {type: img.type})
                    formData.append(filename, file);
                }
            }
            formData.append(field, event[field])
        }

        await useFetch('/api/catalog/product', {
            onResponse({request, response, options}) {
                console.log(response._data)
                updateProducts(response._data)
            },
            onRequest({request, options}) {

            },
            onRequestError({request, options, error}) {

            },
            onResponseError({request, response, options}) {

            },
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=----buket----'
            }
        })
    }
    const getProduct = async (path) => {
        useFetch(`/api/catalog/product/${path}`, {
            onResponse({response}) {
                // console.dir(response._data)
                return response._data
            },
            method: "GET"
        })
    }

    const products = useState('products', async () => await getProducts())
    const product = shallowRef({})
    return {getProducts, createProduct, deleteProduct, getProduct, products}
})
