<template>
  <nav class="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="text-xl font-bold text-blue-600">
            TaskManager
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="relative" ref="dropdown">
          <button
            @click="showDropdown = !showDropdown"
            class="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
          >
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">
                {{ userInitials }}
              </span>
            </div>
            <span class="hidden md:block">{{ userName }}</span>
            <ChevronDownIcon class="h-4 w-4" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200"
          >
            <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <div class="font-medium">{{ userName }}</div>
              <div class="text-gray-500">{{ userEmail }}</div>
            </div>

            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Navbar',
  components: {
    ChevronDownIcon,
  },
  setup() {
    const authStore = useAuthStore()
    const showDropdown = ref(false)
    const dropdown = ref(null)

    const userName = computed(() => authStore.userName)
    const userEmail = computed(() => authStore.userEmail)
    const userInitials = computed(() => {
      const name = authStore.userName
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    })

    const handleLogout = async () => {
      showDropdown.value = false
      await authStore.logout()
    }

    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        showDropdown.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showDropdown,
      dropdown,
      userName,
      userEmail,
      userInitials,
      handleLogout,
    }
  },
}
</script>
