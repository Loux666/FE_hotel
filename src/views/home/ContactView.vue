<template>
  <div class="contact-page bg-light min-vh-100 pb-5">
    <Header />
    <main class="container pt-5 mt-5">
      <div class="row mb-5 justify-content-center text-center">
        <div class="col-lg-8">
           <span class="text-gold fw-bold text-uppercase small ls-2 mb-2 d-block">Liên hệ</span>
           <h1 class="display-5 fw-bold mb-4 luxury-title">Chúng Tôi Luôn Ở Đây Hỗ Trợ Bạn</h1>
           <p class="text-muted fs-5">Mọi thắc mắc về dịch vụ, đặt phòng hoặc phản hồi, xin vui lòng gửi tin nhắn cho chúng tôi.</p>
        </div>
      </div>

      <div class="row g-5">
        <!-- Contact Information -->
        <div class="col-lg-4">
           <div class="d-flex flex-column gap-4">
              <div class="glass-panel p-4 bg-white shadow-soft">
                 <div class="d-flex align-items-center gap-3">
                    <div class="icon-box bg-gold text-white p-3 rounded-circle">
                       <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                       <div class="fw-bold">Địa chỉ</div>
                       <div class="text-muted small">175 Tây Sơn, Đống Đa, Hà Nội</div>
                    </div>
                 </div>
              </div>
              <div class="glass-panel p-4 bg-white shadow-soft">
                 <div class="d-flex align-items-center gap-3">
                    <div class="icon-box bg-gold text-white p-3 rounded-circle">
                       <i class="fas fa-phone-alt"></i>
                    </div>
                    <div>
                       <div class="fw-bold">Điện thoại</div>
                       <div class="text-muted small">+84 968 334 348</div>
                    </div>
                 </div>
              </div>
              <div class="glass-panel p-4 bg-white shadow-soft">
                 <div class="d-flex align-items-center gap-3">
                    <div class="icon-box bg-gold text-white p-3 rounded-circle">
                       <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                       <div class="fw-bold">Email</div>
                       <div class="text-muted small">support@staygo.luxury</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-8">
           <div class="glass-panel p-5 bg-white shadow-soft" style="border-radius: 24px;">
              <form @submit.prevent="submitContact" class="row g-4">
                 <div class="col-md-6">
                    <label class="form-label small fw-bold text-uppercase">Họ và tên</label>
                    <input v-model="form.name" type="text" class="form-control form-control-lg border-0 bg-light py-3" placeholder="Nguyễn Văn A" required>
                 </div>
                 <div class="col-md-6">
                    <label class="form-label small fw-bold text-uppercase">Địa chỉ Email</label>
                    <input v-model="form.email" type="email" class="form-control form-control-lg border-0 bg-light py-3" placeholder="email@vi-du.com" required>
                 </div>
                 <div class="col-12">
                    <label class="form-label small fw-bold text-uppercase">Chủ đề</label>
                    <input v-model="form.subject" type="text" class="form-control form-control-lg border-0 bg-light py-3" placeholder="Tôi muốn hỏi về..." required>
                 </div>
                 <div class="col-12">
                    <label class="form-label small fw-bold text-uppercase">Nội dung</label>
                    <textarea v-model="form.message" class="form-control border-0 bg-light py-3" rows="5" placeholder="Nhập nội dung tin nhắn của bạn..." required></textarea>
                 </div>
                 <div class="col-12">
                    <button type="submit" class="btn btn-premium w-100 py-3 mt-2 shadow-sm" :disabled="isSubmitting">
                       <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                       Gửi tin nhắn ngay
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
      
      <!-- Map Section -->
      <div class="row mt-5 pt-5">
         <div class="col-12">
            <div class="glass-panel p-2 bg-white shadow-soft overflow-hidden" style="border-radius: 24px; height: 450px;">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.640944063462!2d105.82393237588383!3d21.007025288523668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac80ac189033%3A0xe54271830155b766!2zMTc1IFTDonkgU8ahbiwgVHJ1bmcgTGnhu4d0LCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1712808000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
         </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';
import { useNotificationStore } from '@/stores/notification';
import api from '@/api/axios';

const isSubmitting = ref(false);
const notificationStore = useNotificationStore();
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitContact = async () => {
  isSubmitting.value = true;
  try {
    await api.post('/contact', form);
    notificationStore.success('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.');
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch (error) {
    notificationStore.error('Gửi tin nhắn thất bại, vui lòng thử lại sau.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.shadow-soft { box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.ls-2 { letter-spacing: 2px; }
.bg-gold { background-color: var(--color-gold); }
</style>
