<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="handleBackdropClick"
  >
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
        >
          <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-500 mb-4">{{ message }}</p>

        <div class="flex justify-center space-x-3">
          <button
            @click="handleCancel"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {{ cancelText }}
          </button>
          <button
            @click="handleConfirm"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'ConfirmDialog',
  components: {
    ExclamationTriangleIcon,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Confirm Action',
    },
    message: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['confirm', 'cancel'],
  methods: {
    handleConfirm() {
      this.$emit('confirm')
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleBackdropClick(event) {
      if (event.target === event.currentTarget) {
        this.handleCancel()
      }
    },
  },
}
</script>
