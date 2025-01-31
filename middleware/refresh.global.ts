import {useAuthStore} from "~/stores/auth.store";
import {useLocalStorage} from "@vueuse/core";
import {abortNavigation, navigateTo, useCookie, useFetch, useRouter} from "nuxt/app";


export default defineNuxtRouteMiddleware(async (to:any, from) => {
    const authStore = useAuthStore()

    const user = useLocalStorage('bouquet_user')
    const bouquet_user = user.value
    const comparePath = (record) => {
        return to.matched.some(item => record.includes(item.path));
    }
    if (comparePath(['/account', '/admin']) && !bouquet_user) {
        await authStore.authError('NO_COOKIE')
    }
    if (bouquet_user) {
        await authStore.useRefresh()
        if (comparePath(['/admin'])) {
            if(parseInt(JSON.parse(bouquet_user).role) !== 7) {
                await authStore.authError('NO_RIGHTS')
            }
        }
    }
});