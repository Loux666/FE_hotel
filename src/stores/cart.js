import { defineStore } from 'pinia';
import cartService from '../services/cartService';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isLoading: false,
    }),
    getters: {
        totalItems: (state) => state.items.length,
        totalPrice: (state) => state.items.reduce((total, item) => total + parseFloat(item.price_at_time || 0), 0)
    },
    actions: {
        async fetchCart() {
            this.isLoading = true;
            try {
                const { data } = await cartService.getCart();
                this.items = data.data;
            } catch (error) {
                console.error('Lỗi khi tải giỏ hàng', error);
            } finally {
                this.isLoading = false;
            }
        },
        async addToCart(payload) {
            try {
                await cartService.addToCart(payload);
                await this.fetchCart();
            } catch (error) {
                throw error;
            }
        },
        async removeFromCart(id) {
            try {
                await cartService.removeFromCart(id);
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                throw error;
            }
        }
    }
});
