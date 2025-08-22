<template>
  <div class="mt-4 space-y-4">
    <!-- Search -->
    <div>
      <input
        v-model="localFilters.search"
        type="text"
        placeholder="Search tasks..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        @input="applyFilters"
      />
    </div>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="filter in filterOptions"
        :key="filter.key"
        @click="toggleFilter(filter.key, filter.value)"
        :class="[
          'px-3 py-1 text-sm rounded-full border transition-colors',
          isFilterActive(filter.key, filter.value)
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
        ]"
      >
        {{ filter.label }}
      </button>

      <!-- Category Filters -->
      <button
        v-for="category in categories"
        :key="`category-${category.id}`"
        @click="toggleFilter('category_id', category.id)"
        :class="[
          'px-3 py-1 text-sm rounded-full border transition-colors',
          isFilterActive('category_id', category.id)
            ? 'text-white border-opacity-50'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
        ]"
        :style="
          isFilterActive('category_id', category.id)
            ? { backgroundColor: category.color, borderColor: category.color }
            : {}
        "
      >
        {{ category.name }}
      </button>

      <!-- Clear Filters -->
      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-full hover:bg-red-50"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import { useCategoryStore } from '@/stores/categories'

export default {
  name: 'TaskFilters',
  setup() {
    const taskStore = useTaskStore()
    const categoryStore = useCategoryStore()

    const localFilters = reactive({ ...taskStore.filters })
    const categories = computed(() => categoryStore.categories)

    const filterOptions = [
      { key: 'status', value: 'pending', label: 'Pending' },
      { key: 'status', value: 'completed', label: 'Completed' },
      { key: 'status', value: 'overdue', label: 'Overdue' },
      { key: 'priority', value: 'high', label: 'High Priority' },
      { key: 'priority', value: 'medium', label: 'Medium Priority' },
      { key: 'priority', value: 'low', label: 'Low Priority' },
    ]

    const hasActiveFilters = computed(() => {
      return Object.values(localFilters).some((value) => value !== '')
    })

    const isFilterActive = (key, value) => {
      return localFilters[key] === value
    }

    const toggleFilter = (key, value) => {
      if (localFilters[key] === value) {
        localFilters[key] = ''
      } else {
        localFilters[key] = value
      }
      applyFilters()
    }

    const clearAllFilters = () => {
      Object.keys(localFilters).forEach((key) => {
        localFilters[key] = ''
      })
      applyFilters()
    }

    const applyFilters = () => {
      taskStore.setFilters(localFilters)
      taskStore.applyFilters()
    }

    // Watch for external filter changes
    watch(
      () => taskStore.filters,
      (newFilters) => {
        Object.assign(localFilters, newFilters)
      },
      { deep: true }
    )

    return {
      localFilters,
      categories,
      filterOptions,
      hasActiveFilters,
      isFilterActive,
      toggleFilter,
      clearAllFilters,
      applyFilters,
    }
  },
}
</script>
