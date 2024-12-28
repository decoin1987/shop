// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useFetch, useRoute, useRouter, useState} from 'nuxt/app';




export const useCategoryStore = defineStore('category', () => {
    const route = useRoute()
    const token = useCookie('token')
    const updateCategories = (data) => {
        if (data) {
            categories.value = data
        }
    }
    const getCategory = async (slug) => {
        useFetch(`/api/catalog/category/${slug}`, {
            onResponse({response}) {
                // console.dir(response._data)
                return response._data
            },
            method: "GET"
        })
    }
    const getCategories = async () => {
        useFetch('/api/catalog/category', {
            onResponse({response}) {
                // console.dir(response._data)
                return updateCategories(response._data)
            },
            method: "GET"
        })
        // return updateCategories(data.value)
    }

    const editCategory = async (data) => {
        // console.log(data)
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
                return updateCategories(response._data)
            },
            body: data
        })
    }

    const updateCategoryBulk = async (data) => {
        useFetch('/api/catalog/category/bulk', {
            onResponse({request, response, options}) {
                if (response._data.statusCode) {
                    return console.error(response._data.message)
                }
                return updateCategories(response._data)
            },
            method: "PUT",
            body: data
        })
    }
    const copyCategory = async (id) => {
        useFetch('/api/catalog/category/copy', {
            onResponse({response}) {
                return updateCategories(response._data)
            },
            method: "POST",
            body: {
                id: id
            }
        })
    }

    const deleteCategory = async (id) => {
        useFetch('/api/catalog/category', {
            onResponse({response}) {
                return updateCategories(response._data)
            },
            method: "DELETE",
            body: {
                id: id
            }
        })
    }

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
                return updateCategories(response._data)
            },
            body: data
        })
    }

    const categories = useState('categories', async () => await getCategories())
    return {createCategory, updateCategoryBulk, copyCategory, getCategories, deleteCategory, editCategory, getCategory, categories}
})
