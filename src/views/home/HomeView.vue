<template>
  <div class="home-page overflow-x-hidden">
    <Header />
    <main class="min-vh-100 mt-5 pt-4">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-container">
          <div class="hero-grid">
            <div class="hero-text-area">
              <h1 class="hero-title">Nâng Tầm <br/><span class="hero-highlight">Trải Nghiệm Nghỉ Dưỡng</span></h1>
              <p class="hero-subtitle">Tìm kiếm những không gian lưu trú tinh tế và dịch vụ chuẩn mực 5 sao tại những địa danh hàng đầu.</p>
              
              <!-- Search Box -->
              <div class="search-form-container">
                <form @submit.prevent="searchHotels" class="search-form">
                  <!-- Row 1: Location, Room Type, Dates -->
                  <div class="search-row">
                    <div class="search-field">
                      <label class="search-label"><i class="fas fa-map-marker-alt"></i> Điểm đến</label>
                      <input v-model="searchQuery" type="text" class="search-input" placeholder="Ví dụ: Hà Nội..." />
                    </div>
                    <div class="search-field">
                      <label class="search-label"><i class="fas fa-bed"></i> Loại phòng</label>
                      <select v-model="roomType" class="search-select">
                        <option value="">Tất cả</option>
                        <option value="Standard">Standard</option>
                        <option value="Superior">Superior</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                        <option value="Family">Family</option>
                      </select>
                    </div>
                    <div class="search-field date-field">
                      <label class="search-label"><i class="fas fa-calendar-check"></i> Ngày nhận</label>
                      <input id="checkin-date" type="text" class="search-input" placeholder="Chọn ngày" readonly />
                    </div>
                    <div class="search-field date-field">
                      <label class="search-label"><i class="fas fa-calendar-times"></i> Ngày trả</label>
                      <input id="checkout-date" type="text" class="search-input" placeholder="Chọn ngày" readonly />
                    </div>
                  </div>

                  <!-- Row 2: Guest & Button -->
                  <div class="search-row bottom-row">
                    <div class="search-field guest-field">
                      <label class="search-label"><i class="fas fa-users"></i> Khách</label>
                      <select v-model="guests" class="search-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    <div class="search-action">
                      <button type="submit" class="search-button">
                        <i class="fas fa-search me-2"></i> Tìm phòng ngay
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us / Amenities -->
      <section class="py-5 mt-5">
        <div class="container py-5">
          <div class="row g-5 align-items-center">
             <div class="col-lg-6">
               <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Về StayGo</span>
               <h2 class="display-5 fw-bold mb-4" style="font-family: var(--font-serif);">Đẳng Cấp Từ Những <br/>Điều Nhỏ Nhất</h2>
               <p class="text-muted fs-5 mb-5">Chúng tôi không chỉ cung cấp phòng nghỉ, chúng tôi kiến tạo những trải nghiệm không gian sống nghệ thuật và tinh tế cho hành trình của bạn.</p>
               <div class="row g-4">
                 <div class="col-6">
                    <div class="d-flex align-items-center gap-3">
                       <i class="fas fa-shield-alt text-gold fs-3"></i>
                       <span class="fw-bold">Bảo mật tuyệt đối</span>
                    </div>
                 </div>
                 <div class="col-6">
                    <div class="d-flex align-items-center gap-3">
                       <i class="fas fa-medal text-gold fs-3"></i>
                       <span class="fw-bold">Dịch vụ 5 sao</span>
                    </div>
                 </div>
                 <div class="col-6">
                    <div class="d-flex align-items-center gap-3">
                       <i class="fas fa-headset text-gold fs-3"></i>
                       <span class="fw-bold">Hỗ trợ 24/7</span>
                    </div>
                 </div>
                 <div class="col-6">
                    <div class="d-flex align-items-center gap-3">
                       <i class="fas fa-tags text-gold fs-3"></i>
                       <span class="fw-bold">Giá ưu đãi tập đoàn</span>
                    </div>
                 </div>
               </div>
             </div>
             <div class="col-lg-6">
               <div class="position-relative">
                 <img src="/images/amenities.png" class="img-fluid rounded-4 shadow-lg w-100" style="object-fit: cover; height: 450px;" alt="About">
                 <div class="position-absolute bottom-0 start-0 m-n3 p-4 bg-white rounded-3 shadow-soft d-none d-md-block" style="width: 200px; z-index: 2;">
                    <div class="fs-2 fw-bold text-gold">15+</div>
                    <div class="small fw-bold text-dark">Năm kinh nghiệm trong ngành lưu trú</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      <!-- Stats / Impact Banner -->
      <section class="py-5 bg-dark text-white">
        <div class="container py-4">
          <div class="row text-center g-4">
            <div class="col-md-3 col-6">
               <div class="display-6 fw-bold text-gold">500+</div>
               <div class="text-uppercase small opacity-50 fw-bold">Khách sạn đối tác</div>
            </div>
            <div class="col-md-3 col-6">
               <div class="display-6 fw-bold text-gold">20k+</div>
               <div class="text-uppercase small opacity-50 fw-bold">Khách hàng hài lòng</div>
            </div>
            <div class="col-md-3 col-6">
               <div class="display-6 fw-bold text-gold">100+</div>
               <div class="text-uppercase small opacity-50 fw-bold">Điểm đến quốc tế</div>
            </div>
            <div class="col-md-3 col-6">
               <div class="display-6 fw-bold text-gold">4.9/5</div>
               <div class="text-uppercase small opacity-50 fw-bold">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Top Destinations (Cities) -->
      <section class="py-5 bg-light pb-5">
        <div class="container py-5 mt-4">
          <div class="text-center mb-5">
            <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Khám phá</span>
            <h2 class="display-5 fw-bold mb-3" style="font-family: var(--font-serif);">Điểm Đến Hàng Đầu</h2>
            <p class="text-muted">Các thành phố được du khách yêu thích và ghé thăm nhiều nhất.</p>
          </div>

          <div class="position-relative">
            <div ref="cityCarousel" class="top-cities-carousel custom-scrollbar mt-2 pb-4 pt-2 px-2 d-flex gap-4" style="overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scroll-behavior: smooth;">
              <div v-for="(city, idx) in topCities" :key="idx" class="city-slide flex-shrink-0" style="scroll-snap-align: start; width: 280px;">
                <div @click="goToCity(city.name)" class="card h-100 border-0 shadow-sm hover-lift overflow-hidden cursor-pointer" style="border-radius: 20px;">
                  <div class="position-relative overflow-hidden w-100">
                    <img :src="city.image" class="card-img-top w-100" :alt="city.name" style="height: 380px; object-fit: cover; transition: transform 0.5s ease;">
                    <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8)); pointer-events: none;"></div>
                    <div class="position-absolute bottom-0 start-0 p-4 text-white">
                      <h4 class="fw-bold mb-1" style="font-family: var(--font-serif);">{{ city.name }}</h4>
                      <span class="small opacity-75 d-flex align-items-center gap-2"><i class="fas fa-search-location"></i> Khám phá ngay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Carousel Nav Buttons -->
            <button @click="scrollCarousel('left')" class="btn-carousel-nav left shadow-lg">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="scrollCarousel('right')" class="btn-carousel-nav right shadow-lg">
                <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Luxury Services Section -->
      <section class="py-5 bg-white">
        <div class="container py-5">
           <div class="row align-items-center g-5">
              <div class="col-lg-6">
                 <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Trải nghiệm thượng lưu</span>
                 <h2 class="display-5 fw-bold mb-4" style="font-family: var(--font-serif);">Dịch Vụ Đẳng Cấp 5 Sao</h2>
                 <p class="text-muted mb-5">Tại StayGo, chúng tôi không chỉ cung cấp chỗ nghỉ, mà còn mang đến những trải nghiệm cá nhân hóa tinh tế nhất.</p>
                 
                 <div class="row g-4">
                    <div class="col-sm-6 d-flex align-items-start gap-3">
                       <div class="p-3 bg-light rounded-circle text-gold"><i class="fas fa-concierge-bell fs-4"></i></div>
                       <div>
                          <h6 class="fw-bold mb-1">Room Service 24/7</h6>
                          <p class="small text-muted mb-0">Phục vụ ẩm thực tại phòng bất kể thời gian.</p>
                       </div>
                    </div>
                    <!-- <div class="col-sm-6 d-flex align-items-start gap-3">
                       <div class="p-3 bg-light rounded-circle text-gold"><i class="fas fa-spa fs-4"></i></div>
                       <div>
                          <h6 class="fw-bold mb-1">Spa & Wellness</h6>
                          <p class="small text-muted mb-0">Thư giãn với các liệu trình chuyên sâu.</p>
                       </div>
                    </div> -->
                    <div class="col-sm-6 d-flex align-items-center gap-3">
                       <div class="p-3 bg-light rounded-circle text-gold"><i class="fas fa-swimmer fs-4"></i></div>
                       <div>
                          <h6 class="fw-bold mb-1">Hồ Bơi Vô Cực</h6>
                          <p class="small text-muted mb-0">View toàn cảnh thành phố/biển.</p>
                       </div>
                    </div>
                    <div class="col-sm-6 d-flex align-items-center gap-3">
                       <div class="p-3 bg-light rounded-circle text-gold"><i class="fas fa-utensils fs-4"></i></div>
                       <div>
                          <h6 class="fw-bold mb-1">Nhà Hàng Michelin</h6>
                          <p class="small text-muted mb-0">Đỉnh cao nghệ thuật ẩm thực.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-6">
                 <div class="position-relative">
                    <img src="/images/experience.png" class="img-fluid rounded-4 shadow-lg w-100" style="object-fit: cover; height: 500px;">
                    <div class="position-absolute bottom-0 start-0 m-4 p-4 glass-panel text-black rounded-3 shadow-sm d-none d-md-block" style="max-width: 300px;">
                       <h5 class="fw-bold">Hành trình đáng nhớ</h5>
                       <p class="small mb-0 opacity-75">Cam kết mang lại sự hài lòng tuyệt đối cho mỗi kỳ nghỉ của bạn.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- Recommended Rooms -->
      <section class="py-5 bg-white pb-5">
        <div class="container py-5">
          <div class="text-center mb-5">
            <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Tuyển chọn</span>
            <h2 class="display-5 fw-bold mb-3" style="font-family: var(--font-serif);">Các Phòng Gợi Ý</h2>
            <p class="text-muted">Những không gian lý tưởng nhất có sẵn cho chuyến đi của bạn.</p>
          </div>

          <div v-if="isLoadingRooms" class="text-center py-5">
            <div class="spinner-border text-gold" style="width: 3rem; height: 3rem;" role="status"></div>
          </div>
          
          <div v-else class="recommended-grid">
            <div v-for="room in recommendedRooms" :key="room.id" class="recommended-card">
              <div class="recommended-card__image-container">
                <img :src="room.room_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'" class="recommended-card__image" :alt="room.room_name">
                <div class="recommended-card__type-badge">{{ room.type }}</div>
              </div>
              <div class="recommended-card__content">
                <h5 class="recommended-card__title">{{ room.room_name }}</h5>
                <p class="recommended-card__location"><i class="fas fa-map-marker-alt"></i> {{ room.hotel_city || 'N/A' }}</p>
                
                <div class="recommended-card__footer">
                  <div class="recommended-card__price-area">
                    <span class="recommended-card__price">{{ new Intl.NumberFormat('vi-VN').format(room.price || 1500000) }}₫</span>
                    <span class="recommended-card__unit">/đêm</span>
                  </div>
                  <RouterLink :to="{ path: `/hotels/${room.hotel_id}`, query: { checkin: checkinDate, checkout: checkoutDate } }" class="recommended-card__btn">Chi tiết</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video / Experience Section -->
      <section class="py-5 position-relative overflow-hidden" style="height: 500px; background: #222 url('/images/experience.png') center/cover no-repeat;">
         <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
         <div class="container h-100 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative">
            <h2 class="display-4 fw-bold mb-4 luxury-title" style="font-family: var(--font-serif);">Hơn Cả Một Chuyến Đi</h2>
            <p class="lead mb-5" style="max-width: 600px;">Mỗi khoảnh khắc tại StayGo là một câu chuyện về sự thư thái và niềm vui sống đích thực.</p>
            <button class="btn btn-premium btn-lg rounded-circle p-0 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
               <i class="fas fa-play fs-4 ms-1"></i>
            </button>
         </div>
      </section>

      <!-- Testimonials -->
      <section class="py-5">
        <div class="container py-5">
          <div class="row g-4">
             <div v-for="i in 3" :key="i" class="col-md-4">
                <div class="glass-panel p-4 h-100 border-0 bg-light">
                   <div class="text-gold mb-3">
                      <i v-for="s in 5" :key="s" class="fas fa-star small"></i>
                   </div>
                   <p class="mb-4 italic opacity-75">"Dịch vụ tuyệt vời. Quy trình đặt phòng nhanh chóng và khách sạn thực tế còn đẹp hơn cả trên ảnh. Tôi chắc chắn sẽ quay lại."</p>
                   <div class="d-flex align-items-center gap-3">
                      <div class="bg-secondary rounded-circle" style="width: 40px; height: 40px;"></div>
                      <div>
                         <div class="fw-bold small">Khách hàng #{{i}}</div>
                         <div class="small text-muted">Doanh nhân</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHotelStore } from '@/stores/hotel';
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';
import flatpickr from 'flatpickr';
import roomService from '@/services/roomService';

