<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar v-if="isAuthenticated && !isAuthRoute" />
    <main :class="{ 'pt-16': isAuthenticated && !isAuthRoute }">
      <router-view />
    </main>
    <ToastContainer />
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const authStore = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const isAuthRoute = computed(() => ['/login', '/register'].includes(route.path))

    // Watch for auth changes and route changes to force redirect if not authenticated
    onMounted(() => {
      authStore.initializeAuth()
    })

    // Watch for route changes and force redirect if not authenticated
    watch(
      () => route.path,
      () => {
        if (route.meta?.requiresAuth && !authStore.isAuthenticated) {
          router.replace('/login')
        }
      }
    )

    return {
      isAuthenticated,
      isAuthRoute,
    }
  },
}
</script>
