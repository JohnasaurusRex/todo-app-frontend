<template>
  <div class="space-y-6">
    <!-- Categories Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Categories</h3>
        <button @click="showCategoryModal = true" class="p-2 text-gray-400 hover:text-blue-600">
          <PlusIcon class="h-5 w-5" />
        </button>
      </div>

      <div class="space-y-2">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
        >
          <div class="flex items-center">
            <div
              class="w-3 h-3 rounded-full mr-3"
              :style="{ backgroundColor: category.color }"
            ></div>
            <span class="text-sm text-gray-700">{{ category.name }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ category.tasks_count || 0 }}</span>
        </div>

        <div v-if="categories.length === 0" class="text-sm text-gray-500 text-center py-4">
          No categories yet
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>

      <div class="space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Completion Rate</span>
          <span class="font-medium">{{ completionRate }}%</span>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-green-600 h-2 rounded-full transition-all"
            :style="{ width: completionRate + '%' }"
          ></div>
        </div>

        <div class="pt-2 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Today's Tasks</span>
            <span class="font-medium">{{ todayTasksCount }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">This Week</span>
            <span class="font-medium">{{ weekTasksCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <CategoryModal
      v-if="showCategoryModal"
      @close="showCategoryModal = false"
      @saved="handleCategorySaved"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useTaskStore } from '@/stores/tasks'
import CategoryModal from './CategoryModal.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'TaskSidebar',
  components: {
    CategoryModal,
    PlusIcon,
  },
  setup() {
    const categoryStore = useCategoryStore()
    const taskStore = useTaskStore()
    const showCategoryModal = ref(false)

    const categories = computed(() => categoryStore.categories)
    const tasksCount = computed(() => taskStore.tasksCount)

    const completionRate = computed(() => {
      if (tasksCount.value.total === 0) return 0
      return Math.round((tasksCount.value.completed / tasksCount.value.total) * 100)
    })

    const todayTasksCount = computed(() => {
      const today = new Date().toDateString()
      return taskStore.tasks.filter((task) => {
        return task.due_date && new Date(task.due_date).toDateString() === today
      }).length
    })

    const weekTasksCount = computed(() => {
      const weekFromNow = new Date()
      weekFromNow.setDate(weekFromNow.getDate() + 7)

      return taskStore.tasks.filter((task) => {
        return task.due_date && new Date(task.due_date) <= weekFromNow
      }).length
    })

    const handleCategorySaved = () => {
      showCategoryModal.value = false
      categoryStore.fetchCategories()
    }

    return {
      categories,
      showCategoryModal,
      completionRate,
      todayTasksCount,
      weekTasksCount,
      handleCategorySaved,
    }
  },
}
</script>
