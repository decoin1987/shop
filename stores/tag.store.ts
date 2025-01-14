// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useRouter, useState} from 'nuxt/app';




export const useTagStore = defineStore('tag', () => {

    const token = useCookie('token')
    const updateTag = (data) => {
        if (data) {
            tags.value = data
        }
    }

    const getTags = async () => {
        useFetch('/api/catalog/tags', {
            onResponse({response}) {
                return updateTag(response._data)
            },
            method: "GET"
        })
        // return updateCategory(data.value)
    }

    const editTag = async (data) => {
        useFetch('/api/catalog/tags', {
            headers: {
                authorization: !!token.value ? token.value : '',
            },
            method: "PUT",
            onResponse({request, response, options}) {
                if (response._data.statusCode) {
                    return console.error(response._data.message)
                }
                // console.log(response._data)
                return updateTag(response._data)
            },
            body: data
        })
    }

    const deleteTag = async (id) => {
        useFetch('/api/catalog/tags', {
            onResponse({response}) {
                return updateTag(response._data)
            },
            method: "DELETE",
            body: {
                id: id
            }
        })
    }

    const createTag = async (data) => {
        useFetch('/api/catalog/tags', {
            headers: {
                authorization: !!token.value ? token.value : '',
            },
            method: "POST",
            onResponse({request, response, options}) {
                if (response._data.statusCode) {
                    return console.error(response._data.message)
                }
                return updateTag(response._data)
            },
            body: data
        })
    }

    const tags = useState('tags', async () => await getTags())
    return {createTag, getTags, deleteTag, editTag, tags}
})
