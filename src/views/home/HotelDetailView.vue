<template>
  <div class="hotel-detail-page bg-light min-vh-100">
    <Header />
    
    <main v-if="hotel" class="container pt-5 mt-5 pb-5">
      <!-- Hotel Header Section -->
      <section class="row mb-5">
        <div class="col-lg-8">
          <div class="glass-panel overflow-hidden mb-4" style="border-radius: 24px;">
            <img :src="hotel.hotel_image" class="w-100 hotel-hero-img" :alt="hotel.hotel_name" style="height: 500px; object-fit: cover;">
          </div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="badge bg-gold px-3 py-2 text-dark fw-bold rounded-pill">
              ★ {{ hotel.average_rating || '5.0' }} (Đánh giá cao)
            </span>
            <span class="text-muted fw-medium"><i class="fas fa-map-marker-alt me-1"></i> {{ hotel.hotel_city }}</span>
          </div>
          <h1 class="display-5 fw-bold mb-3 luxury-title">{{ hotel.hotel_name }}</h1>
          <p class="lead text-muted">{{ hotel.hotel_description }}</p>
        </div>
        
        <div class="col-lg-4">
          <div class="glass-panel p-4 sticky-top" style="top: 100px; border-radius: 20px;">
            <h4 class="fw-bold mb-4">Thông tin khách sạn</h4>
            <div class="d-flex flex-column gap-3">
              <div class="d-flex align-items-center gap-3">
                <div class="icon-box bg-light p-2 rounded-circle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <div class="small text-muted">Liên hệ</div>
                  <div class="fw-medium">{{ hotel.hotel_phone || 'N/A' }}</div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3">
                <div class="icon-box bg-light p-2 rounded-circle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div>
                  <div class="small text-muted">An ninh</div>
                  <div class="fw-medium">Đảm bảo 24/7</div>
                </div>
              </div>
            </div>
            <hr class="my-4 opacity-10">
            <div class="text-center">
              <p class="small text-muted mb-3 italic">"Trải nghiệm sự tiện nghi bậc nhất tại {{ hotel.hotel_name }}"</p>
              <button @click="scrollToRooms" class="btn btn-premium w-100 py-3">Xem phòng trống</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Rooms Section -->
      <section id="rooms-section" class="mt-5">
        <h2 class="display-6 fw-bold mb-4" style="font-family: var(--font-serif);">Phòng Nghỉ & Bảng Giá</h2>
        
        <!-- Date Filter Card -->
        <div class="glass-panel p-4 mb-5 shadow-soft d-flex align-items-end justify-content-between flex-wrap gap-4" style="border-radius: 20px; border-left: 5px solid var(--color-gold) !important;">
           <div class="flex-grow-1" style="min-width: 200px;">
              <label class="form-label small fw-bold text-uppercase text-muted mb-2"><i class="fas fa-calendar-check text-gold me-2"></i>Ngày nhận</label>
              <input id="detail-checkin" type="text" class="form-control border-light bg-white shadow-sm py-2" placeholder="Chọn ngày" style="border-radius: 12px; cursor: pointer;" readonly>
           </div>
           <div class="flex-grow-1" style="min-width: 200px;">
              <label class="form-label small fw-bold text-uppercase text-muted mb-2"><i class="fas fa-calendar-times text-gold me-2"></i>Ngày trả</label>
              <input id="detail-checkout" type="text" class="form-control border-light bg-white shadow-sm py-2" placeholder="Chọn ngày" style="border-radius: 12px; cursor: pointer;" readonly>
           </div>
           <div class="flex-grow-1" style="min-width: 150px;">
              <label class="form-label small fw-bold text-uppercase text-muted mb-2">Loại phòng</label>
              <select v-model="filterType" class="form-select border-light bg-white shadow-sm py-2" style="border-radius: 12px;">
                <option value="">Tất cả</option>
                <option v-for="t in roomTypes" :key="t" :value="t">{{ t }}</option>
              </select>
           </div>
           <div class="flex-grow-1" style="min-width: 100px;">
              <label class="form-label small fw-bold text-uppercase text-muted mb-2">Khách</label>
              <select v-model="filterGuests" class="form-select border-light bg-white shadow-sm py-2" style="border-radius: 12px;">
                <option value="">Tất cả</option>
                <option v-for="g in 5" :key="g" :value="g">{{ g }}</option>
              </select>
           </div>
           <div>
              <button @click="fetchHotel" class="btn btn-premium px-4 py-2 mb-1" style="border-radius: 12px; height: 44px;">Cập nhật</button>
           </div>
        </div>

        <div v-if="hotel.rooms.length === 0" class="text-center py-5 text-danger glass-panel" style="border-radius: 20px;">
           <i class="fas fa-exclamation-circle display-1 opacity-25 mb-3"></i>
           <h4>Rất tiếc! Hiện tại không có phòng nào khả dụng.</h4>
           <p class="text-muted">Vui lòng thử lại với khoảng thời gian khác hoặc liên hệ khách sạn.</p>
        </div>

        <div v-else class="row g-4">
          <div v-for="room in hotel.rooms" :key="room.id" class="col-md-12">
            <div class="card border-0 shadow-soft overflow-hidden hover-lift" style="border-radius: 24px;">
              <div class="row g-0">
                <div class="col-lg-4">
                  <img :src="room.room_image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop'" class="img-fluid h-100 w-100" alt="Room" style="object-fit: cover; min-height: 250px;">
                </div>
                <div class="col-lg-8 card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div class="d-flex justify-content-between align-items-start mb-2">
                       <h3 class="h4 fw-bold mb-0">{{ room.room_name }}</h3>
                       <span class="badge bg-light text-dark px-3 py-2 rounded-pill border">{{ room.type }}</span>
                    </div>
                    <p class="text-muted mb-4 pt-2">{{ room.room_description }}</p>
                     <div class="d-flex flex-wrap gap-3 mb-4">
                        <div class="d-flex align-items-center gap-2 small text-muted bg-light px-3 py-1 rounded-pill">
                          <i class="fas fa-users text-gold"></i>
                          Sức chứa: {{ room.capacity }} người
                        </div>
                        <div class="d-flex align-items-center gap-2 small text-muted bg-light px-3 py-1 rounded-pill">
                          <i class="fas fa-concierge-bell text-gold"></i>
                          Room Service 24/7
                        </div>
                        <div class="d-flex align-items-center gap-2 small text-muted bg-light px-3 py-1 rounded-pill">
                          <i class="fas fa-wifi text-gold"></i>
                          Wifi miễn phí
                        </div>
                     </div>
                  </div>
                  
                  <div class="d-flex justify-content-between align-items-center border-top pt-3">
                    <div>
                      <span class="small text-muted d-block">Giá mỗi đêm</span>
                      <span class="fs-4 fw-bold text-dark font-monospace">{{ formatPrice(room.price) }}₫</span>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                      <div class="d-flex flex-column">
                        <span class="small text-muted mb-1 text-end">Số khách</span>
                        <select v-model="roomGuests[room.id]" class="form-select form-select-sm border-light fw-bold" style="border-radius: 8px; width: 90px; cursor: pointer;">
                          <option v-for="g in room.capacity" :key="g" :value="g">{{ g }}</option>
                        </select>
                      </div>
                      <button @click="addToCart(room)" class="btn btn-premium d-flex align-items-center gap-2 px-4 py-3 h-100" :disabled="isAdding === room.id">
                        <span v-if="isAdding === room.id" class="spinner-border spinner-border-sm"></span>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feedback Section -->
      <section class="mt-5 pt-5 border-top">
        <div class="d-flex align-items-center justify-content-between mb-4">
           <h2 class="display-6 fw-bold mb-0" style="font-family: var(--font-serif);">Đánh Giá Từ Khách Hàng</h2>
           <div class="d-flex align-items-center gap-2">
             <span class="fs-4 fw-bold text-gold">{{ hotel.average_rating || '5.0' }}</span>
             <div class="text-gold small">
                <!-- Hiển thị sao dựa trên rating -->
                <i class="fas fa-star" v-for="n in 5" :key="n" :class="{'opacity-25': n > Math.round(hotel.average_rating || 5)}"></i>
             </div>
             <span class="text-muted small">({{ hotel.feedbacks?.length || 0 }} đánh giá)</span>
           </div>
        </div>

        <div v-if="!hotel.feedbacks || hotel.feedbacks.length === 0" class="text-center py-5 glass-panel" style="border-radius: 20px;">
           <p class="text-muted">Chưa có đánh giá nào cho khách sạn này.</p>
        </div>

        <div v-else class="row g-4">
           <div v-for="fb in hotel.feedbacks" :key="fb.id" class="col-md-6">
              <div class="glass-panel p-4 h-100 shadow-soft border-0" style="border-radius: 20px; background: white;">
                 <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="user-avatar bg-gold text-dark d-flex align-items-center justify-content-center fw-bold rounded-circle" style="width: 48px; height: 48px; min-width: 48px; background-color: var(--color-gold) !important;">
                       {{ fb.user?.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div>
                       <div class="fw-bold">{{ fb.user?.name || 'Người dùng ẩn danh' }}</div>
                       <div class="text-gold small">
                          <i class="fas fa-star" v-for="n in 5" :key="n" :class="{'opacity-25': n > fb.rating}"></i>
                       </div>
                    </div>
                    <div class="ms-auto text-muted small">
                       {{ new Date(fb.created_at).toLocaleDateString('vi-VN') }}
                    </div>
                 </div>
                 <p class="text-muted mb-0 italic" style="font-size: 0.95rem; line-height: 1.6;">"{{ fb.content }}"</p>
              </div>
           </div>
        </div>
      </section>
    </main>

    <!-- Error State -->
    <div v-else-if="error" class="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
      <div class="mb-4">
        <i class="fas fa-exclamation-circle text-danger display-1 shadow-sm rounded-circle"></i>
      </div>
      <h2 class="fw-bold mb-3">{{ error }}</h2>
      <p class="text-muted mb-5">Có vẻ như ID khách sạn không hợp lệ hoặc đã xảy ra lỗi kết nối.</p>
      <RouterLink to="/hotels" class="btn btn-premium px-5 py-3">Quay lại danh sách</RouterLink>
    </div>

    <!-- Loading State -->
    <div v-else class="min-vh-100 d-flex align-items-center justify-content-center">
      <div class="spinner-border text-gold" style="width: 4rem; height: 4rem;" role="status"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import hotelService from '@/services/hotelService';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import Header from '@/components/home/Header.vue';
import flatpickr from 'flatpickr';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const hotel = ref(null);
const isAdding = ref(null);
const checkinDate = ref('');
const checkoutDate = ref('');
const datesSelected = ref(false);
const filterType = ref(route.query.type || '');
const filterGuests = ref(route.query.guests || '');
const error = ref(null);
const isLoading = ref(true);
const roomGuests = reactive({});

const roomTypes = ['Standard', 'Superior', 'Deluxe', 'Suite', 'Family'];

const fetchHotel = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const params = {
        type: filterType.value || undefined,
        guests: filterGuests.value || undefined
    };
    if (checkinDate.value && checkoutDate.value) {
        params.checkin = checkinDate.value;
        params.checkout = checkoutDate.value;
    }
    const { data } = await hotelService.getHotelById(route.params.id, params);
    hotel.value = data.data;

    // Initialize guests count for each room based on filter or default 1
    if (hotel.value && hotel.value.rooms) {
      hotel.value.rooms.forEach(room => {
        roomGuests[room.id] = filterGuests.value ? parseInt(filterGuests.value) : 1;
      });
    }
  } catch (err) {
    console.error('Error fetching hotel detail:', err);
    error.value = 'Không thể tải thông tin khách sạn. Vui lòng thử lại sau.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Check if dates are passed from URL query
  if (route.query.checkin && route.query.checkout) {
      checkinDate.value = route.query.checkin;
      checkoutDate.value = route.query.checkout;
      datesSelected.value = true;
  }
  
  const initPickers = () => {
      flatpickr("#detail-checkin", {
        minDate: "today",
        dateFormat: "Y-m-d",
        defaultDate: checkinDate.value || null,
        onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
                const d = selectedDates[0];
                checkinDate.value = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                datesSelected.value = !!(checkinDate.value && checkoutDate.value);
            }
        }
      });
      flatpickr("#detail-checkout", {
        minDate: "today",
        dateFormat: "Y-m-d",
        defaultDate: checkoutDate.value || null,
        onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
                const d = selectedDates[0];
                checkoutDate.value = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                datesSelected.value = !!(checkinDate.value && checkoutDate.value);
            }
        }
      });
  };

  fetchHotel().then(() => {
    setTimeout(initPickers, 500);
  });
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

const scrollToRooms = () => {
  document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
};

const addToCart = async (room) => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  
  if (!checkinDate.value || !checkoutDate.value) {
    alert('Vui lòng chọn ngày nhận và trả phòng trước khi thêm vào giỏ!');
    scrollToRooms();
    return;
  }
  
  isAdding.value = room.id;
  try {
    await cartStore.addToCart({
      room_id: room.id,
      checkin: checkinDate.value,
      checkout: checkoutDate.value,
      number_of_guests: roomGuests[room.id] || 1
    });
    alert('Đã thêm phòng vào giỏ hàng!');
  } catch (error) {
    alert(error.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
  } finally {
    isAdding.value = null;
  }
};
</script>

<style scoped>
.hotel-hero-img {
  transition: transform 0.5s ease;
}
.hotel-hero-img:hover {
  transform: scale(1.02);
}
.bg-gold {
  background-color: var(--color-gold) !important;
}
.text-gold {
  color: var(--color-gold) !important;
}
</style>
