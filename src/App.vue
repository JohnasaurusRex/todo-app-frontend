<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar v-if="isAuthenticated" />
    <main :class="{ 'pt-16': isAuthenticated }">
      <router-view />
    </main>
    <ToastContainer />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/layout/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    onMounted(() => {
      authStore.initializeAuth()
    })
    return {
      isAuthenticated,
    }
  },
}
</script>
