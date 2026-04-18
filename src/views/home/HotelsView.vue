<template>
  <div class="hotels-page bg-light min-vh-100 pb-5">
    <Header />
    <main class="container pt-5 mt-5">
      <div class="row mb-4 align-items-end">
        <div class="col-md-5">
          <span class="text-uppercase fw-bold mb-2 d-block" style="color: var(--color-gold); letter-spacing: 2px; font-size: 0.9rem;">Khám Phá</span>
          <h1 class="display-6 fw-bold mb-0 luxury-title">Danh Sách Khách Sạn</h1>
        </div>
        <div class="col-md-7 d-flex align-items-center justify-content-md-end gap-4 mt-3 mt-md-0">
          <div class="d-flex align-items-center gap-2">
            <label class="small text-muted text-nowrap">Sắp xếp:</label>
            <select v-model="filters.sort" @change="applyFilters" class="form-select form-select-sm border-0 bg-white shadow-sm" style="border-radius: 8px; width: 160px;">
              <option value="">Mặc định</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="stars_desc">Hạng sao cao nhất</option>
            </select>
          </div>
          <p class="text-muted mb-0"><strong style="color:var(--color-gold)">{{ hotelStore.hotels.length }}</strong> kết quả</p>
        </div>
      </div>

      <div class="row g-5">
        <!-- Sidebar Filters -->
        <div class="col-lg-3">
          <div class="glass-panel p-4 bg-white shadow-sm sticky-top" style="top: 100px; border-radius: 20px;">
             <h5 class="fw-bold mb-4 border-bottom pb-3">Phân loại & Lọc</h5>
             
             <!-- City Filter -->
             <div class="mb-4">
                <label class="form-label small fw-bold text-uppercase text-muted">Điểm đến</label>
                <div class="position-relative">
                   <!-- <i class="fas fa-map-marker-alt position-absolute top-50 start-0 translate-middle-y ms-3 text-gold"></i> -->
                   <input v-model="filters.city" type="text" class="form-control bg-light border-0 ps-5 py-2" placeholder="Tên thành phố..." style="border-radius: 12px;">
                </div>
             </div>

             <!-- Price Range Filter -->
             <div class="mb-4">
                <label class="form-label small fw-bold text-uppercase text-muted">Mức giá / Đêm</label>
                <div class="row g-2">
                   <div class="col-6">
                      <input 
                        :value="displayMinPrice" 
                        @input="handleMinPriceInput"
                        type="text" 
                        class="form-control bg-light border-0 small py-2 text-center" 
                        placeholder="Từ" 
                        style="border-radius: 10px;"
                      >
                   </div>
                   <div class="col-6">
                      <input 
                        :value="displayMaxPrice" 
                        @input="handleMaxPriceInput"
                        type="text" 
                        class="form-control bg-light border-0 small py-2 text-center" 
                        placeholder="Đến" 
                        style="border-radius: 10px;"
                      >
                   </div>
                </div>
             </div>

             <!-- Star Rating -->
             <div class="mb-4">
                <label class="form-label small fw-bold text-uppercase text-muted mb-3">Hạng sao KS</label>
                <div class="d-flex flex-column gap-2">
                   <label class="d-flex align-items-center gap-2 cursor-pointer custom-checkbox">
                      <input type="checkbox" value="5" v-model="filters.stars" class="form-check-input mt-0">
                      <div class="text-gold">
                         <i class="fas fa-star" v-for="n in 5" :key="n"></i>
                      </div>
                   </label>
                   <label class="d-flex align-items-center gap-2 cursor-pointer custom-checkbox">
                      <input type="checkbox" value="4" v-model="filters.stars" class="form-check-input mt-0">
                      <div class="text-gold">
                         <i class="fas fa-star" v-for="n in 4" :key="n"></i>
                         <i class="far fa-star"></i>
                      </div>
                   </label>
                   <label class="d-flex align-items-center gap-2 cursor-pointer custom-checkbox">
                      <input type="checkbox" value="3" v-model="filters.stars" class="form-check-input mt-0">
                      <div class="text-gold">
                         <i class="fas fa-star" v-for="n in 3" :key="n"></i>
                         <i class="far fa-star"></i><i class="far fa-star"></i>
                      </div>
                   </label>
                </div>
             </div>
             
             <!-- Room Type Filter (If passed from home link) -->
             <div v-if="filters.type" class="mb-4 p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                <span class="small fw-medium">Đang tìm loại phòng: <strong class="text-gold">{{ filters.type }}</strong></span>
                <i class="fas fa-times cursor-pointer text-muted" @click="clearRoomType"></i>
             </div>

             <button @click="applyFilters" class="btn btn-premium w-100 py-3 mt-3 shadow-sm d-flex justify-content-center align-items-center gap-2" style="border-radius: 12px;">
                <i class="fas fa-filter"></i> Lọc kết quả
             </button>
             
             <button @click="resetFilters" class="btn btn-light w-100 py-2 mt-2 text-muted" style="border-radius: 12px; font-size: 0.9rem;">
                Xóa tất cả bộ lọc
             </button>
          </div>
        </div>

        <!-- Hotel Grid -->
        <div class="col-lg-9">
          <!-- Premium Loading State -->
          <div v-if="hotelStore.isLoading" class="premium-loader-container">
             <div class="spinner-border text-gold" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>
             <div class="premium-loader-text">Đang tìm khách sạn tốt nhất cho bạn...</div>
          </div>

          <div v-else class="row g-4">
             <div v-if="hotelStore.hotels.length === 0" class="col-12 text-center py-5 glass-panel border-0 bg-white shadow-sm" style="border-radius: 20px;">
               <div class="opacity-25 mb-3"><i class="fas fa-search-minus display-1"></i></div>
               <h4 class="fw-bold mb-2">Không tìm thấy khách sạn!</h4>
               <p class="text-muted">Thử thay đổi bộ lọc hoặc tìm một khu vực khác nhé.</p>
             </div>
             
             <div v-for="hotel in hotelStore.hotels" :key="hotel.id" class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-soft hover-lift overflow-hidden" style="border-radius: 20px;">
                  <div class="position-relative overflow-hidden">
                    <img :src="hotel.hotel_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'" class="card-img-top w-100 hotel-thumbnail" :alt="hotel.hotel_name">
                    <div class="position-absolute top-0 end-0 m-3 px-3 py-1 bg-white text-dark shadow-sm fw-bold d-flex align-items-center gap-1" style="border-radius: 30px; font-size: 0.9rem;">
                      <span class="text-gold"><i class="fas fa-star"></i></span> {{ hotel.average_rating || '5.0' }}
                    </div>
                    <div class="position-absolute bottom-0 start-0 m-3 px-3 py-1 bg-dark text-white fw-bold d-flex align-items-center gap-2" style="border-radius: 8px; font-size: 0.8rem; background: rgba(0,0,0,0.6) !important; backdrop-filter: blur(5px);">
                       <i class="fas fa-map-marker-alt text-gold"></i> {{ hotel.hotel_city }}
                    </div>
                  </div>
                  <div class="card-body p-4 bg-white d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="card-title fw-bold mb-3" style="font-family: var(--font-serif); font-size: 1.4rem;">{{ hotel.hotel_name }}</h4>
                        <!-- Mở rộng giới hạn text nếu card to hơn -->
                        <p class="card-text text-muted mb-4 small" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 40px;">{{ hotel.hotel_description }}</p>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center pt-3 border-top" style="border-color: rgba(0,0,0,0.05) !important;">
                      <div class="text-dark">
                        <span class="d-block small text-muted mb-n1">Giá chỉ từ</span>
                        <span class="fw-bold fs-5 text-dark font-monospace">{{ new Intl.NumberFormat('vi-VN').format(hotel.min_price || 0) }}₫</span>
                      </div>
                      <RouterLink :to="{ path: `/hotels/${hotel.id}`, query: { checkin: route.query.checkin, checkout: route.query.checkout } }" class="btn btn-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px; transition: background 0.3s ease;" title="Xem chi tiết">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHotelStore } from '@/stores/hotel';
