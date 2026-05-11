<template>
  <div class="checkout-page bg-light min-vh-100 pb-5">
    <Header />

    <main class="container pt-5 mt-5">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h1 class="display-6 fw-bold luxury-title">Xác nhận đặt phòng</h1>
          <p class="text-muted">Vui lòng kiểm tra lại thông tin và hoàn tất thanh toán</p>
        </div>
      </div>

      <div v-if="cartStore.items.length === 0 && !isProcessing" class="text-center py-5">
        <div class="glass-panel p-5 d-inline-block" style="border-radius: 32px">
          <i class="fas fa-shopping-cart fa-3x text-gold mb-4"></i>
          <p class="fs-4 fw-bold">Giỏ hàng của bạn đang trống.</p>
          <RouterLink to="/hotels" class="btn btn-premium mt-3 px-5">Tìm phòng ngay</RouterLink>
        </div>
      </div>

      <div v-else class="row g-4">
        <!-- Main Form (Left) -->
        <div class="col-lg-8">
          <!-- Step 1: Guest Information -->
          <div class="glass-panel p-4 p-md-5 mb-4 shadow-soft" style="border-radius: 28px">
            <div class="d-flex align-items-center gap-3 mb-4">
              <div class="step-number">1</div>
              <h4 class="fw-bold mb-0">Thông tin liên hệ</h4>
            </div>
            
            <form id="checkout-form" class="row g-4">
              <div class="col-md-12">
                <label class="form-label small fw-bold text-muted text-uppercase tracking-wider">Họ và tên khách hàng</label>
                <div class="input-with-icon">
                  <i class="far fa-user"></i>
                  <input
                    v-model="form.guest_name"
                    type="text"
                    class="form-control form-control-lg border-0 bg-light-subtle py-3 ps-5"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-muted text-uppercase tracking-wider">Email nhận thông báo</label>
                <div class="input-with-icon">
                  <i class="far fa-envelope"></i>
                  <input
                    v-model="form.guest_email"
                    type="email"
                    class="form-control form-control-lg border-0 bg-light-subtle py-3 ps-5"
                    placeholder="email@vi-du.com"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-muted text-uppercase tracking-wider">Số điện thoại</label>
                <div class="input-with-icon">
                  <i class="fas fa-phone-alt"></i>
                  <input
                    v-model="form.guest_phone"
                    type="tel"
                    class="form-control form-control-lg border-0 bg-light-subtle py-3 ps-5"
                    placeholder="09xxxxxxxx"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <!-- Step 2: Payment Method -->
          <div class="glass-panel p-4 p-md-5 shadow-soft" style="border-radius: 28px">
            <div class="d-flex align-items-center gap-3 mb-4">
              <div class="step-number">2</div>
              <h4 class="fw-bold mb-0">Phương thức thanh toán</h4>
            </div>

            <div class="payment-options-grid">
              <label class="payment-card-v2" :class="{ active: form.payment_method === 'vnpay' }">
                <input type="radio" v-model="form.payment_method" value="vnpay" class="d-none" />
                <div class="d-flex align-items-center gap-3">
                  <div class="payment-icon-box">
                    <img src="/payment/vnpay.jpg" height="30" alt="VNPAY" style="object-fit: contain" />
                  </div>
                  <div class="flex-grow-1">
                    <div class="fw-bold">Ví điện tử VNPAY</div>
                    <div class="small text-muted">Thanh toán qua ứng dụng ngân hàng hoặc thẻ nội địa</div>
                  </div>
                  <div class="custom-radio"></div>
                </div>
              </label>

              <label class="payment-card-v2" :class="{ active: form.payment_method === 'sepay' }">
                <input type="radio" v-model="form.payment_method" value="sepay" class="d-none" />
                <div class="d-flex align-items-center gap-3">
                  <div class="payment-icon-box">
                    <img src="/payment/sepay.png" height="30" alt="SePay" style="object-fit: contain" />
                  </div>
                  <div class="flex-grow-1">
                    <div class="fw-bold">Chuyển khoản VietQR (SePay)</div>
                    <div class="small text-muted">Quét mã QR để thanh toán nhanh, duyệt đơn tự động</div>
                  </div>
                  <div class="custom-radio"></div>
                </div>
              </label>

              <label class="payment-card-v2" :class="{ active: form.payment_method === 'offline' }">
                <input type="radio" v-model="form.payment_method" value="offline" class="d-none" />
                <div class="d-flex align-items-center gap-3">
                  <div class="payment-icon-box offline-bg">
                    <i class="fas fa-hotel text-white"></i>
                  </div>
                  <div class="flex-grow-1">
                    <div class="fw-bold">Thanh toán tại quầy</div>
                    <div class="small text-muted">Quý khách sẽ thanh toán khi nhận phòng tại khách sạn</div>
                  </div>
                  <div class="custom-radio"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary (Right) -->
        <div class="col-lg-4">
          <div class="sticky-top" style="top: 100px">
            <div class="glass-panel p-4 shadow-soft overflow-hidden" style="border-radius: 28px">
              <h5 class="fw-bold mb-4">Tóm tắt đơn đặt phòng</h5>
              
              <div class="checkout-items mb-4">
                <div v-for="item in cartStore.items" :key="item.id" class="checkout-item-card mb-3">
                  <div class="d-flex gap-3">
                    <img :src="getRoomImage(item.room)" class="item-img" />
                    <div class="item-info">
                      <div class="fw-bold small line-clamp-1">{{ item.room?.room_name }}</div>
                      <div class="text-muted extra-small mb-1">{{ item.room?.hotel_name }}</div>
                      <div class="d-flex justify-content-between align-items-end">
                        <span class="badge bg-gold-subtle text-gold extra-small">{{ getNights(item.checkin, item.checkout) }} đêm</span>
                        <span class="fw-bold text-dark">{{ formatPrice(item.price_at_time * getNights(item.checkin, item.checkout)) }}₫</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Promo Code in Summary -->
              <div class="promo-section mb-4">
                <div v-if="!appliedCoupon" class="d-flex gap-2">
                  <input v-model="couponCode" type="text" class="form-control promo-input" placeholder="Mã giảm giá..." />
                  <button @click="applyCoupon" class="btn btn-apply" :disabled="isApplyingCoupon || !couponCode">ÁP DỤNG</button>
                </div>
                <div v-else class="applied-coupon-box d-flex justify-content-between align-items-center p-2 bg-light rounded-3">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fas fa-tag text-success"></i>
                    <span class="small fw-bold">{{ appliedCoupon.code }}</span>
                  </div>
                  <button @click="removeCoupon" class="btn btn-link btn-sm text-danger p-0" style="text-decoration: none">Xóa</button>
                </div>
              </div>

              <!-- Pricing Table -->
              <div class="pricing-table">
                <div class="pricing-row d-flex justify-content-between mb-2">
                  <span class="text-muted small">Tạm tính</span>
                  <span class="fw-semibold small">{{ formatPrice(previewData.base_price || 0) }}₫</span>
                </div>
                <div class="pricing-row d-flex justify-content-between mb-2">
                  <span class="text-muted small">Phí dịch vụ (5%)</span>
                  <span class="fw-semibold small">{{ formatPrice(previewData.service_fee || 0) }}₫</span>
                </div>
                <div class="pricing-row d-flex justify-content-between mb-2">
                  <span class="text-muted small">Thuế VAT (10%)</span>
                  <span class="fw-semibold small">{{ formatPrice(previewData.vat || 0) }}₫</span>
                </div>
                <div v-if="previewData.discount > 0" class="pricing-row d-flex justify-content-between mb-2 text-success">
                  <span class="small">Ưu đãi</span>
                  <span class="fw-bold small">-{{ formatPrice(previewData.discount) }}₫</span>
                </div>
                <div class="pricing-row total-row mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span class="fw-bold">Tổng cộng</span>
                  <span class="fs-4 fw-bold text-gold">{{ formatPrice(previewData.final_total || 0) }}₫</span>
                </div>
              </div>

              <button
                @click="processBooking"
                class="btn btn-premium w-100 py-3 mt-4 fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2"
                :disabled="isProcessing || isLoadingPreview"
              >
                <span v-if="isProcessing || isLoadingPreview" class="spinner-border spinner-border-sm"></span>
                <span v-else>
                  {{ form.payment_method === 'vnpay' ? 'THANH TOÁN NGAY' : form.payment_method === 'sepay' ? 'QUÉT MÃ VIETQR' : 'XÁC NHẬN ĐẶT PHÒNG' }}
                </span>
              </button>
            </div>
            
            <div class="text-center mt-3">
              <p class="text-muted extra-small">
                <i class="fas fa-lock me-1"></i> Thông tin thanh toán được bảo mật 256-bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- SePay QR Modal -->
    <div v-if="showSePayModal" class="sepay-modal-overlay">
      <div class="sepay-modal-content glass-panel p-5 text-center shadow-lg">
        <button @click="closeSePayModal" class="btn-close-modal">
          <i class="fas fa-times"></i>
        </button>
        <h3 class="fw-bold mb-4 luxury-title">Thanh toán qua VietQR</h3>
        
        <div class="qr-container mb-4 position-relative d-inline-block">
          <div v-if="!sepayData.qr_url" class="qr-placeholder rounded-4 d-flex align-items-center justify-content-center bg-light" style="width: 280px; height: 350px;">
             <span class="spinner-border text-gold"></span>
          </div>
          <img v-else :src="sepayData.qr_url" @error="handleQrError" alt="SePay VietQR" class="img-fluid rounded-4 shadow-sm border p-2 bg-white" style="max-width: 280px;" />
          
          <div class="qr-corner top-left"></div>
          <div class="qr-corner top-right"></div>
          <div class="qr-corner bottom-left"></div>
          <div class="qr-corner bottom-right"></div>
        </div>

        <div class="payment-info text-start bg-light p-4 rounded-4 mb-4 border border-white">
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Ngân hàng:</span>
            <span class="fw-bold text-dark">{{ sepayData.bank_name || 'Đang tải...' }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Số tài khoản:</span>
            <span class="fw-bold text-dark">{{ sepayData.bank_account || 'Đang tải...' }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Số tiền:</span>
            <span class="fw-bold text-danger fs-5">{{ formatPrice(sepayData.amount || 0) }}₫</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted">Nội dung:</span>
            <span class="fw-bold text-primary">{{ sepayData.description || 'Đang tải...' }}</span>
          </div>
        </div>

        <div class="status-indicator d-flex align-items-center justify-content-center gap-3 mb-2 py-2 px-3 bg-gold-subtle rounded-pill d-inline-flex">
          <div class="spinner-grow spinner-grow-sm text-gold" role="status"></div>
          <span class="fw-bold text-gold small text-uppercase tracking-wider">Đang chờ thanh toán</span>
        </div>
        <p class="small text-muted mt-3 mb-0 italic">Mã QR sẽ hết hạn sau 15 phút. Hệ thống sẽ tự động chuyển hướng khi nhận được tiền.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import Header from '@/components/home/Header.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const notificationStore = useNotificationStore()

const isProcessing = ref(false)
const isLoadingPreview = ref(false)
const showSePayModal = ref(false)
const sepayData = ref({})
const previewData = ref({})
const couponCode = ref('')
const isApplyingCoupon = ref(false)
const appliedCoupon = ref(null)
let pollingInterval = null

const form = reactive({
  guest_name: authStore.user?.name || '',
  guest_email: authStore.user?.email || '',
  guest_phone: authStore.user?.phone || '',
  payment_method: 'vnpay',
})

const getRoomImage = (room) => {
  if (!room) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
  const imagePath = room.room_image || room.hotel_image || (room.hotel && room.hotel.hotel_image)
  if (!imagePath) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
  if (imagePath.startsWith('http')) return imagePath
  return `http://127.0.0.1:8001/storage/${imagePath}`
}

const getNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 1
  const start = new Date(checkin)
  const end = new Date(checkout)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const updatePreview = async () => {
  if (cartStore.items.length === 0) return
  
  isLoadingPreview.value = true
  try {
    const { data } = await api.post('/bookings/preview', {
      cart_ids: cartStore.items.map(item => item.id),
      coupon_code: appliedCoupon.value?.code || null
    })
    previewData.value = data.data
  } catch (error) {
    console.error('Lỗi preview:', error)
  } finally {
    isLoadingPreview.value = false
  }
}

const applyCoupon = async () => {
  if (!couponCode.value) return
  
  isApplyingCoupon.value = true
  try {
    const { data } = await api.post('/bookings/apply-coupon', {
      coupon_code: couponCode.value,
      total_price: previewData.value.total_before_discount
    })
    appliedCoupon.value = data.data
    notificationStore.success(`Áp dụng mã ${couponCode.value} thành công!`)
    await updatePreview()
  } catch (error) {
    notificationStore.error(error.response?.data?.message || 'Mã giảm giá không hợp lệ')
  } finally {
    isApplyingCoupon.value = false
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCode.value = ''
  updatePreview()
}

onMounted(async () => {
  if (cartStore.items.length === 0) {
    await cartStore.fetchCart()
  }
  await updatePreview()
})

const processBooking = async () => {
  if (!form.guest_name || !form.guest_email || !form.guest_phone) {
    notificationStore.warning('Vui lòng điền đủ thông tin liên hệ!')
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
      coupon_code: appliedCoupon.value?.code || null
    })

    const bookingId = bookingRes.data.data.booking_id

    // 2. Init Payment
    const paymentRes = await api.post('/payments/init', {
      booking_id: bookingId,
      method: form.payment_method,
    })

    if (form.payment_method === 'vnpay') {
      window.location.href = paymentRes.data.data.payment_url
    } else if (form.payment_method === 'sepay') {
      sepayData.value = paymentRes.data.data
      showSePayModal.value = true
      startPolling(bookingId)
    } else {
      router.push(`/payment/status?success=true&booking_id=${bookingId}`)
    }
  } catch (error) {
    notificationStore.error(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý đặt phòng')
  } finally {
    isProcessing.value = false
  }
}

const startPolling = (bookingId) => {
  if (pollingInterval) clearInterval(pollingInterval)
  pollingInterval = setInterval(async () => {
    try {
      const { data } = await api.get('/payments/status', {
        params: { booking_id: bookingId }
      })
      
      if (data.data.payment_status === 'paid' || data.data.status === 'confirmed') {
        clearInterval(pollingInterval)
        notificationStore.success('Thanh toán thành công!')
        router.push(`/payment/status?success=true&booking_id=${bookingId}`)
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, 5000)
}

const closeSePayModal = () => {
  showSePayModal.value = false
  if (pollingInterval) clearInterval(pollingInterval)
}

const handleQrError = () => {
  notificationStore.error('Không thể tải mã QR. Vui lòng thử lại hoặc chọn phương thức khác.')
}

watch(() => cartStore.items, () => {
  updatePreview()
}, { deep: true })
</script>

<style scoped>
.payment-card-v2 {
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
  display: block;
}
.payment-card-v2:hover {
  border-color: var(--color-gold);
  background: #fffdf5;
}
.payment-card-v2.active {
  border-color: var(--color-gold);
  background: #fffdf5;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.1);
}
.payment-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sepay-bg { background: #00468c; }
.offline-bg { background: var(--color-gold); }

.custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  position: relative;
}
.active .custom-radio {
  border-color: var(--color-gold);
}
.active .custom-radio::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color-gold);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--color-gold);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.input-with-icon {
  position: relative;
}
.input-with-icon i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold);
  z-index: 10;
  font-size: 16px;
}
.input-with-icon .form-control {
  padding-left: 50px !important;
}

.checkout-item-card .item-img {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  object-fit: cover;
}
.extra-small { font-size: 0.75rem; }
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.total-amount {
  color: var(--color-gold);
}

.promo-input {
  border-radius: 12px !important;
  border: 1px solid #ddd !important;
  padding: 12px 15px !important;
  font-size: 0.85rem !important;
  background-color: #fff !important;
  box-shadow: none !important;
  outline: none !important;
  flex-grow: 1;
}
.promo-input:focus {
  border-color: var(--color-gold) !important;
}
.btn-apply {
  background: #000 !important;
  color: #fff !important;
  border-radius: 12px !important;
  padding: 0 25px !important;
  font-weight: 700 !important;
  font-size: 0.75rem !important;
  border: none !important;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-apply:hover {
  background: #333 !important;
}
.btn-apply:active {
  transform: scale(0.95);
}
.btn-apply:disabled {
  background: #999 !important;
  cursor: not-allowed;
}

.bg-gold-subtle {
  background-color: rgba(212, 175, 55, 0.1);
}

.tracking-wider {
  letter-spacing: 0.1em;
}

/* QR Modal & Decor */
.sepay-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.sepay-modal-content {
  position: relative;
  max-width: 500px;
  width: 100%;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: modalSlideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.qr-container {
  padding: 15px;
  background: white;
  border-radius: 24px;
}

.qr-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 4px solid var(--color-gold);
}
.top-left { top: -5px; left: -5px; border-right: none; border-bottom: none; border-radius: 12px 0 0 0; }
.top-right { top: -5px; right: -5px; border-left: none; border-bottom: none; border-radius: 0 12px 0 0; }
.bottom-left { bottom: -5px; left: -5px; border-right: none; border-top: none; border-radius: 0 0 0 12px; }
.bottom-right { bottom: -5px; right: -5px; border-left: none; border-top: none; border-radius: 0 0 12px 0; }

.btn-close-modal {
  position: absolute;
  top: 30px;
  right: 30px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.3s ease;
}

.btn-close-modal:hover {
  background: #ff4d4f;
  color: white;
  transform: rotate(90deg);
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(50px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.italic {
  font-style: italic;
}
</style>
