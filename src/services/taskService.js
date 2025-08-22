import api from './api'

export const taskService = {
  async getTasks(filters = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    const response = await api.get(`/tasks?${params}`)
    return response.data
  },

  async createTask(taskData) {
    const response = await api.post('/tasks', taskData)
    return response.data
  },

  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response.data
  },

  async deleteTask(id) {
    await api.delete(`/tasks/${id}`)
  },

  async toggleTask(id) {
    const response = await api.patch(`/tasks/${id}/toggle`)
    return response.data
  },
}
