import {useCookie} from "nuxt/app";
import { jwtDecode } from "jwt-decode";
import useToken from "~/composables/useTokenValidate";
import {useAuthStore} from "~/stores/auth.store";
const secret =  'faqwegfq34ti3-4i3f403[4f34f234R34f324F324f3f'

const getDecodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null
    }
}

export default defineNuxtRouteMiddleware((to, from) => {

    const authState = useAuthStore()
    console.log('Статус авторизации на сайте: ' + authState.isAuth)
        // console.log(to)
    const { token } = useToken('token')
    const { refreshToken } = useToken('refreshToken')
    const toast = useToast()
    // console.log(to.meta.roles)

    // if (to.matched.some(record => record.path.includes('/admin'))) {
    //     const decodedToken = getDecodeToken(token.value)
    //     console.log(decodedToken)
    //     if(decodedToken) {
    //         if (to.meta.roles && !to.meta.roles.includes(decodedToken.role)) {
    //             toast.add({ title: 'Куда полез хуйло' })
    //             return navigateTo('/login');
    //         }
    //     } else if (!decodedToken) {
    //         toast.add({ title: 'Куда полез хуйло' })
    //         return navigateTo('/login');
    //     }
    // }
    // if (to.matched.some(record => record.path.includes('/account'))) {
    //     const decodedToken = getDecodeToken(token.value)
    //     if(!decodedToken) {
    //         toast.add({ title: 'Пожалуйста войдите или зарегистрируйтесь на сайте' })
    //         return navigateTo('/login');
    //
    //     }
    // }

    // Продолжение навигации
    return true;

});