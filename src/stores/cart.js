import { defineStore } from 'pinia'
import cartService from '../services/cartService'

const getNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 1
  const [sy, sm, sd] = checkin.split('-').map(Number)
  const [ey, em, ed] = checkout.split('-').map(Number)
  if (!sy || !sm || !sd || !ey || !em || !ed) return 1
  const start = Date.UTC(sy, sm - 1, sd)
  const end = Date.UTC(ey, em - 1, ed)
  const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 1
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoading: false,
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((total, item) => {
        const nights = getNights(item.checkin, item.checkout)
        return total + parseFloat(item.price_at_time || 0) * nights
      }, 0),
  },
  actions: {
    async fetchCart() {
      this.isLoading = true
      try {
        const { data } = await cartService.getCart()
        this.items = data.data
      } catch (error) {
        console.error('Lỗi khi tải giỏ hàng', error)
      } finally {
        this.isLoading = false
      }
    },
    async addToCart(payload) {
      try {
        await cartService.addToCart(payload)
        await this.fetchCart()
      } catch (error) {
        throw error
      }
    },
    async removeFromCart(id) {
      try {
        await cartService.removeFromCart(id)
        this.items = this.items.filter((item) => item.id !== id)
      } catch (error) {
        throw error
      }
    },
    clearCart() {
      this.items = []
    },
  },
})
