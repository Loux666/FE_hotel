<template>
  <div class="cart-page bg-light min-vh-100">
    <Header />
    
    <main class="container pt-5 mt-5 pb-5">
      <div class="row align-items-center mb-5">
        <div class="col-12">
           <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
              <li class="breadcrumb-item"><RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
            </ol>
          </nav>
          <h1 class="display-6 fw-bold luxury-title">Giỏ hàng của bạn</h1>
        </div>
      </div>

      <div v-if="cartStore.isLoading" class="text-center py-5">
        <div class="spinner-border text-gold" role="status"></div>
      </div>

      <div v-else-if="cartStore.items.length === 0" class="text-center py-5 glass-panel bg-white">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-muted opacity-25"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h3 class="fw-bold text-dark mb-3">Giỏ hàng hiện đang trống</h3>
        <p class="text-muted mb-5">Hãy tham khảo các khách sạn sang trọng và chọn cho mình một căn phòng ưng ý nhé.</p>
        <RouterLink to="/hotels" class="btn btn-premium px-5 py-3">Khám phá ngay</RouterLink>
      </div>

      <div v-else class="row g-4">
        <!-- Cart Items List -->
        <div class="col-lg-8">
          <div class="d-flex flex-column gap-3">
            <div v-for="item in cartStore.items" :key="item.id" class="glass-panel p-3 border-0 shadow-soft bg-white">
              <div class="row g-3 align-items-center">
                <div class="col-md-3">
                  <img :src="item.room?.room_image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=400'" class="rounded-3 w-100" style="height: 120px; object-fit: cover;">
                </div>
                <div class="col-md-6">
                  <div class="small text-uppercase fw-bold text-muted mb-1" style="letter-spacing: 1px; font-size: 0.7rem;">{{ item.room?.hotel_name }}</div>
                  <h5 class="fw-bold mb-2">{{ item.room?.room_name }}</h5>
                  <div class="d-flex gap-3 small text-muted">
                    <span><i class="far fa-calendar-alt me-1"></i> {{ formatDate(item.checkin) }} - {{ formatDate(item.checkout) }}</span>
                  </div>
                </div>
                <div class="col-md-3 text-md-end">
                  <div class="fw-bold fs-5 mb-3">{{ formatPrice(item.price_at_time) }}₫</div>
                  <button @click="removeItem(item.id)" class="btn btn-link text-danger text-decoration-none p-0 small">
                    <i class="fas fa-trash-alt me-1"></i> Xóa phòng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Sidebar -->
        <div class="col-lg-4">
          <div class="glass-panel p-4 sticky-top bg-white" style="top: 100px; border-radius: 20px;">
            <h4 class="fw-bold mb-4">Tổng chi phí</h4>
            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex justify-content-between text-muted">
                <span>Tạm tính</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}₫</span>
              </div>
              <div class="d-flex justify-content-between text-muted">
                <span>Thuế & Phí (10%)</span>
                <span>{{ formatPrice(cartStore.totalPrice * 0.1) }}₫</span>
              </div>
              <hr class="my-0 opacity-10">
              <div class="d-flex justify-content-between fw-bold fs-4 text-dark pt-2">
                <span>Tổng cộng</span>
                <span>{{ formatPrice(cartStore.totalPrice * 1.1) }}₫</span>
              </div>
            </div>
            
            <RouterLink to="/checkout" class="btn btn-premium  py-3 d-flex align-items-center justify-content-center gap-2">
              Tiến hành đặt phòng
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </RouterLink>
            
            <div class="mt-4 pt-4 border-top">
              <div class="d-flex align-items-center gap-3 text-muted small">
                <i class="fas fa-shield-alt fs-4"></i>
                <span>Thanh toán bảo mật qua VNPAY hoặc thanh toán trực tiếp tại khách sạn.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import Header from '@/components/home/Header.vue';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const removeItem = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa phòng này ra khỏi giỏ hàng?')) {
    try {
      await cartStore.removeFromCart(id);
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa mục');
    }
  }
};
</script>

<style scoped>
.text-gold {
  color: var(--color-gold) !important;
}
</style>
