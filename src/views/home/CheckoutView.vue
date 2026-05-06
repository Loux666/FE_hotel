<template>
  <div class="checkout-page bg-light min-vh-100 pb-5">
    <Header />

    <main class="container pt-5 mt-5">
      <div class="row mb-5">
        <div class="col-12">
          <h1 class="display-6 fw-bold luxury-title text-center">Xác nhận đặt phòng</h1>
        </div>
      </div>

      <div v-if="cartStore.items.length === 0" class="text-center py-5">
        <p>Giỏ hàng của bạn đang trống.</p>
        <RouterLink to="/hotels" class="btn btn-premium">Tìm phòng ngay</RouterLink>
      </div>

      <div v-else class="row g-5">
        <!-- Billing Details -->
        <div class="col-lg-7">
          <div class="glass-panel p-5 bg-white shadow-soft" style="border-radius: 24px">
            <h4 class="fw-bold mb-4 d-flex align-items-center gap-2">
              <i class="fas fa-user-circle text-gold"></i>
              Thông tin người đặt
            </h4>
            <form id="checkout-form" class="row g-4">
              <div class="col-md-12">
                <label class="form-label small fw-bold text-muted text-uppercase">Họ và tên</label>
                <input
                  v-model="form.guest_name"
                  type="text"
                  class="form-control form-control-lg border-light bg-light"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-muted text-uppercase"
                  >Email liên hệ</label
                >
                <input
                  v-model="form.guest_email"
                  type="email"
                  class="form-control form-control-lg border-light bg-light"
                  placeholder="email@vi-du.com"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-muted text-uppercase"
                  >Số điện thoại</label
                >
                <input
                  v-model="form.guest_phone"
                  type="tel"
                  class="form-control form-control-lg border-light bg-light"
                  placeholder="09xxxxxxxx"
                  required
                />
              </div>

              <h4 class="fw-bold mt-5 mb-3 d-flex align-items-center gap-2">
                <i class="fas fa-credit-card text-gold"></i>
                Phương thức thanh toán
              </h4>
              <div class="col-12">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label
                      class="payment-card-option p-4 d-flex align-items-center gap-3 cursor-pointer"
                      :class="{ active: form.payment_method === 'vnpay' }"
                    >
                      <input
                        type="radio"
                        v-model="form.payment_method"
                        value="vnpay"
                        class="d-none"
                      />
                      <img
                        src="https://static.vnpay.vn/registration/images/vnpay-logo-2.61f71a93.svg"
                        height="24"
                        alt="VNPAY"
                      />
                      <span class="fw-bold fs-5">VNPAY QR</span>
                    </label>
                  </div>
                  <div class="col-md-6">
                    <label
                      class="payment-card-option p-4 d-flex align-items-center gap-3 cursor-pointer"
                      :class="{ active: form.payment_method === 'offline' }"
                    >
                      <input
                        type="radio"
                        v-model="form.payment_method"
                        value="offline"
                        class="d-none"
                      />
                      <div
                        class="icon-box bg-gold text-white p-2 rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 32px; height: 32px"
                      >
                        <i class="fas fa-hotel"></i>
                      </div>
                      <span class="fw-bold fs-5">Tại chỗ</span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-lg-5">
          <div
            class="glass-panel p-4 bg-white shadow-soft sticky-top"
            style="top: 100px; border-radius: 24px"
          >
            <h4 class="fw-bold mb-4">Danh sách phòng</h4>
            <div class="order-items-list mb-4 overflow-auto" style="max-height: 300px">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-light"
              >
                <img
                  :src="
                    item.room?.hotel_image ||
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
                  "
                  class="rounded-3"
                  style="width: 60px; height: 60px; object-fit: cover"
                />
                <div class="flex-grow-1">
                  <div class="fw-bold small mb-1">{{ item.room?.room_name }}</div>
                  <div class="text-muted mb-1" style="font-size: 0.75rem">
                    <i class="fas fa-map-marker-alt text-gold me-1"></i> {{ item.room?.hotel_name }}
                  </div>
                  <div class="d-flex flex-wrap gap-2 text-muted" style="font-size: 0.7rem">
                    <span class="bg-light px-2 py-1 rounded"
                      ><i class="fas fa-calendar-alt text-gold me-1"></i> {{ item.checkin }} -
                      {{ item.checkout }}</span
                    >
                    <span class="bg-light px-2 py-1 rounded"
                      ><i class="fas fa-user-friends text-gold me-1"></i>
                      {{ item.number_of_guests || 1 }} khách</span
                    >
                  </div>
                </div>
                <div class="fw-bold small">{{ formatPrice(item.price_at_time) }}₫</div>
              </div>
            </div>

            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex justify-content-between text-muted">
                <span>Tạm tính</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}₫</span>
              </div>
              <div class="d-flex justify-content-between text-muted">
                <span>Thuế & Phí (10%)</span>
                <span>{{ formatPrice(cartStore.totalPrice * 0.1) }}₫</span>
              </div>
              <div
                class="d-flex justify-content-between fw-bold fs-3 text-dark pt-3 border-top border-2 border-gold-subtle"
              >
                <span>Tổng cộng</span>
                <span>{{ formatPrice(cartStore.totalPrice * 1.1) }}₫</span>
              </div>
            </div>

            <button
              @click="processBooking"
              class="btn btn-premium btn-lg w-100 py-3 mt-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
              :disabled="isProcessing"
            >
              <span v-if="isProcessing" class="spinner-border spinner-border-sm"></span>
              {{ form.payment_method === 'vnpay' ? 'Thanh toán ngay' : 'Xác nhận đặt phòng' }}
              <i v-if="!isProcessing" class="fas fa-chevron-right small"></i>
            </button>
            <p class="text-center text-muted small mt-4 mb-0">
              Bằng việc bấm nút, bạn đồng ý với các Điều khoản & Chính sách của StayGo.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import Header from '@/components/home/Header.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const isProcessing = ref(false)

