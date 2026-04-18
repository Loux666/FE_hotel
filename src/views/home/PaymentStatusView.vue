<template>
  <div class="payment-status-page bg-light min-vh-100 d-flex align-items-center">
    <Header />
    
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="glass-panel p-5 bg-white text-center shadow-lg" style="border-radius: 32px;">
            <!-- Success State -->
            <div v-if="isSuccess">
              <div class="mb-4 d-inline-block p-4 rounded-circle bg-success bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h1 class="display-6 fw-bold mb-3 luxury-title">Đặt phòng thành công!</h1>
              <p class="text-muted fs-5 mb-5 px-lg-5">Cảm ơn bạn đã tin tưởng StayGo. Đơn đặt phòng của bạn đã được xác nhận. Chúng tôi đã gửi thông tin chi tiết qua email.</p>
              
              <div class="p-4 bg-light rounded-4 mb-5 text-start">
                <div class="d-flex justify-content-between mb-2">
                   <span class="text-muted small uppercase fw-bold">Trạng thái</span>
                   <span class="badge bg-success">Đã hoàn tất</span>
                </div>
                <div class="d-flex justify-content-between">
                   <span class="text-muted small uppercase fw-bold">Mã booking</span>
                   <span class="fw-bold text-dark">#{{ bookingId || 'N/A' }}</span>
                </div>
              </div>

              <div class="d-grid gap-3">
                <RouterLink to="/hotels" class="btn btn-premium py-3">Khám phá các điểm đến khác</RouterLink>
                <RouterLink to="/" class="btn btn-premium-outline py-3">Quay lại trang chủ</RouterLink>
              </div>
            </div>

            <!-- Failure State -->
            <div v-else>
              <div class="mb-4 d-inline-block p-4 rounded-circle bg-danger bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </div>
              <h1 class="display-6 fw-bold mb-3 luxury-title">Giao dịch thất bại</h1>
              <p class="text-muted fs-5 mb-5 px-lg-5">Rất tiếc, quá trình xử lý thanh toán đã gặp sự cố. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.</p>
              
              <div class="d-grid gap-3">
                <RouterLink to="/checkout" class="btn btn-premium py-3">Thử thanh toán lại</RouterLink>
                <RouterLink to="/cart" class="btn btn-premium-outline py-3">Về lại giỏ hàng</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/home/Header.vue';

const route = useRoute();

const isSuccess = computed(() => route.query.success === 'true');
const bookingId = computed(() => route.query.booking_id);
</script>

<style scoped>
.luxury-title { color: var(--color-darker); }
</style>
