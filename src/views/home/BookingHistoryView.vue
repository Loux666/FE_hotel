<template>
  <div class="history-page bg-light min-vh-100 pb-5">
    <Header />
    <main class="container pt-5 mt-5">
      <div class="row align-items-center mb-5">
        <div class="col-md-8">
           <h1 class="display-6 fw-bold luxury-title mb-1">Lịch Sử Đặt Phòng</h1>
           <p class="text-muted">Xem lại các hành trình tuyệt vời bạn đã trải qua cùng StayGo.</p>
        </div>
        <div class="col-md-4 text-md-end">
           <button @click="fetchHistory" class="btn btn-outline-dark rounded-pill px-4 py-2">
             <i class="fas fa-sync-alt me-2"></i>Làm mới
           </button>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-gold" role="status"></div>
      </div>

      <div v-else-if="bookings.length === 0" class="text-center py-5 glass-panel bg-white shadow-soft">
        <div class="mb-4 opacity-25">
           <i class="fas fa-history fs-1" style="font-size: 80px;"></i>
        </div>
        <h3 class="fw-bold mb-3">Bạn chưa có đơn đặt phòng nào</h3>
        <p class="text-muted mb-5">Những chuyến đi thú vị đang chờ đợi bạn phía trước.</p>
        <RouterLink to="/hotels" class="btn btn-premium px-5 py-3 rounded-pill">Bắt đầu ngay hôm nay</RouterLink>
      </div>

      <div v-else class="d-flex flex-column gap-4">
        <div v-for="booking in bookings" :key="booking.id" class="booking-card glass-panel bg-white shadow-soft overflow-hidden border-0" style="border-radius: 20px;">
           <div class="row g-0">
              <!-- Booking Status Side (Gradient) -->
              <div class="col-lg-3 p-4 text-white d-flex flex-column justify-content-between" :class="getStatusClass(booking.status)" style="min-height: 200px;">
                 <div>
                    <div class="small text-uppercase fw-bold opacity-75 mb-1">Trạng thái đơn</div>
                    <div class="fs-4 fw-bold">{{ formatStatus(booking.status) }}</div>
                 </div>
                 <div>
                    <div class="small opacity-75">Mã đơn hàng:</div>
                    <div class="fw-bold fs-5">#STG-{{ booking.id }}</div>
                 </div>
              </div>
              
              <!-- Booking Content Details -->
              <div class="col-lg-9 p-4 p-lg-5">
                 <div class="row g-4 mb-4">
                    <div class="col-md-8">
                       <h4 class="fw-bold mb-3" style="font-family: var(--font-serif);">{{ booking.details[0]?.room?.hotel?.hotel_name || 'Khách sạn StayGo' }}</h4>
                       <div class="d-flex flex-wrap gap-4 text-muted small">
                          <span class="d-flex align-items-center gap-2"><i class="fas fa-calendar-alt text-gold"></i> {{ formatDate(booking.checkin) }} - {{ formatDate(booking.checkout) }}</span>
                          <span class="d-flex align-items-center gap-2"><i class="fas fa-bed text-gold"></i> {{ booking.details.length }} Phòng</span>
                          <span class="d-flex align-items-center gap-2"><i class="fas fa-user text-gold"></i> {{ booking.guest_name }}</span>
                       </div>
                    </div>
                    <div class="col-md-4 text-md-end border-md-start">
                       <div class="small text-muted mb-1">Tổng chi phí</div>
                       <div class="fs-3 fw-bold text-dark font-monospace">{{ formatPrice(booking.total_price) }}₫</div>
                       <span class="badge bg-light text-dark border small">{{ booking.payment_method === 'vnpay' ? 'Đã T.Toán VNPAY' : 'T.Toán tại chỗ' }}</span>
                    </div>
                 </div>

                 <!-- Detailed Rooms -->
                 <div class="bg-light rounded-4 p-3 mb-4">
                    <div v-for="detail in booking.details" :key="detail.id" class="d-flex justify-content-between align-items-center small py-2 border-bottom border-white last-no-border">
                       <span class="fw-medium">{{ detail.room?.room_name }} ({{ detail.room?.room_type }})</span>
                       <span class="text-muted">{{ formatPrice(detail.price_per_night) }}₫ / đêm</span>
                    </div>
                 </div>

                 <div class="d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
                    <button v-if="booking.status === 'pending'" @click="rePay(booking)" class="btn btn-premium px-4">Thanh toán lại</button>
                    <RouterLink :to="`/hotels/${booking.details[0]?.room?.hotel_id}`" class="btn btn-premium-outline px-4">Xem khách sạn</RouterLink>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cartService from '@/services/cartService';
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';
import api from '@/api/axios';

const bookings = ref([]);
const isLoading = ref(true);

const fetchHistory = async () => {
  isLoading.value = true;
  try {
    const { data } = await cartService.getBookingHistory();
    bookings.value = data.data;
  } catch (error) {
    console.error('Error fetching history:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchHistory);

const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');
const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

const formatStatus = (status) => {
  const map = {
    'pending': 'Chờ xử lý',
    'confirmed': 'Đã xác nhận',
    'completed': 'Đã hoàn tất',
    'cancelled': 'Đã hủy'
  };
  return map[status] || status;
};

const getStatusClass = (status) => {
  if (status === 'completed' || status === 'confirmed') return 'bg-success-gradient';
  if (status === 'cancelled') return 'bg-danger-gradient';
  return 'bg-gold-gradient';
};

const rePay = async (booking) => {
    try {
        const { data } = await api.post('/payments/init', {
            booking_id: booking.id,
            method: 'vnpay'
        });
        window.location.href = data.data.payment_url;
    } catch (error) {
        alert('Có lỗi khi khởi tạo lại thanh toán.');
    }
};
</script>

<style scoped>
.bg-success-gradient { background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%); }
.bg-danger-gradient { background: linear-gradient(135deg, #dc3545 0%, #a71d2a 100%); }
.bg-gold-gradient { background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); }
.last-no-border:last-child { border-bottom: none !important; }
.shadow-soft { box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.booking-card { transition: all 0.3s ease; }
.booking-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
</style>
