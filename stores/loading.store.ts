import { defineStore } from 'pinia'

interface LoadingStatus {
  status: boolean;
}

const defaultValue: LoadingStatus = {
  status: false
}

export const useIsLoadingStore = defineStore('isLoading', {
  state: () => defaultValue,
  getters: {
    isLoad: state => state.status
  },
  actions: {
    clear () {
      this.$patch(defaultValue)
    },
    set (input: boolean) {
      this.$patch({ status: input })
    }
  }
})
