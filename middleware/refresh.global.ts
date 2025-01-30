import {useAuthStore} from "~/stores/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
    const authState = useAuthStore()
    console.log('Статус авторизации на сайте: ' + authState.isAuth)
    // console.log(to)
});