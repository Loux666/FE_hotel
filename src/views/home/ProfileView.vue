<template>
  <div class="profile-page bg-light min-vh-100 pb-5">
    <Header />
    <main class="container pt-5 mt-5">
      <div class="row g-5">
        <!-- Profile Sidebar -->
        <div class="col-lg-4">
          <div class="glass-panel p-4 bg-white shadow-soft text-center" style="border-radius: 24px;">
            <div class="position-relative d-inline-block mb-4">
              <div class="profile-avatar-box rounded-circle d-flex align-items-center justify-content-center text-white display-4 fw-bold shadow-sm">
                {{ authStore.user?.name?.charAt(0).toUpperCase() }}
              </div>
              <button class="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 shadow">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            <h3 class="fw-bold mb-1">{{ authStore.user?.name }}</h3>
            <p class="text-muted small mb-4">{{ authStore.user?.email }}</p>
            <div class="d-flex flex-column gap-2 text-start pt-3 border-top">
               <RouterLink to="/history" class="btn btn-light text-start py-3 border-0 rounded-3">
                 <i class="fas fa-history me-3 text-gold"></i>Lịch sử đặt phòng
               </RouterLink>
               <RouterLink to="/cart" class="btn btn-light text-start py-3 border-0 rounded-3">
                 <i class="fas fa-shopping-cart me-3 text-gold"></i>Giỏ hàng
               </RouterLink>
               <button @click="authStore.logout" class="btn btn-outline-danger text-start py-3 border-0 rounded-3">
                 <i class="fas fa-sign-out-alt me-3"></i>Đăng xuất
               </button>
            </div>
          </div>
        </div>

        <!-- Profile Edit Form -->
        <div class="col-lg-8">
          <div class="glass-panel p-5 bg-white shadow-soft" style="border-radius: 24px;">
            <h4 class="fw-bold mb-5 luxury-title">Thiết lập tài khoản</h4>
            
            <form @submit.prevent="handleUpdate" class="row g-4">
               <div class="col-md-6">
                  <label class="form-label small fw-bold text-uppercase">Họ và tên</label>
                  <input v-model="form.name" type="text" class="form-control form-control-lg border-0 bg-light py-3" required>
               </div>
               <div class="col-md-6">
                  <label class="form-label small fw-bold text-uppercase">Số điện thoại</label>
                  <input v-model="form.phone" type="tel" class="form-control form-control-lg border-0 bg-light py-3">
               </div>
               <div class="col-12">
                  <label class="form-label small fw-bold text-uppercase">Email</label>
                  <input v-model="form.email" type="email" class="form-control form-control-lg border-0 bg-light py-3" required>
               </div>
               
               <h5 class="fw-bold mt-5 mb-2">Đổi mật khẩu (Để trống nếu không muốn đổi)</h5>
               <div class="col-md-6">
                  <label class="form-label small fw-bold text-uppercase">Mật khẩu mới</label>
                  <input v-model="form.password" type="password" class="form-control form-control-lg border-0 bg-light py-3" placeholder="••••••••">
               </div>
               <div class="col-md-6">
                  <label class="form-label small fw-bold text-uppercase">Xác nhận mật khẩu</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control form-control-lg border-0 bg-light py-3" placeholder="••••••••">
               </div>

               <div class="col-12 mt-5">
                  <button type="submit" class="btn btn-premium w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" :disabled="isUpdating">
                    <span v-if="isUpdating" class="spinner-border spinner-border-sm"></span>
                    Lưu các thay đổi
                  </button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import authService from '@/services/authService';
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const isUpdating = ref(false);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: ''
});

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name;
    form.email = authStore.user.email;
    form.phone = authStore.user.phone || '';
  }
});

const handleUpdate = async () => {
  isUpdating.value = true;
  try {
    const { data } = await authService.updateProfile(form);
    authStore.setAuthData(data.data, authStore.token);
    notificationStore.success('Cập nhật thông tin thành công!');
    form.password = '';
    form.password_confirmation = '';
  } catch (error) {
    notificationStore.error(error.response?.data?.message || 'Cập nhật thất bại.');
  } finally {
    isUpdating.value = false;
  }
};
</script>

<style scoped>
.profile-avatar-box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-gold) 0%, #b8860b 100%);
}
</style>
