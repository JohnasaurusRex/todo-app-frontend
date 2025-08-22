import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

// Global error handler
const errorHandler = (error, instance, info) => {
  console.error('Global error:', error)
  console.error('Error info:', info)

  // You can send errors to a logging service here
  // Example: Sentry.captureException(error)
}

const app = createApp(App)
const pinia = createPinia()

// Configure app
app.config.errorHandler = errorHandler
app.config.performance = process.env.NODE_ENV === 'development'

// Install plugins
app.use(pinia)
app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

// Global properties
app.config.globalProperties.$filters = {
  formatDate: (date) => new Date(date).toLocaleDateString(),
  formatDateTime: (date) => new Date(date).toLocaleString(),
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
}

app.mount('#app')
