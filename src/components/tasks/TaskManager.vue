<template>
  <div class="bg-white rounded-lg shadow-md">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-xl font-semibold text-gray-900">Tasks</h2>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      <!-- Filters -->
      <TaskFilters />
    </div>

    <!-- Task List -->
    <div class="p-6">
      <div v-if="isLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else-if="tasks.length === 0" class="text-center py-8">
        <ClipboardDocumentListIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">No tasks found. Create your first task!</p>
      </div>

      <TaskList v-else :tasks="tasks" />
    </div>

    <!-- Create Task Modal -->
    <TaskModal v-if="showCreateModal" @close="showCreateModal = false" @saved="handleTaskSaved" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskList from './TaskList.vue'
import TaskFilters from './TaskFilters.vue'
import TaskModal from './TaskModal.vue'
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'TaskManager',
  components: {
    TaskList,
    TaskFilters,
    TaskModal,
    PlusIcon,
    ClipboardDocumentListIcon,
  },
  setup() {
    const taskStore = useTaskStore()
    const showCreateModal = ref(false)

    const tasks = computed(() => taskStore.tasks)
    const isLoading = computed(() => taskStore.isLoading)

    const handleTaskSaved = () => {
      showCreateModal.value = false
      taskStore.fetchTasks()
    }

    return {
      tasks,
      isLoading,
      showCreateModal,
      handleTaskSaved,
    }
  },
}
</script>