const hotelStore = useHotelStore();
const router = useRouter();

const searchQuery = ref('');
const roomType = ref('');
const guests = ref('2');
const checkinDate = ref('');
const checkoutDate = ref('');
const recommendedRooms = ref([]);
const isLoadingRooms = ref(true);
const cityCarousel = ref(null);

const topCities = [
  { name: 'Hà Nội', image: '/images/hanoi.jpg' },
  { name: 'Đà Nẵng', image: '/images/danang.webp' },
  { name: 'Hồ Chí Minh', image: '/images/tphcm.webp' },
  { name: 'Hạ Long', image: '/images/halong.webp' },
  { name: 'Hội An', image: '/images/hoian.jpg' },
  { name: 'Huế', image: '/images/hue.jpg' },
  { name: 'Nha Trang', image: '/images/nhatrang.jpg' },
  { name: 'Phú Quốc', image: '/images/phuquoc.webp' },
  { name: 'Đà Lạt', image: '/images/dalat.jpg' },
  { name: 'Vũng Tàu', image: '/images/vungtau.jpg' }
];

const fetchRecommendedRooms = async () => {
    try {
        const { data } = await roomService.getRecommendedRooms();
        recommendedRooms.value = data.data;
    } catch (e) {
        console.error("Failed to load generic rooms", e);
    } finally {
        isLoadingRooms.value = false;
    }
};

