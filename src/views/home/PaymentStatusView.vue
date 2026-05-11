<template>
  <div class="payment-status-page bg-light min-vh-100 d-flex align-items-center">
    <Header />

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="glass-panel p-4 p-md-5 bg-white text-center shadow-lg mx-auto" style="border-radius: 32px; max-width: 500px;">
            <div v-if="isLoading" class="py-5">
              <div class="spinner-border text-gold" role="status"></div>
              <p class="text-muted mt-3 mb-0">Đang xác minh thanh toán...</p>
            </div>

            <!-- Success State -->
            <div v-else-if="isSuccess">
              <div class="mb-4 d-inline-block p-4 rounded-circle bg-success bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#28a745"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1 class="h3 fw-bold mb-3 luxury-title">Đặt phòng thành công!</h1>
              <p class="text-muted small mb-5 px-md-3">
                Cảm ơn bạn đã tin tưởng StayGo. Đơn đặt phòng của bạn đã được xác nhận. Chúng tôi đã
                gửi thông tin chi tiết qua email.
              </p>

              <div class="p-4 bg-light rounded-4 mb-5 text-start border border-white mx-auto" style="max-width: 400px;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted extra-small text-uppercase fw-bold tracking-wider">Trạng thái</span>
                  <span class="badge bg-success px-3 py-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">ĐÃ HOÀN TẤT</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted extra-small text-uppercase fw-bold tracking-wider">Mã booking</span>
                  <span class="fw-bold text-dark">#{{ bookingId || 'N/A' }}</span>
                </div>
              </div>

              <div class="d-flex flex-column gap-3 mx-auto" style="max-width: 400px;">
                <RouterLink to="/hotels" class="btn btn-premium py-3 shadow-sm fw-bold small"
                  >KHÁM PHÁ ĐIỂM ĐẾN KHÁC</RouterLink
                >
                <RouterLink to="/" class="btn btn-link text-dark text-decoration-none fw-bold small"
                  >QUAY LẠI TRANG CHỦ</RouterLink
                >
              </div>
            </div>

            <!-- Failure State -->
            <div v-else>
              <div class="mb-4 d-inline-block p-4 rounded-circle bg-danger bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc3545"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h1 class="display-6 fw-bold mb-3 luxury-title">Giao dịch thất bại</h1>
              <p class="text-muted fs-5 mb-5 px-lg-5">
                Rất tiếc, quá trình xử lý thanh toán đã gặp sự cố. Vui lòng thử lại hoặc chọn phương
                thức thanh toán khác.
              </p>

              <div class="d-grid gap-3">
                <RouterLink to="/checkout" class="btn btn-premium py-3"
                  >Thử thanh toán lại</RouterLink
                >
                <RouterLink to="/cart" class="btn btn-premium-outline py-3"
                  >Về lại giỏ hàng</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios'
import { useCartStore } from '@/stores/cart'
import Header from '@/components/home/Header.vue'

const route = useRoute()
const cartStore = useCartStore()

const isSuccess = ref(false)
const isLoading = ref(true)
const bookingId = computed(() => route.query.booking_id)

onMounted(async () => {
  const fallback = route.query.success === 'true'
  if (!bookingId.value) {
    isSuccess.value = fallback
    isLoading.value = false
    return
  }

  try {
    const { data } = await api.get('/payments/status', {
      params: { booking_id: bookingId.value },
    })
    const paymentStatus = data?.data?.payment_status
    const bookingStatus = data?.data?.status
    isSuccess.value = paymentStatus === 'paid' || bookingStatus === 'confirmed'

    // Clear cart on successful payment
    if (isSuccess.value) {
      cartStore.clearCart()
    }
  } catch (error) {
    isSuccess.value = fallback
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.luxury-title {
  color: var(--color-darker);
}
</style>