import Header from '@/components/home/Header.vue';

const hotelStore = useHotelStore();
const route = useRoute();
const router = useRouter();

const filters = reactive({
  city: route.query.city || '',
  minPrice: route.query.min_price || null,
  maxPrice: route.query.max_price || null,
  type: route.query.type || '',
  stars: route.query.stars ? String(route.query.stars).split(',') : [],
  sort: route.query.sort || ''
});

// Helper format tiền tệ
const formatDisplayPrice = (val) => {
  if (val === null || val === undefined || val === '') return '';
  return String(val).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const displayMinPrice = computed(() => formatDisplayPrice(filters.minPrice));
const displayMaxPrice = computed(() => formatDisplayPrice(filters.maxPrice));

const handleMinPriceInput = (e) => {
  const rawValue = e.target.value.replace(/\D/g, "");
  filters.minPrice = rawValue ? parseInt(rawValue) : null;
  // Giữ cursor ổn định bằng cách cập nhật data trực tiếp
  e.target.value = formatDisplayPrice(rawValue);
};

const handleMaxPriceInput = (e) => {
  const rawValue = e.target.value.replace(/\D/g, "");
  filters.maxPrice = rawValue ? parseInt(rawValue) : null;
  e.target.value = formatDisplayPrice(rawValue);
};

onMounted(() => {
  applyFiltersToStore();
});

const clearRoomType = () => {
    filters.type = '';
    applyFilters();
};

const applyFiltersToStore = () => {
  hotelStore.setSearchParams({
    city: filters.city,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    type: filters.type,
    stars: filters.stars.join(',') || null,
    sort: filters.sort || null
  });
  hotelStore.fetchHotels();
};

const applyFilters = () => {
  router.push({
    path: '/hotels',
    query: {
      city: filters.city || undefined,
      min_price: filters.minPrice || undefined,
      max_price: filters.maxPrice || undefined,
      type: filters.type || undefined,
      stars: filters.stars.length > 0 ? filters.stars.join(',') : undefined,
      sort: filters.sort || undefined,
      checkin: route.query.checkin, // keep dates
      checkout: route.query.checkout
    }
  });

  applyFiltersToStore();
};

const resetFilters = () => {
    filters.city = '';
    filters.minPrice = null;
    filters.maxPrice = null;
    filters.type = '';
    filters.stars = [];
    applyFilters();
};
</script>

<style scoped>
.hotel-thumbnail {
    height: 240px; 
    object-fit: cover; 
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.card:hover .hotel-thumbnail {
  transform: scale(1.08);
}
.cursor-pointer { cursor: pointer; }
.custom-checkbox input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    border-color: #d4af37;
}
.custom-checkbox input[type="checkbox"]:checked {
    background-color: #d4af37;
    border-color: #d4af37;
}
</style>
