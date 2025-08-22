import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userName: (state) => state.user?.name || '',
    userEmail: (state) => state.user?.email || '',
  },

  actions: {
    async register(userData) {
      this.isLoading = true
      try {
        const response = await authService.register(userData)
        this.setAuthData(response)
        router.push('/dashboard')
        return response
      } finally {
        this.isLoading = false
      }
    },

    async login(credentials) {
      this.isLoading = true
      try {
        const response = await authService.login(credentials)
        this.setAuthData(response)
        router.push('/dashboard')
        return response
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      // Prevent redundant logout if already logged out
      if (!this.token && !this.user) {
        router.push('/login')
        return
      }
      try {
        await authService.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuthData()
        if (router.currentRoute.value.path !== '/login') {
          router.push('/login')
        }
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const user = await authService.getUser()
        this.user = user
      } catch (error) {
        console.error('Fetch user error:', error)
        this.clearAuthData()
      }
    },

    async refreshToken() {
      const response = await authService.refreshToken()
      this.setAuthData(response)
      return response
    },

    setAuthData(data) {
      this.user = data.user
      this.token = data.access_token
      localStorage.setItem('token', data.access_token)
    },

    clearAuthData() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async initializeAuth() {
      if (this.token) {
        try {
          await this.fetchUser()
        } catch (error) {
          this.clearAuthData()
        }
      }
    },
  },
})
