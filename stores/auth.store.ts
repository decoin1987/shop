// @ts-nocheck
import {useCookie, useFetch, useRouter, useState} from 'nuxt/app';
import {useLocalStorage} from "@vueuse/core";


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const toast = useToast()
    const isAuth = useLocalStorage('auth', false)

    const useSignUp = async (event: event) => {
        const requestOptions: {} = {
            body: event
        };
        await useFetch('api/identity/registration', {
            onResponse({request, response, options}) {
                if (response._data.status === 200) {
                    router.push({path: "/"})
                    isAuth.value = true
                    toast.add({title: response._data.message})
                }
                if (response?._data?.status === 404) {
                    isAuth.value = false
                    toast.add({title: response._data.message})
                }
            },
            method: 'POST',
            ...requestOptions
        });
    }
    const useLogIn = async (event: event) => {
        await useFetch('api/identity/login', {
            onResponse({request, response, options}) {
                if (response?._data?.status === 200) {
                    isAuth.value = true
                    toast.add({title: response._data.message})
                }
                if (response?._data?.status === 404) {
                    isAuth.value = false
                    toast.add({title: response._data.message})
                }
            },
            method: 'POST',
            body: {
                ...event
            }
        })
    }
    const useLogout = async () => {
        await useFetch('/api/identity/logout', {
            onResponse({request, response, options}) {
                if (response?._data?.status === 200) {
                    router.push({path: "/"})
                    isAuth.value = false
                }
            },
            method: 'GET'
        })
    }

    const useRefresh = async () => {
        await useFetch('/api/identity/refresh', {
            method: 'GET',
            onResponse({request, response, options}) {
                if (response?._data?.status === 200) {
                    isAuth.value = true
                }
                if (response?._data?.status === 401) {
                    isAuth.value = false
                }
            },
        })
    }

    return {
        useSignUp,
        useLogIn,
        useLogout,
        useRefresh,
        isAuth,
    }
})
