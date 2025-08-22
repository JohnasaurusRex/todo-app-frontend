<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ task ? 'Edit Task' : 'Create New Task' }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Title * </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Category </label>
            <select
              v-model="form.category_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">No Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Priority </label>
            <select
              v-model="form.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Due Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Due Date </label>
            <input
              v-model="form.due_date"
              type="datetime-local"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Saving...' : task ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import { useCategoryStore } from '@/stores/categories'

export default {
  name: 'TaskModal',
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const taskStore = useTaskStore()
    const categoryStore = useCategoryStore()

    const form = reactive({
      title: '',
      description: '',
      category_id: '',
      priority: 'medium',
      due_date: '',
    })

    const error = ref('')
    const isSubmitting = ref(false)
    const categories = computed(() => categoryStore.categories)

    const formatDateForInput = (date) => {
      if (!date) return ''
      const d = new Date(date)
      return d.toISOString().slice(0, 16)
    }

    onMounted(() => {
      if (props.task) {
        form.title = props.task.title
        form.description = props.task.description || ''
        form.category_id = props.task.category_id || ''
        form.priority = props.task.priority
        form.due_date = formatDateForInput(props.task.due_date)
      }
    })

    const handleSubmit = async () => {
      error.value = ''
      isSubmitting.value = true

      try {
        const taskData = {
          ...form,
          category_id: form.category_id || null,
          due_date: form.due_date || null,
        }

        if (props.task) {
          await taskStore.updateTask(props.task.id, taskData)
        } else {
          await taskStore.createTask(taskData)
        }

        emit('saved')
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to save task'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      error,
      isSubmitting,
      categories,
      handleSubmit,
    }
  },
}
</script>
