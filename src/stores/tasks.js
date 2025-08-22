import { defineStore } from 'pinia'
import { taskService } from '@/services/taskService'
import { useToast } from 'vue-toastification'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    isLoading: false,
    filters: {
      search: '',
      status: '',
      category_id: '',
      priority: '',
    },
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
    pendingTasks: (state) => state.tasks.filter((task) => !task.is_completed),
    overdueTasks: (state) => {
      const now = new Date()
      return state.tasks.filter(
        (task) => !task.is_completed && task.due_date && new Date(task.due_date) < now
      )
    },
    tasksByPriority: (state) => {
      const priorities = { high: [], medium: [], low: [] }
      state.tasks.forEach((task) => {
        priorities[task.priority].push(task)
      })
      return priorities
    },
    tasksCount: (state) => ({
      total: state.tasks.length,
      completed: state.tasks.filter((task) => task.is_completed).length,
      pending: state.tasks.filter((task) => !task.is_completed).length,
    }),
  },

  actions: {
    async fetchTasks() {
      this.isLoading = true
      try {
        const tasks = await taskService.getTasks(this.filters)
        this.tasks = tasks
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to fetch tasks')
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async createTask(taskData) {
      try {
        const task = await taskService.createTask(taskData)
        this.tasks.unshift(task)
        const toast = useToast()
        toast.success('Task created successfully')
        return task
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to create task')
        throw error
      }
    },

    async updateTask(id, taskData) {
      try {
        const updatedTask = await taskService.updateTask(id, taskData)
        const index = this.tasks.findIndex((task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
        const toast = useToast()
        toast.success('Task updated successfully')
        return updatedTask
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to update task')
        throw error
      }
    },

    async deleteTask(id) {
      try {
        await taskService.deleteTask(id)
        this.tasks = this.tasks.filter((task) => task.id !== id)
        const toast = useToast()
        toast.success('Task deleted successfully')
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to delete task')
        throw error
      }
    },

    async toggleTask(id) {
      try {
        const updatedTask = await taskService.toggleTask(id)
        const index = this.tasks.findIndex((task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
        return updatedTask
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to toggle task')
        throw error
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {
        search: '',
        status: '',
        category_id: '',
        priority: '',
      }
    },

    async applyFilters() {
      await this.fetchTasks()
    },
  },
})
