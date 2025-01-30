import {useCookie} from "nuxt/app";

const secret =  'faqwegfq34ti3-4i3f403[4f34f234R34f324F324f3f'

export default function useToken() {

    const token = useCookie('token')

    return { token }
}