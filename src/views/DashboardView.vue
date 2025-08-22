<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Dashboard Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ userName }}!</h1>
      <p class="text-gray-600">Manage your tasks and stay productive</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <ClipboardDocumentListIcon class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Tasks</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksCount.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksCount.completed }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <ClockIcon class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksCount.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Overdue</p>
            <p class="text-2xl font-semibold text-gray-900">{{ overdueTasksCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <TaskSidebar />
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <TaskManager />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/tasks'
import { useCategoryStore } from '@/stores/categories'
import TaskManager from '@/components/tasks/TaskManager.vue'
import TaskSidebar from '@/components/tasks/TaskSidebar.vue'
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'DashboardView',
  components: {
    TaskManager,
    TaskSidebar,
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
  },
  setup() {
    const authStore = useAuthStore()
    const taskStore = useTaskStore()
    const categoryStore = useCategoryStore()

    const userName = computed(() => authStore.userName)
    const tasksCount = computed(() => taskStore.tasksCount)
    const overdueTasksCount = computed(() => taskStore.overdueTasks.length)

    onMounted(async () => {
      await Promise.all([taskStore.fetchTasks(), categoryStore.fetchCategories()])
    })

    return {
      userName,
      tasksCount,
      overdueTasksCount,
    }
  },
}
</script>
