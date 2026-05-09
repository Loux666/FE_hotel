<template>
  <div class="notification-container">
    <TransitionGroup name="notification-list">
      <div
        v-for="noti in notificationStore.notifications"
        :key="noti.id"
        class="notification-item"
        :class="noti.type"
      >
        <div class="notification-icon">
          <i v-if="noti.type === 'success'" class="fas fa-check-circle"></i>
          <i v-else-if="noti.type === 'error'" class="fas fa-times-circle"></i>
          <i v-else-if="noti.type === 'warning'" class="fas fa-exclamation-triangle"></i>
          <i v-else class="fas fa-info-circle"></i>
        </div>
        <div class="notification-content">
          <p class="notification-message">{{ noti.message }}</p>
        </div>
        <button class="notification-close" @click="notificationStore.removeNotification(noti.id)">
          <i class="fas fa-times"></i>
        </button>
        <div class="notification-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.notification-item {
  pointer-events: auto;
  min-width: 320px;
  max-width: 450px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;
  position: relative;
}

.notification-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success .notification-icon { color: #10b981; }
.error .notification-icon { color: #ef4444; }
.warning .notification-icon { color: #f59e0b; }
.info .notification-icon { color: #3b82f6; }

.notification-content {
  flex: 1;
}

.notification-message {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  font-size: 1rem;
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #4b5563;
  transform: scale(1.1);
}

/* Progress bar animation */
.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.05);
}

.progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation: progress linear forwards;
}

.success .progress-bar { background: #10b981; }
.error .progress-bar { background: #ef4444; }
.warning .progress-bar { background: #f59e0b; }
.info .progress-bar { background: #3b82f6; }

@keyframes progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

.success .progress-bar { animation-duration: 4s; }
.error .progress-bar { animation-duration: 4s; }
.warning .progress-bar { animation-duration: 4s; }
.info .progress-bar { animation-duration: 4s; }

/* Transitions */
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-list-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.notification-list-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.notification-list-move {
  transition: transform 0.4s ease;
}
</style>
