//@ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config


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
                    additionalData: '@use "@/assets/styles/_variable.scss"'
                },
                scss: {
                    api: 'modern-compiler' // or "modern"
                }
            }
        },
    },
    modules: ['nuxt-scheduler', ['dayjs-nuxt', {
        locales: ['ru'],
        plugins: ['relativeTime', 'utc', 'timezone', 'duration'],
        defaultTimezone: 'Asia/Yekaterinburg',
        defaultLocale: 'ru'
    }], ['vue-yandex-maps', {
        strictMode: true,
        apikey: '0ad0d51c-6191-457e-92fb-b8225caac0d5',
    }], ['@nuxtjs/google-fonts', {
        families: {
            Cormorant: {
                wght: '300..700',
            },
            Raleway: {
                wght: [400, 500, 600, 700, 900],
            },
        }
    }], '@pinia/nuxt', '@vueuse/nuxt', "@nuxt/image", 'dayjs-nuxt', '@nuxt/ui'],
    ui: {
        global: true,
        safelistColors: ['cool', 'primary', 'green', 'red', 'malibu']
    },
    colorMode: {
        preference: 'light'
    },
    nitro: {
        compressPublicAssets: {gzip: true, brotli: true},
    },
    runtimeConfig: {
        public: {}
    },
})