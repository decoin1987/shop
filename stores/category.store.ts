// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useFetch, useRouter, useState} from 'nuxt/app';
import {ref} from "vue";




export const useCategoryStore = defineStore('category', () => {

    const token = useCookie('token')
    const updateCategory = (data) => {
        if (data) {
            categories.value = data
        }
    }
    const getCategory = async () => {
        useFetch('/api/catalog/category', {
            onResponse({response}) {
                // console.dir(response._data)
                return updateCategory(response._data)
            },
            method: "GET"
        })
    }

    const editCategory = async (data) => {
        useFetch('/api/catalog/category', {
            headers: {
                authorization: !!token.value ? token.value : '',
            },
            method: "PUT",
            onResponse({request, response, options}) {
                if (response._data.statusCode) {
                    return console.error(response._data.message)
                }
                // console.log(response._data)
                return updateCategory(response._data)
            },
            body: data
        })
    }

    const deleteCategory = async (id) => {
        useFetch('/api/catalog/category', {
            onResponse({response}) {
                return updateCategory(response._data)
            },
            method: "DELETE",
            body: {
                id: id
            }
        })
    }

    const categories = useState('categories', async () => await getCategory())

    const createCategory = async (data) => {
        useFetch('/api/catalog/category', {
            headers: {
                authorization: !!token.value ? token.value : '',
            },
            method: "POST",
            onResponse({request, response, options}) {
                if (response._data.statusCode) {
                    return console.error(response._data.message)
                }
                console.log(response._data)
                return updateCategory(response._data)
            },
            body: data
        })
    }

    return {createCategory, getCategory, deleteCategory, editCategory, categories}
})
