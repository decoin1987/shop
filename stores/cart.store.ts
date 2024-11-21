//@ts-nocheck
import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

interface CartStore {
    cart: []
}

export const useCartStore = defineStore('cart', {
        state: () => ({
            cart: []
        }),
        getters: {
            theCart: state => state.cart,
        },
        actions: {
            init(localCart) {
                this.$patch({ cart: localCart})
            },
            clear() {
                this.cart = []
            },
            addProduct(item) {
                if(this.cart.find((el) => el.id === item.id)) {
                    this.cart.find((el) => el.id === item.id).count += 1
                } else {
                    this.cart.push({
                        ...item,
                        count: 1,
                        upSale: {},
                    })
                }
            },
            productIsCart(id) {
                return this.cart.find(el => el.id === id)
            },
            deleteProduct(input) {
                this.cart = this.cart.filter(el => el.id !== input.id)
            },
            upSale(id, upSale, upSaleModel) {
                let product = this.cart.find(el => el.id === id)
                if (product) {
                    product.upSale = {
                        ...product?.upSale,
                        [upSaleModel]: {
                            ...upSale,
                            all: false,
                        }
                    }
                }
            },
            upSaleIsProduct(id) {
                return this.cart.find((el) => el.id === id)?.upSale
            },
            clearUpSaleProduct(id, upSaleModel) {
                const product = this.cart.find(el => el.id === id)
                if (product.upSale[upSaleModel]) {
                    delete product.upSale[upSaleModel]
                }
            },
            amountUpSale(id, upSaleModel) {
                let product = this.cart.find(el => el.id === id)
                let upsale = product?.upSale[upSaleModel]
                if (upsale) {
                    if (upsale.all) {
                        return this.cart.find(el => el.id === id).count * upsale.price
                    }
                    else {
                        return upsale.price
                    }
                } else return 0
            },
            countUpSale(id, upSaleModel) {
                let product = this.cart.find(el => el.id === id)
                let upsale = product?.upSale[upSaleModel]
                if (upsale) {
                    if (upsale.all) {
                        return this.cart.find(el => el.id === id).count
                    }
                    else {
                        return 1
                    }
                } else return 0
            },
            setUpSellToAll(id, upSaleModel) {
                let product = this.cart.find(el => el.id === id)
                if (!product?.upSale[upSaleModel]?.all) {
                    product.upSale[upSaleModel] = {
                        ...product.upSale[upSaleModel],
                        all: true
                    }
                }
                else {
                    product.upSale[upSaleModel].all = {
                        ...product.upSale[upSaleModel],
                        all: false
                    }
                }
            }
        }
    },
)