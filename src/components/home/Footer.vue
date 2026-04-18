<template>
  <footer class="bg-dark text-white pt-5 pb-4 mt-5">
    <div class="container">
      <div class="row g-4">
        <!-- Logo & About -->
        <div class="col-lg-4 col-md-6">
          <h3 class="fw-bold mb-4">STAY<span style="color:var(--color-gold)">GO</span></h3>
          <p class="text-muted mb-4 opacity-75" style="max-width: 300px;">
            Mang đến trải nghiệm lưu trú đẳng cấp thế giới. Kiến tạo những hành trình nghỉ dưỡng sang trọng và khó quên cho khách hàng trên toàn cầu.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6 col-6">
          <h5 class="fw-bold mb-4 text-gold">Khám Phá</h5>
          <ul class="list-unstyled d-flex flex-column gap-2 opacity-75">
            <li><RouterLink to="/hotels" class="footer-link">Khách sạn</RouterLink></li>
            <li><RouterLink to="/promotions" class="footer-link">Ưu đãi</RouterLink></li>
            <li><RouterLink to="/about" class="footer-link">Về chúng tôi</RouterLink></li>
            <li><RouterLink to="/contact" class="footer-link">Liên hệ</RouterLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="col-lg-2 col-md-6 col-6">
          <h5 class="fw-bold mb-4 text-gold">Hỗ Trợ</h5>
          <ul class="list-unstyled d-flex flex-column gap-2 opacity-75">
            <li><a href="#" class="footer-link">Trung tâm hỗ trợ</a></li>
            <li><a href="#" class="footer-link">Điều khoản sử dụng</a></li>
            <li><a href="#" class="footer-link">Chính sách bảo mật</a></li>
            <li><a href="#" class="footer-link">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-4 text-gold">Bản Tin</h5>
          <p class="small text-muted mb-4">Đăng ký để nhận tin khuyến mãi sớm nhất từ StayGo.</p>
          <div class="input-group mb-3 glass-input-group">
            <input type="email" class="form-control bg-transparent border-secondary text-white small" placeholder="Email của bạn">
            <button class="btn btn-premium btn-sm px-3" type="button">Đăng ký</button>
          </div>
          <p class="small text-muted mt-4">
            <i class="fas fa-phone-alt me-2 text-gold"></i> +84 968 334 348 <br/>
            <i class="fas fa-envelope me-2 text-gold"></i> contact@staygo.luxury
          </p>
        </div>
      </div>
      
      <hr class="my-5 opacity-10">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="small text-muted mb-0">© 2026 StayGo Luxury Hotel Booking. Toàn bộ quyền đã được bảo lưu.</p>
        <div class="d-flex gap-4 small text-muted">
           <span>StayGo v2.1.0</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.text-gold { color: var(--color-gold); }
.footer-link {
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}
.footer-link:hover {
  color: var(--color-gold);
  padding-left: 5px;
}
.social-icon {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}
.social-icon:hover {
  background: var(--color-gold);
  color: #000;
  transform: translateY(-3px);
}
.glass-input-group {
    border-radius: 50px;
    overflow: hidden;
}
.glass-input-group input {
    border-radius: 50px 0 0 50px !important;
    padding-left: 20px;
}
</style>
