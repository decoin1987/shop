import {defineStore} from "pinia";

interface NotifyStore {
    text: string,
    state: boolean,
    timeout?: number
}


const defaultValue: { notify: NotifyStore } = {
    notify: {
        text: '',
        state: false,
        timeout: 3
    }
}


export const useNotifyStore = defineStore('notify',{
        state: () => defaultValue,
        getters: {
            getNotify: state => state.notify
        },
        actions: {
            clear() {
                this.$patch(defaultValue)
            },
            set(input: NotifyStore) {
                this.$patch({notify: input})

                setTimeout(()=> {
                    this.$patch({
                        notify: {
                            text: '',
                            state: false,
                            timeout: 3
                        }})
                }, (input?.timeout as number * 1000) || 3000)
            }
        }
    },
)