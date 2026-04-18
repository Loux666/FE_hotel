import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/login.vue'
import Register from '@/views/auth/register.vue'
import HomeView from '@/views/home/HomeView.vue'
import HotelsView from '@/views/home/HotelsView.vue'
import HotelDetailView from '@/views/home/HotelDetailView.vue'
import CartView from '@/views/home/CartView.vue'
import CheckoutView from '@/views/home/CheckoutView.vue'
import PaymentStatusView from '@/views/home/PaymentStatusView.vue'
import PromotionsView from '@/views/home/PromotionsView.vue'
import ContactView from '@/views/home/ContactView.vue'
import ProfileView from '@/views/home/ProfileView.vue'
import BookingHistoryView from '@/views/home/BookingHistoryView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/hotels', name: 'hotels', component: HotelsView },
  { path: '/hotels/:id', name: 'hotel-detail', component: HotelDetailView },
  { path: '/cart', name: 'cart', component: CartView, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'checkout', component: CheckoutView, meta: { requiresAuth: true } },
  { path: '/payment/status', name: 'payment-status', component: PaymentStatusView },
  { path: '/promotions', name: 'promotions', component: PromotionsView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/history', name: 'history', component: BookingHistoryView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login, meta: { guest: true } },
  { path: '/register', name: 'register', component: Register, meta: { guest: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.guest && token) {
    next('/');
  } else {
    next();
  }
});

export default router