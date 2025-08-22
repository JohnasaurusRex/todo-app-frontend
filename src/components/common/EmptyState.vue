<template>
  <div class="text-center py-12">
    <div class="mx-auto h-12 w-12 text-gray-400 mb-4">
      <component :is="icon" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">{{ description }}</p>
    <slot name="action">
      <button v-if="actionText" @click="$emit('action')" class="btn-primary">
        {{ actionText }}
      </button>
    </slot>
  </div>
</template>

<script>
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'EmptyState',
  components: {
    ClipboardDocumentListIcon,
  },
  props: {
    icon: {
      type: Object,
      default: () => ClipboardDocumentListIcon,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actionText: {
      type: String,
      default: '',
    },
  },
  emits: ['action'],
}
</script>
