<template>
  <header class="navbar navbar-expand-lg glass-panel fixed-top px-4 py-3">
    <div class="container d-flex align-items-center justify-content-between">
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
        <span class="fs-3 fw-bold">STAY<span style="color:var(--color-gold)">GO</span></span>
      </RouterLink>
      
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav gap-4">
          <li class="nav-item">
            <RouterLink class="nav-link fw-medium text-dark hover-gold transition-colors" to="/">Trang chủ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-medium text-dark hover-gold transition-colors" to="/hotels">Khách sạn</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-medium text-dark hover-gold transition-colors" to="/promotions">Ưu đãi</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-medium text-dark hover-gold transition-colors" to="/contact">Liên hệ</RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center gap-3">
        <!-- Cart -->
        <RouterLink to="/cart" class="position-relative text-dark text-decoration-none hover-lift" style="margin-right: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span v-if="cartStore.totalItems > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>

        <!-- Auth -->
        <template v-if="authStore.isAuthenticated">
          <div class="dropdown position-relative" @click="isDropdownOpen = !isDropdownOpen" v-click-outside="() => isDropdownOpen = false">
            <button class="btn btn-premium-outline dropdown-toggle px-3 py-2 d-flex align-items-center gap-2" type="button">
              <span class="fw-medium">{{ authStore.user?.name || 'Tài khoản' }}</span>
              <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
            </button>
            <ul v-show="isDropdownOpen" class="dropdown-menu-custom shadow-soft border-0 mt-2 glass-panel">
              <li><RouterLink class="dropdown-item py-2" to="/profile">Thông tin tài khoản</RouterLink></li>
              <li><RouterLink class="dropdown-item py-2" to="/bookings">Đơn đặt phòng</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item py-2 text-danger border-0 bg-transparent w-100 text-start" @click="handleLogout">Đăng xuất</button></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="d-flex gap-2 ms-2">
            <RouterLink class="btn btn-premium-outline" to="/login">Đăng nhập</RouterLink>
            <RouterLink class="btn btn-premium" to="/register">Đăng ký</RouterLink>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const isDropdownOpen = ref(false);

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    cartStore.fetchCart();
  }
});

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.hover-gold:hover {
  color: var(--color-gold) !important;
}
.transition-colors {
  transition: color 0.3s ease;
}
.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  min-width: 12rem;
  padding: .5rem 0;
  margin: 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  border-radius: .25rem;
}
.dropdown-item {
  display: block;
  width: 100%;
  padding: .25rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.dropdown-item:hover {
  color: var(--color-gold);
  background-color: #f8f9fa;
}
.dropdown-divider {
  height: 0;
  margin: .5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
}
.dropdown-toggle { cursor: pointer; }
.nav-link { text-decoration: none; padding: 0.5rem 1rem; }
.navbar-nav { list-style: none; display: flex; padding-left: 0; margin-bottom: 0; margin-top: 0; }
.navbar-collapse { flex-grow: 1; display: flex; }
</style>
