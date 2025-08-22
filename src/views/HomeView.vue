<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">Task Manager Pro</h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Organize your life with our powerful and intuitive task management application. Create,
          manage, and track your tasks with ease.
        </p>

        <div class="space-x-4">
          <router-link
            to="/register"
            class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </router-link>
          <router-link
            to="/login"
            class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Sign In
          </router-link>
        </div>
      </div>

      <div class="mt-16 grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 mb-4">
            <CheckCircleIcon class="h-8 w-8" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Task Management</h3>
          <p class="text-gray-600">
            Create, edit, and organize your tasks with categories and priorities.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 mb-4">
            <CalendarIcon class="h-8 w-8" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Due Dates</h3>
          <p class="text-gray-600">Set due dates and never miss an important deadline again.</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 mb-4">
            <UserIcon class="h-8 w-8" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Personal Workspace</h3>
          <p class="text-gray-600">Your tasks are private and secure, accessible only to you.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, CalendarIcon, UserIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'HomeView',
  components: {
    CheckCircleIcon,
    CalendarIcon,
    UserIcon,
  },
}
</script>
