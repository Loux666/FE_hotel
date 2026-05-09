<template>
  <div class="promotions-page bg-light min-vh-100 pb-5">
    <Header />
    <main class="container pt-5 mt-5">
      <div class="text-center mb-5">
        <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Đặc quyền</span>
        <h1 class="display-5 fw-bold luxury-title">Ưu Đãi Nghỉ Dưỡng</h1>
        <p class="text-muted">Khám phá các chương trình khuyến mãi hấp dẫn dành riêng cho hội viên của StayGo.</p>
      </div>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-gold" role="status"></div>
      </div>

      <div v-else-if="coupons.length === 0" class="text-center py-5">
        <p class="text-muted fs-5">Hiện tại chưa có chương trình khuyến mãi nào. Hãy quay lại sau nhé!</p>
      </div>

      <div v-else class="row g-4">
        <div v-for="coupon in coupons" :key="coupon.id" class="col-lg-6">
          <div class="coupon-card glass-panel bg-white p-4 shadow-soft d-flex align-items-center gap-4 border-0" style="border-radius: 20px; border-left: 6px solid var(--color-gold) !important;">
            <div class="coupon-icon bg-gold text-white p-4 rounded-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
               <i class="fas fa-ticket-alt fs-2"></i>
            </div>
            <div class="flex-grow-1">
               <div class="d-flex justify-content-between align-items-start mb-1">
                 <h4 class="fw-bold mb-0">{{ coupon.name || 'Giảm giá cực sốc' }}</h4>
                 <span class="badge bg-gold text-dark px-2 py-1 rounded-3 small">HSD: {{ formatDate(coupon.expiry_date) }}</span>
               </div>
               <p class="text-muted mb-3 small opacity-75">{{ coupon.description || 'Ưu đãi cho đơn phòng từ 2 triệu đồng.' }}</p>
               <div class="d-flex justify-content-between align-items-center">
                  <div class="coupon-code-box px-3 py-2 bg-light rounded-3 font-monospace fw-bold text-gold border border-gold-subtle" style="font-size: 1.1rem; letter-spacing: 2px;">
                    {{ coupon.code }}
                  </div>
                  <button @click="copyCode(coupon.code)" class="btn btn-dark btn-sm rounded-pill px-4 py-2">Sao chép</button>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Special Banner -->
      <div class="row mt-5 pt-5">
         <div class="col-12">
            <div class="card border-0 bg-dark text-white overflow-hidden" style="border-radius: 24px; min-height: 250px;">
               <div class="row g-0 h-100 align-items-center">
                  <div class="col-lg-7 p-5">
                     <h2 class="display-6 fw-bold mb-3 text-gold">Thành Viên Elite</h2>
                     <p class="opacity-75 mb-4">Gia nhập cộng đồng StayGo Elite để nhận ngay ưu đãi giảm 20% cho tất cả các đơn phòng và dịch vụ đưa đón sân bay miễn phí.</p>
                     <button class="btn btn-premium px-5 py-3 rounded-pill">Đăng ký thành viên</button>
                  </div>
                  <div class="col-lg-5 d-none d-lg-block">
                     <img src="https://images.unsplash.com/photo-1549463599-2424fa6050b1?q=80&w=800" class="w-100 h-100" style="object-fit: cover; opacity: 0.6;">
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
import hotelService from '@/services/hotelService';
import { useNotificationStore } from '@/stores/notification';
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';

const coupons = ref([]);
const isLoading = ref(true);
const notificationStore = useNotificationStore();

onMounted(async () => {
  try {
    const { data } = await hotelService.getCoupons();
    coupons.value = data.data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');

const copyCode = (code) => {
  navigator.clipboard.writeText(code);
  notificationStore.success(`Đã sao chép mã: ${code}`);
};
</script>

<style scoped>
.coupon-card { transition: all 0.3s ease; }
.coupon-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.1); }
.bg-gold { background-color: var(--color-gold); }
.border-gold-subtle { border-color: rgba(212, 175, 55, 0.2) !important; }
</style>
