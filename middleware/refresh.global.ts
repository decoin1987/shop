import {useAuthStore} from "~/stores/auth.store";
import { jwtDecode } from "jwt-decode";
import {useLocalStorage} from "@vueuse/core";
import {abortNavigation, navigateTo, onNuxtReady, useCookie, useFetch, useRouter} from "nuxt/app";
import {onBeforeRouteUpdate} from "nuxt/dist/app/composables/router";
import {ref} from "vue";


export default defineNuxtRouteMiddleware((to: any, from,) => {
    const authStore = useAuthStore()
    const token = useCookie('token', {maxAge: 60 * 15, secure: true, sameSite: true})

    const comparePath = (record) => {
        return to.matched.some(item => record.includes(item.path));
    }

    if (comparePath(['/account', '/admin'])) {
        if (!token.value) {
            authStore.useRefresh()
            return navigateTo('/');
        }
    }

    if (comparePath(['/admin'])) {
        if (token.value && parseInt(jwtDecode(token.value).role) !== 7) {
            authStore.useRefresh()
            return navigateTo('/');
        }
    }

    if (comparePath(['/login', '/registration'])) {
        if (token.value) {
            return navigateTo('/');
        }
    }

    if (token.value) {
        authStore.useRefresh()
    }

});