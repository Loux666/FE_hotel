import { defineStore } from 'pinia';
import authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            const { data } = await authService.login(credentials);
            this.setAuthData(data.data.user, data.data.token);
            return data;
        },
        async register(userInfo) {
            const { data } = await authService.register(userInfo);
            this.setAuthData(data.data.user, data.data.token);
            return data;
        },
        async logout() {
            try {
                if (this.token) {
                    await authService.logout();
                }
            } catch (error) {
                console.error('Logout error API', error);
            } finally {
                this.clearAuthData();
            }
        },
        setAuthData(user, token) {
            this.user = user;
            this.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        clearAuthData() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});
