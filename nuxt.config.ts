//@ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config


import path from "path";
const env = process.env;

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    css: ["@/assets/styles/global.scss"],
    app: {
        baseURL: '/', // Базовый URL приложения
        rootAttrs: {id: 'buket'},
        head: {
            htmlAttrs: {
                lang: 'ru' // Устанавливаем русский язык для HTML-документа
            }
        }
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
        plugin: true,
        plugins: ['relativeTime', 'utc', 'timezone', 'duration'],
        defaultTimezone: 'Asia/Yekaterinburg',
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
    }], ['@pinia/nuxt', {},], '@vueuse/nuxt', "@nuxt/image", 'dayjs-nuxt', '@nuxt/ui'],

    ui: {
        global: true,
        safelistColors: ['cool', 'primary', 'green', 'red', 'malibu']
    },
    colorMode: {
        preference: 'light'
    },
    nitro: {
        preset: 'node-server',
        compressPublicAssets: {gzip: true, brotli: true},
    },
    runtimeConfig: {
        buildPath: '.output',
        jwtAccessSecret: process.env.NUXT_API_JWT_ACCESS_SECRET,
        jwtRefreshSecret: process.env.NUXT_API_JWT_REFRESH_SECRET,
        seedUserUsername: process.env.NUXT_API_SEED_USER_USERNAME,
        seedUserEmail: process.env.NUXT_API_SEED_USER_EMAIL,
        ntbaFix350: process.env.NUXT_API_NTBA_FIX_350,
        terminal: process.env.NUXT_API_TERMINAL,
        tSecret: process.env.NUXT_API_T_SECRET,
        mailHost: process.env.NUXT_API_MAIL_HOST,
        mailPort: process.env.NUXT_API_MAIL_PORT,
        smtpUser: process.env.NUXT_API_SMTP_USER,
        smtpPass: process.env.NUXT_API_SMTP_PASS,
        apiUrl: process.env.NUXT_API_API_URL,
        clientUrl: process.env.NUXT_API_CLIENT_URL,
        sanya: process.env.NUXT_API_SANYA,
        botUsername: process.env.NUXT_API_BOT_USERNAME,
        botToken: process.env.NUXT_API_BOT_TOKEN,
        dbUsername: process.env.NUXT_API_DB_USERNAME,
        dbPassword:process.env.NUXT_API_DB_PASSWORD,
        db: process.env.NUXT_API_DB,
        dbHost: process.env.NUXT_API_DB_HOST,
        dbDialect: process.env.NUXT_API_DB_DIALECT,
    },
    server: {
        host: '0.0.0.0', // Доступен извне локальной машины
        port: 3000,
    },
})