const goToCity = (city) => {
    hotelStore.setSearchParams({ city });
    router.push({ path: '/hotels', query: { city } });
};

const scrollCarousel = (direction) => {
    if (!cityCarousel.value) return;
    const scrollAmount = 300;
    cityCarousel.value.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
};

onMounted(() => {
  fetchRecommendedRooms();
  
  flatpickr("#checkin-date", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
            checkinDate.value = selectedDates[0].toISOString().split('T')[0];
        }
    }
  });

  flatpickr("#checkout-date", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
            checkoutDate.value = selectedDates[0].toISOString().split('T')[0];
        }
    }
  });
});

const searchHotels = () => {
  if (!searchQuery.value || !checkinDate.value || !checkoutDate.value) {
    alert('Vui lòng điền đầy đủ: Địa điểm, Ngày nhận và Ngày trả phòng!');
    return;
  }

  const query = {
    city: searchQuery.value,
    guests: guests.value,
    type: roomType.value || undefined,
    checkin: checkinDate.value,
    checkout: checkoutDate.value
  };

  hotelStore.setSearchParams(query);
  router.push({ 
    path: '/hotels', 
    query 
  });
};
</script>

<style scoped>
/* Scoped Styles For Home View Additions */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  height: 95vh;
  background: #222 url('/images/hero-banner.png') center/cover no-repeat fixed;
}
.hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #121212;
  opacity: 0.4;
}
.hero-container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 1;
  color: #fff;
}
.hero-grid {
  display: flex;
  flex-wrap: wrap;
}
.hero-text-area {
  width: 75%;
  padding-top: 3rem;
}
@media (max-width: 768px) {
  .hero-text-area { width: 100%; text-align: center; }
}
.hero-title {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 30px rgba(0,0,0,0.5);
  color: var(--color-gold);
}
.hero-highlight { color: var(--color-gold); }
.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 3rem;
  max-width: 650px;
  opacity: 0.75;
}

