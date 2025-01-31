// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useFetch, useRouter} from 'nuxt/app';
import {ref} from "vue";
import {useLocalStorage} from "@vueuse/core";


export const useAuthStore = defineStore('auth', () => {

  const token = useCookie('token', {maxAge: 60*15, secure: true, sameSite: true})
  const user = useLocalStorage('bouquet_user')
  const router = useRouter()
  const toast = useToast()

  const useSignUp = async (event: event) => {
    const requestOptions: {} = {
      body: event
    };
    // @ts-ignore-all
    await useFetch('api/identity/registration', {
      onRequest({request, options}: { request: any, options: any }) {
        options.method = 'POST'
        options.headers = options.headers || {}
        options.headers.authorization = token.value
      },
      onRequestError({request, options, error}) {},
      onResponse({request, response, options}) {
        if (response._data.status === 200) {
          token.value = response._data.token
          user.value = JSON.stringify(response._data.user)
          router.push({path: "/"})
        }
      },
      onResponseError({request, response, options}) {

      },
      ...requestOptions
    });
  }
  const useLogIn = async (event: event) => {
    await useFetch('api/identity/login', {
      onRequest({request, options}: { request: any, options: any }) {
        options.method = 'POST'
        options.headers = options.headers || {}
        options.headers.authorization = !!token.value ? token.value : ''
      },
      onRequestError({request, options, error}) {
      },
      onResponse({request, response, options}) {
        if (response?._data?.status === 200) {
          token.value = response._data.token
          user.value = JSON.stringify(response._data.user)
        }
      },
      onResponseError({request, response, options}) {

      },
      body: {
        ...event
      }
    })
  }
  const useLogout = async () => {
    await useFetch('/api/identity/logout', {
      onRequest({request, options}: { request: any, options: any }) {
        options.method = 'GET'
        options.headers = options.headers || {}
        options.headers.authorization = !!token.value ? token.value : ''
      },
      onRequestError({request, options, error}) {
      },
      onResponse({request, response, options}) {
        if (response?._data?.status === 200) {
          user.value = null
          // router.push({ path: "/" })
        }
      },
      onResponseError({request, response, options}) {

      },
    })
  }

  const useRefresh = async () => {
    await useFetch('/api/identity/refresh', {
      onResponse({request, response, options}) {
        if (response?._data?.status === 200) {
          user.value = JSON.stringify(response._data.user)
          token.value = response._data.token
        }
        if (response?._data?.status === 401) {
          user.value = null
          authError(response?._data?.message)
        }
      },
      method: 'POST',
      body: {
          user: JSON.parse(user.value),
      }
    })
  }

  const authError = async (reason: string) => {
    switch (reason) {
      case 'EXPIRED_REFRESH_COOKIE':
        await useLogout(true)
        break;
      case 'NO_COOKIE':
        toast.add({ title: 'Войдите пожалуйста на сайт' })
        await router.replace('/login')
        break;
      case 'NO_RIGHTS':
        await router.replace('/')
        toast.add({ title: 'У тебя нет прав на это' })
        break;
      case 'SERVER_INTERNAL_ERROR':
        break;
    }
  }

  return {useSignUp, useLogIn, authError, useLogout, useRefresh, useUser:user.value}
})