const form = reactive({
  guest_name: authStore.user?.name || '',
  guest_email: authStore.user?.email || '',
  guest_phone: authStore.user?.phone || '',
  payment_method: 'vnpay',
})

onMounted(async () => {
  if (cartStore.items.length === 0) {
    await cartStore.fetchCart()
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const processBooking = async () => {
  if (!form.guest_name || !form.guest_email || !form.guest_phone) {
    alert('Vui lòng điền đủ thông tin liên hệ!')
    return
  }

  isProcessing.value = true
  try {
    // 1. Create Booking
    const bookingRes = await api.post('/bookings', {
      guest_name: form.guest_name,
      guest_email: form.guest_email,
      guest_phone: form.guest_phone,
      cart_ids: cartStore.items.map((item) => item.id),
    })

    const bookingId = bookingRes.data.data.booking_id

    // 2. Init Payment
    const paymentRes = await api.post('/payments/init', {
      booking_id: bookingId,
      method: form.payment_method,
    })

    if (form.payment_method === 'vnpay') {
      window.location.href = paymentRes.data.data.payment_url
    } else {
      router.push(`/payment/status?success=true&booking_id=${bookingId}`)
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý đặt phòng')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.payment-card-option {
  border: 2px solid #f1f1f1;
  border-radius: 16px;
  transition: all 0.3s ease;
  user-select: none;
}
.payment-card-option:hover {
  background-color: #fbfbfb;
  border-color: var(--color-gold);
}
.payment-card-option.active {
  background-color: #fff;
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow);
}
.cursor-pointer {
  cursor: pointer;
}
.italic {
  font-style: italic;
}
.bg-gold {
  background-color: var(--color-gold);
}
.border-gold-subtle {
  border-color: rgba(212, 175, 55, 0.2) !important;
}
</style>
