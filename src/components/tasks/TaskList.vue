<template>
  <div class="space-y-4">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="handleToggle"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Edit Task Modal -->
    <TaskModal
      v-if="editingTask"
      :task="editingTask"
      @close="editingTask = null"
      @saved="handleTaskSaved"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskItem from './TaskItem.vue'
import TaskModal from './TaskModal.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    TaskModal,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const taskStore = useTaskStore()
    const editingTask = ref(null)

    const handleToggle = async (task) => {
      await taskStore.toggleTask(task.id)
    }

    const handleEdit = (task) => {
      editingTask.value = task
    }

    const handleDelete = async (task) => {
      if (confirm('Are you sure you want to delete this task?')) {
        await taskStore.deleteTask(task.id)
      }
    }

    const handleTaskSaved = () => {
      editingTask.value = null
      taskStore.fetchTasks()
    }

    return {
      editingTask,
      handleToggle,
      handleEdit,
      handleDelete,
      handleTaskSaved,
    }
  },
}
</script>
