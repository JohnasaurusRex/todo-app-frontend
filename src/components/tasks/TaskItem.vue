<template>
  <div
    class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
  >
    <!-- Checkbox -->
    <button @click="$emit('toggle', task)" class="flex-shrink-0 mt-1 mr-4">
      <CheckCircleIcon v-if="task.is_completed" class="h-6 w-6 text-green-600" />
      <div
        v-else
        class="h-6 w-6 border-2 border-gray-300 rounded-full hover:border-green-500"
      ></div>
    </button>

    <!-- Task Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3
            :class="[
              'text-lg font-medium',
              task.is_completed ? 'line-through text-gray-500' : 'text-gray-900',
            ]"
          >
            {{ task.title }}
          </h3>

          <p
            v-if="task.description"
            :class="['mt-1 text-sm', task.is_completed ? 'text-gray-400' : 'text-gray-600']"
          >
            {{ task.description }}
          </p>

          <!-- Task Meta -->
          <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <!-- Category -->
            <span
              v-if="task.category"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :style="{ backgroundColor: task.category.color + '20', color: task.category.color }"
            >
              {{ task.category.name }}
            </span>

            <!-- Priority -->
            <span
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                getPriorityClass(task.priority),
              ]"
            >
              {{ task.priority }}
            </span>

            <!-- Due Date -->
            <span
              v-if="task.due_date"
              :class="[
                'inline-flex items-center text-xs',
                isOverdue(task) ? 'text-red-600' : 'text-gray-600',
              ]"
            >
              <CalendarIcon class="h-4 w-4 mr-1" />
              {{ formatDate(task.due_date) }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-2 ml-4">
          <button @click="$emit('edit', task)" class="p-1 text-gray-400 hover:text-blue-600">
            <PencilIcon class="h-5 w-5" />
          </button>
          <button @click="$emit('delete', task)" class="p-1 text-gray-400 hover:text-red-600">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, CalendarIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'TaskItem',
  components: {
    CheckCircleIcon,
    CalendarIcon,
    PencilIcon,
    TrashIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggle', 'edit', 'delete'],
  setup() {
    const getPriorityClass = (priority) => {
      const classes = {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800',
      }
      return classes[priority] || classes.medium
    }

    const isOverdue = (task) => {
      if (!task.due_date || task.is_completed) return false
      return new Date(task.due_date) < new Date()
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      getPriorityClass,
      isOverdue,
      formatDate,
    }
  },
}
</script>
