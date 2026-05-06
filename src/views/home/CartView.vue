<template>
  <div class="cart-page bg-light min-vh-100">
    <Header />

    <main class="container pt-5 mt-5 pb-5">
      <div class="row align-items-center mb-5">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
              <li class="breadcrumb-item">
                <RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
            </ol>
          </nav>
          <h1 class="display-6 fw-bold luxury-title">Giỏ hàng của bạn</h1>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-4">
        <div class="nav nav-tabs" role="tablist" style="border-bottom: 2px solid #e5e5e5">
          <span class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold"
              :class="{ active: activeTab === 'cart' }"
              @click="activeTab = 'cart'"
              role="tab"
            >
              <i class="fas fa-shopping-cart me-2"></i>Giỏ hàng
            </button>
          </span>
          <span class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold"
              :class="{ active: activeTab === 'history' }"
              @click="activeTab = 'history'"
              role="tab"
            >
              <i class="fas fa-history me-2"></i>Lịch sử đặt phòng
            </button>
          </span>
        </div>
      </div>

      <!-- Cart Tab -->
      <div v-if="activeTab === 'cart'">
        <div v-if="cartStore.isLoading" class="text-center py-5">
          <div class="spinner-border text-gold" role="status"></div>
        </div>

        <div v-else-if="cartStore.items.length === 0" class="text-center py-5 glass-panel bg-white">
          <div class="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-muted opacity-25"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h3 class="fw-bold text-dark mb-3">Giỏ hàng hiện đang trống</h3>
          <p class="text-muted mb-5">
            Hãy tham khảo các khách sạn sang trọng và chọn cho mình một căn phòng ưng ý nhé.
          </p>
          <RouterLink to="/hotels" class="btn btn-premium px-5 py-3">Khám phá ngay</RouterLink>
        </div>

        <div v-else class="row g-4">
          <!-- Cart Items List -->
          <div class="col-lg-8">
            <div class="d-flex flex-column gap-3">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="glass-panel p-3 border-0 shadow-soft bg-white"
              >
                <div class="row g-3 align-items-center">
                  <div class="col-md-3">
                    <img
                      :src="
                        item.room?.room_image ||
                        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=400'
                      "
                      class="rounded-3 w-100"
                      style="height: 120px; object-fit: cover"
                    />
                  </div>
                  <div class="col-md-6">
                    <div
                      class="small text-uppercase fw-bold text-muted mb-1"
                      style="letter-spacing: 1px; font-size: 0.7rem"
                    >
                      {{ item.room?.hotel_name }}
                    </div>
                    <h5 class="fw-bold mb-2">{{ item.room?.room_name }}</h5>
                    <div class="d-flex gap-3 small text-muted">
                      <span
                        ><i class="far fa-calendar-alt me-1"></i> {{ formatDate(item.checkin) }} -
                        {{ formatDate(item.checkout) }}</span
                      >
                    </div>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <div class="fw-bold fs-5 mb-3">{{ formatPrice(item.price_at_time) }}₫</div>
                    <button
                      @click="removeItem(item.id)"
                      class="btn btn-link text-danger text-decoration-none p-0 small"
                    >
                      <i class="fas fa-trash-alt me-1"></i> Xóa phòng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Sidebar -->
          <div class="col-lg-4">
            <div
              class="glass-panel p-4 sticky-top bg-white"
              style="top: 100px; border-radius: 20px"
            >
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
                <hr class="my-0 opacity-10" />
                <div class="d-flex justify-content-between fw-bold fs-4 text-dark pt-2">
                  <span>Tổng cộng</span>
                  <span>{{ formatPrice(cartStore.totalPrice * 1.1) }}₫</span>
                </div>
              </div>

              <RouterLink
                to="/checkout"
                class="btn btn-premium py-3 d-flex align-items-center justify-content-center gap-2"
              >
                Tiến hành đặt phòng
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
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
      </div>

      <!-- History Tab -->
      <div v-else-if="activeTab === 'history'">
        <div v-if="isLoadingBookings" class="text-center py-5">
          <div class="spinner-border text-gold" role="status"></div>
        </div>

        <div v-else-if="bookings.length === 0" class="text-center py-5 glass-panel bg-white">
          <div class="mb-4">
            <i class="fas fa-inbox display-1 text-muted opacity-25"></i>
          </div>
          <h3 class="fw-bold text-dark mb-3">Chưa có lịch sử đặt phòng</h3>
          <p class="text-muted mb-5">
            Bạn chưa đặt phòng nào. Hãy bắt đầu khám phá các khách sạn tuyệt vời!
          </p>
          <RouterLink to="/hotels" class="btn btn-premium px-5 py-3">Tìm phòng ngay</RouterLink>
        </div>

        <div v-else class="d-flex flex-column gap-4">
          <div
            v-for="booking in bookings"
            :key="booking.id"
            class="glass-panel p-4 border-0 shadow-soft bg-white"
          >
            <!-- Booking Header -->
            <div class="d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom">
              <div>
                <h5 class="fw-bold mb-2">Đơn đặt phòng #{{ booking.id }}</h5>
                <div class="d-flex gap-4 text-muted small">
                  <span><i class="fas fa-user me-1"></i> {{ booking.guest_name }}</span>
                  <span
                    ><i class="fas fa-calendar me-1"></i> {{ formatDate(booking.created_at) }}</span
                  >
                  <span><i class="fas fa-phone me-1"></i> {{ booking.guest_phone }}</span>
                </div>
              </div>
              <div class="text-end">
                <div class="mb-2">
                  <span class="badge" :class="getStatusBadge(booking.status)">
                    {{ getStatusText(booking.status) }}
                  </span>
                  <span class="badge ms-2" :class="getPaymentBadge(booking.payment_status)">
                    {{ getPaymentText(booking.payment_status) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Booking Details -->
            <div class="mb-4">
              <h6 class="fw-bold mb-3">Chi tiết phòng:</h6>
              <div class="row g-3">
                <div v-for="detail in booking.details" :key="detail.id" class="col-md-6">
                  <div class="p-3 bg-light rounded-3">
                    <div class="fw-bold mb-2">{{ detail.room_name }}</div>
                    <div class="text-muted small mb-2">
                      <div>
                        <i class="fas fa-calendar me-1"></i> {{ formatDate(detail.checkin) }} -
                        {{ formatDate(detail.checkout) }}
                      </div>
                      <div>
                        <i class="fas fa-users me-1"></i> {{ detail.number_of_guests }} khách
                      </div>
                      <div><i class="fas fa-moon me-1"></i> {{ detail.nights }} đêm</div>
                    </div>
                    <div class="fw-bold text-gold">{{ formatPrice(detail.subtotal) }}₫</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total & Actions -->
            <div class="d-flex justify-content-between align-items-center pt-3 border-top">
              <div>
                <span class="text-muted">Tổng tiền:</span>
                <span class="fs-5 fw-bold ms-2 text-gold"
                  >{{ formatPrice(booking.total_price) }}₫</span
                >
              </div>
              <div class="d-flex gap-2">
                <button
                  v-if="canCancel(booking)"
                  @click="cancelBooking(booking.id)"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="isCancelling"
                >
                  <span v-if="isCancelling" class="spinner-border spinner-border-sm me-1"></span>
                  <i v-else class="fas fa-ban me-1"></i> Hủy đơn
                </button>
                <button
                  v-if="canFeedback(booking)"
                  @click="openFeedbackModal(booking)"
                  class="btn btn-outline-primary btn-sm"
                >
                  <i class="fas fa-star me-1"></i> Đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Feedback Modal -->
    <div v-if="showFeedbackModal" class="feedback-overlay" @click.self="showFeedbackModal = false">
      <div class="feedback-modal glass-panel">
        <div class="feedback-header">
          <h3 class="fw-bold mb-1">Đánh giá trải nghiệm</h3>
          <p class="text-muted small">Cảm ơn bạn đã tin tưởng dịch vụ của StayGo</p>
          <button @click="showFeedbackModal = false" class="btn-close-custom">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="feedback-body">
          <div class="rating-section mb-4">
            <label class="form-label-custom">Điểm chất lượng</label>
            <div class="stars-container">
              <button
                v-for="star in 5"
                :key="star"
                @click="feedbackForm.rating = star"
                class="star-btn"
                :class="{ active: star <= feedbackForm.rating }"
              >
                <i :class="star <= feedbackForm.rating ? 'fas fa-star' : 'far fa-star'"></i>
              </button>
            </div>
            <div class="rating-text text-gold fw-bold mt-2">
              {{ feedbackForm.rating === 5 ? 'Tuyệt vời!' : feedbackForm.rating >= 4 ? 'Hài lòng' : 'Bình thường' }}
            </div>
          </div>

          <div class="comment-section mb-4">
            <label class="form-label-custom">Bình luận của bạn</label>
            <textarea
              v-model="feedbackForm.content"
              class="feedback-textarea"
              rows="4"
              placeholder="Hãy chia sẻ cảm nhận của bạn về căn phòng này..."
              maxlength="500"
            ></textarea>
            <div class="text-end mt-1">
              <small class="text-muted">{{ feedbackForm.content.length }}/500 ký tự</small>
            </div>
          </div>
        </div>

        <div class="feedback-footer">
          <button @click="showFeedbackModal = false" class="btn-cancel">Quay lại</button>
          <button
            @click="submitFeedback"
            class="btn-submit-premium"
            :disabled="isSubmittingFeedback"
          >
            <span v-if="isSubmittingFeedback" class="spinner-border spinner-border-sm me-2"></span>
            Gửi đánh giá ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import Header from '@/components/home/Header.vue'
import api from '@/api/axios'

const cartStore = useCartStore()
const activeTab = ref('cart')
const bookings = ref([])
const isLoadingBookings = ref(false)
const isCancelling = ref(false)
const isSubmittingFeedback = ref(false)
const showFeedbackModal = ref(false)
const selectedBooking = ref(null)

const feedbackForm = reactive({
  rating: 5,
  content: '',
})

onMounted(() => {
  cartStore.fetchCart()
  fetchBookings()
})

const fetchBookings = async () => {
  isLoadingBookings.value = true
  try {
    const { data } = await api.get('/bookings')
    bookings.value = data.data || []
  } catch (error) {
    console.error('Error fetching bookings:', error)
  } finally {
    isLoadingBookings.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const removeItem = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa phòng này ra khỏi giỏ hàng?')) {
    try {
      await cartStore.removeFromCart(id)
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa mục')
    }
  }
}

const canCancel = (booking) => {
  return booking.status === 'pending' && booking.payment_status === 'unpaid'
}

const canFeedback = (booking) => {
  return booking.status === 'confirmed' || booking.status === 'completed'
}

const cancelBooking = async (bookingId) => {
  if (!confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này?')) return

  isCancelling.value = true
  try {
    await api.delete(`/bookings/${bookingId}`)
    await fetchBookings()
    alert('Hủy đơn đặt phòng thành công')
  } catch (error) {
    alert(error.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn')
  } finally {
    isCancelling.value = false
  }
}

const openFeedbackModal = (booking) => {
  selectedBooking.value = booking
  feedbackForm.rating = 5
  feedbackForm.content = ''
  showFeedbackModal.value = true
}

const submitFeedback = async () => {
  if (
    !selectedBooking.value ||
    !selectedBooking.value.details ||
    !selectedBooking.value.details.length
  ) {
    alert('Không tìm thấy chi tiết đơn đặt phòng')
    return
  }

  if (feedbackForm.rating < 1 || feedbackForm.content.trim().length === 0) {
    alert('Vui lòng chọn đánh giá sao và viết bình luận')
    return
  }

  isSubmittingFeedback.value = true
  try {
    // Submit feedback for first room detail (can extend to all details)
    const detail = selectedBooking.value.details[0]
    await api.post('/feedback', {
      booking_id: selectedBooking.value.id,
      booking_detail_id: detail.id,
      hotel_id: detail.hotel_id,
      rating: feedbackForm.rating,
      content: feedbackForm.content,
    })
    alert('Cảm ơn bạn đã đánh giá!')
    showFeedbackModal.value = false
    await fetchBookings()
  } catch (error) {
    alert(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá')
  } finally {
    isSubmittingFeedback.value = false
  }
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  }
  return statusMap[status] || status
}

const getStatusBadge = (status) => {
  const classMap = {
    pending: 'bg-warning',
    confirmed: 'bg-info',
    completed: 'bg-success',
    cancelled: 'bg-danger',
  }
  return classMap[status] || 'bg-secondary'
}

const getPaymentText = (status) => {
  const statusMap = {
    unpaid: 'Chưa thanh toán',
    paid: 'Đã thanh toán',
  }
  return statusMap[status] || status
}

const getPaymentBadge = (status) => {
  const classMap = {
    unpaid: 'bg-warning text-dark',
    paid: 'bg-success',
  }
  return classMap[status] || 'bg-secondary'
}
</script>

<style scoped>
.text-gold {
  color: var(--color-gold) !important;
}

.nav-link {
  color: #666;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-gold);
}

.nav-link.active {
  color: var(--color-gold);
  border-bottom: 3px solid var(--color-gold);
}

/* Feedback Modal Styles */
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.feedback-modal {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.feedback-header {
  margin-bottom: 24px;
}

.btn-close-custom {
  position: absolute;
  top: 24px;
  right: 24px;
  border: none;
  background: #f5f5f5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-close-custom:hover {
  background: #eee;
  transform: rotate(90deg);
}

.form-label-custom {
  display: block;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
}

.stars-container {
  display: flex;
  gap: 12px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #ddd;
  cursor: pointer;
  transition: all 0.2s;
}

.star-btn.active {
  color: var(--color-gold);
  transform: scale(1.1);
}

.feedback-textarea {
  width: 100%;
  border: 1.5px solid #eee;
  border-radius: 16px;
  padding: 16px;
  outline: none;
  transition: all 0.2s;
  resize: none;
}

.feedback-textarea:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 4px rgba(220, 180, 100, 0.1);
}

.feedback-footer {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 1.5px solid #eee;
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f9f9f9;
}

.btn-submit-premium {
  flex: 2;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.btn-submit-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #000 0%, #222 100%);
}

.btn-submit-premium:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>
