import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  const addNotification = (message, type = 'success', timeout = 4000) => {
    const id = Date.now()
    notifications.value.push({
      id,
      message,
      type,
    })

    setTimeout(() => {
      removeNotification(id)
    }, timeout)
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const success = (message, timeout) => addNotification(message, 'success', timeout)
  const error = (message, timeout) => addNotification(message, 'error', timeout)
  const warning = (message, timeout) => addNotification(message, 'warning', timeout)
  const info = (message, timeout) => addNotification(message, 'info', timeout)

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
  }
})
