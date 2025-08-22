<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Category</h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Name * </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
            />
          </div>

          <!-- Color -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Color </label>
            <div class="flex items-center space-x-3">
              <input
                v-model="form.color"
                type="color"
                class="h-10 w-20 border border-gray-300 rounded-md"
              />
              <input
                v-model="form.color"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="#3B82F6"
              />
            </div>
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
              {{ isSubmitting ? 'Creating...' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useCategoryStore } from '@/stores/categories'

export default {
  name: 'CategoryModal',
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const categoryStore = useCategoryStore()

    const form = reactive({
      name: '',
      color: '#3B82F6',
    })

    const error = ref('')
    const isSubmitting = ref(false)

    const handleSubmit = async () => {
      error.value = ''
      isSubmitting.value = true

      try {
        await categoryStore.createCategory(form)
        emit('saved')
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to create category'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      error,
      isSubmitting,
      handleSubmit,
    }
  },
}
</script>
