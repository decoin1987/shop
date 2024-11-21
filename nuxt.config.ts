//@ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'node:path'

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    css: ["@/assets/styles/global.scss"],
    app: {
        rootAttrs: {id: 'buket'},
    },
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/assets/styles/_variable.scss"'
                }
            }
        },
    },
    modules: [
        'nuxt-scheduler',
        ['dayjs-nuxt', {
            locales: ['ru'],
            plugins: ['relativeTime', 'utc', 'timezone', 'duration'],
            defaultTimezone: 'Asia/Yekaterinburg',
            defaultLocale: 'ru'
        }], ['vue-yandex-maps', {
            strictMode: true,
            apikey: '0ad0d51c-6191-457e-92fb-b8225caac0d5',
        }], '@pinia/nuxt', '@vueuse/nuxt', "@nuxt/image", 'dayjs-nuxt'],
})