.search-form-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  max-width: 1100px;
}
.search-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.search-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  width: 100%;
}
.search-row.bottom-row {
  grid-template-columns: 200px 1fr;
  align-items: flex-end;
}
.search-field { 
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

@media (max-width: 1100px) {
  .search-row { grid-template-columns: repeat(2, 1fr); }
  .search-row.bottom-row { grid-template-columns: 1fr 1.5fr; }
}

@media (max-width: 768px) {
  .search-row { grid-template-columns: 1fr; }
  .search-row.bottom-row { grid-template-columns: 1fr; }
}

.search-label {
  display: block;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 0.6rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-label i { color: var(--color-gold); margin-right: 0.5rem; }

/* Recommended Rooms Aesthetics */
.recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.recommended-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}
.recommended-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}
.recommended-card__image-container {
  position: relative;
  height: 240px;
  overflow: hidden;
}
.recommended-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.recommended-card:hover .recommended-card__image {
  transform: scale(1.1);
}
.recommended-card__type-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255,255,255,0.9);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-dark);
  backdrop-filter: blur(5px);
}
.recommended-card__content {
  padding: 1.5rem;
}
.recommended-card__title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-dark);
}
.recommended-card__location {
  color: var(--color-gray);
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.recommended-card__location i { color: var(--color-gold); }

.recommended-card__footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recommended-card__price {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-dark);
}
.recommended-card__unit {
  font-size: 0.7rem;
  color: var(--color-gray);
  margin-left: 2px;
}
.recommended-card__btn {
  text-decoration: none;
  color: var(--color-dark);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 18px;
  border: 1px solid var(--color-dark);
  border-radius: 50px;
  transition: all 0.3s ease;
}
.recommended-card__btn:hover {
  background: var(--color-dark);
  color: var(--color-gold);
}

.search-input, .search-select {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 0.95rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.03);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.search-button {
  width: 100%;
  height: 56px;
  background-color: #121212;
  color: var(--color-gold);
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
}
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--color-light); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-gold); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #b5952f; 
}
.city-slide .card:hover img {
    transform: scale(1.08) !important;
}

.italic { font-style: italic; }
.btn-carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    border: none;
    color: var(--color-darker);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s ease;
}
.btn-carousel-nav:hover {
    background: var(--color-gold);
    color: white;
}
.btn-carousel-nav.left { left: -22px; }
.btn-carousel-nav.right { right: -22px; }

@media (max-width: 768px) {
    .btn-carousel-nav { display: none; }
}
.ls-2 { letter-spacing: 2px; }
.m-n3 { margin: -1rem; }
.shadow-soft { box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.card:hover img { transform: scale(1.08); transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
</style>
