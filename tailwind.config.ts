// @ts-nocheck

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        fontFamily: {
            'sans': ['Raleway', 'ui-sans-serif', 'system-ui',],
            'serif': ['Cormorant','ui-serif', 'Georgia',],
            'body': ['Raleway',],
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            colors: {
                'roze-red': {
                    '50': '#fef2f2',
                    '100': '#fee2e2',
                    '200': '#fecaca',
                    '300': '#fca5a5',
                    '400': '#f77272',
                    '500': '#ee4545',
                    '600': '#dd3131',
                    '700': '#b81d1d',
                    '800': '#991b1b',
                    '900': '#7f1d1d',
                    '950': '#450a0a',
                },
                'gray': {
                    '50': '#f5f5f6',
                    '100': '#e5e6e8',
                    '200': '#cdced4',
                    '300': '#aaacb6',
                    '400': '#7f8191',
                    '500': '#646676',
                    '600': '#565764',
                    '700': '#4a4b54',
                    '800': '#414149',
                    '900': '#393940',
                    '950': '#070708',
                },
                'malibu': {
                    '50': '#effaff',
                    '100': '#dff4ff',
                    '200': '#b8ebff',
                    '300': '#78ddff',
                    '400': '#24c8ff',
                    '500': '#06b5f1',
                    '600': '#0092ce',
                    '700': '#0074a7',
                    '800': '#02628a',
                    '900': '#085172',
                    '950': '#06334b',
                },
            }
        }
    }
}