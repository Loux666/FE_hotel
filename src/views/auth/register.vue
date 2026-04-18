<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <div class="logo-container">
          <img src="/images/logo.png" alt="Logo" class="logo-img" />
        </div>
        <h2 class="register-title">Tạo tài khoản mới</h2>
        <p class="register-subtitle">Đăng ký để trải nghiệm dịch vụ tốt nhất</p>
      </div>

      <form @submit.prevent="submitRegister" class="register-form">
        <div class="form-group">
          <label class="form-label"><i class="fas fa-user"></i> Họ và tên</label>
          <input type="text" v-model="form.name" class="form-input" required placeholder="Nhập họ và tên của bạn" />
        </div>

        <div class="form-group">
          <label class="form-label"><i class="fas fa-envelope"></i> Email</label>
          <input type="email" v-model="form.email" class="form-input" required placeholder="example@email.com" />
        </div>

        <div class="form-group">
          <label class="form-label"><i class="fas fa-phone"></i> Số điện thoại</label>
          <input type="tel" v-model="form.phone" class="form-input" required placeholder="0xxx xxx xxx" />
        </div>

        <div class="password-row">
          <div class="form-group half-width">
            <label class="form-label"><i class="fas fa-lock"></i> Mật khẩu</label>
            <input type="password" v-model="form.password" class="form-input" required placeholder="••••••••" />
          </div>

          <div class="form-group half-width">
            <label class="form-label"><i class="fas fa-lock"></i> Xác nhận mật khẩu</label>
            <input type="password" v-model="form.password_confirmation" class="form-input" required placeholder="••••••••" />
          </div>
        </div>

        <div class="form-group">
          <button type="submit" class="register-btn">
            <i class="fas fa-user-plus"></i> Tạo tài khoản
          </button>
        </div>

        <div class="login-link">
          <span>Đã có tài khoản? </span>
          <router-link to="/login" class="link-primary">Đăng nhập ngay</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: ''
})

const submitRegister = async () => {
  try {
    await authStore.register(form.value)
    router.push('/') 
  } catch (error) {
    alert(error.response?.data?.message || 'Đăng ký thất bại')
  }
}
</script>

<style scoped>
.register-container {
            min-height: 100vh;
            
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .register-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            padding: 40px;
            width: 100%;
            max-width: 500px;
            position: relative;
            overflow: hidden;
        }

        .register-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .register-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo-container {
            margin-bottom: 20px;
        }

        .logo-img {
            width: 120px;
            height: auto;
        }

        .register-title {
            font-size: 28px;
            font-weight: 700;
            color: #2d3748;
            margin: 0 0 8px 0;
        }

        .register-subtitle {
            color: #718096;
            font-size: 16px;
            margin: 0;
        }

        .register-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .form-label i {
            color: #667eea;
            width: 16px;
        }

        .form-input {
            padding: 14px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: #f7fafc;
        }

        .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            background: white;
        }

        .form-input::placeholder {
            color: #a0aec0;
        }

        .password-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .half-width {
            margin: 0;
        }

        .checkbox-container {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .custom-checkbox {
            width: 18px;
            height: 18px;
            margin-top: 2px;
            accent-color: #667eea;
        }

        .checkbox-label {
            font-size: 14px;
            color: #4a5568;
            line-height: 1.5;
            margin-bottom: 0;
        }

        .link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }

        .link:hover {
            text-decoration: underline;
        }

        .register-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .register-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .register-btn:active {
            transform: translateY(0);
        }

        .login-link {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #718096;
        }

        .link-primary {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }

        .link-primary:hover {
            text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .register-card {
                padding: 30px 20px;
                margin: 10px;
            }

            .password-row {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .register-title {
                font-size: 24px;
            }
        }

        /* Animation */
        .register-card {
            animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
</style>
