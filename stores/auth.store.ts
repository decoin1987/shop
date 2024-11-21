// @ts-nocheck
import {defineStore} from 'pinia'
import {useCookie, useFetch, useRouter} from 'nuxt/app';
import {ref} from "vue";


interface event {
  data: {}
}

export const useAuthStore = defineStore('auth', async () => {

  const token = useCookie('token', {maxAge: 15 * 60, secure: true, sameSite: true})
  const router = useRouter()

  const isAuth = ref(false)
  const isUser = ref(null)

  const useSignUp = async (event: event) => {
    const requestOptions: {} = {
      body: JSON.stringify(event.data)
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

          router.push({path: "/"})
        }
      },
      onResponseError({request, response, options}) {

      },
      ...requestOptions
    });
  }
  const useSignIn = async (event: event) => {
    const requestOptions: {} = {
      body: JSON.stringify(event.data)
    };
    console.log(JSON.stringify(event.data))
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
          isUser.value = response._data.user
          isAuth.value = true
          // router.push({ path: "/" })
        }
      },
      onResponseError({request, response, options}) {

      },
      ...requestOptions
    })
  }
  const useLogout = async (no_message:boolean) => {
    await useFetch('/api/logout', {
      onRequest({request, options}: { request: any, options: any }) {
        options.method = 'GET'
        options.headers = options.headers || {}
        options.headers.authorization = !!token.value ? token.value : ''
      },
      onRequestError({request, options, error}) {
      },
      onResponse({request, response, options}) {
        if (response?._data?.status === 200) {
          isUser.value = null
          isAuth.value = false
          router.push({ path: "/" })
        }
      },
      onResponseError({request, response, options}) {

      },
    })
  }

  const authError = async (reason: string) => {
    switch (reason) {
      case 'EXPIRED_REFRESH_COOKIE':
        await useLogout(true)
        break;
      case 'NO_COOKIE':
        await router.replace('/login')
        break;
      case 'NO_RIGHTS':
        break;
      case 'SERVER_INTERNAL_ERROR':
        break;
    }
  }

  return {isAuth, isUser, useSignUp, useSignIn, authError, useLogout}
})
