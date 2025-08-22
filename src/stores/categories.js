import { defineStore } from 'pinia'
import { categoryService } from '@/services/categoryService'
import { useToast } from 'vue-toastification'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    isLoading: false,
  }),

  getters: {
    categoriesWithTaskCount: (state) =>
      state.categories.map((category) => ({
        ...category,
        tasksCount: category.tasks_count || 0,
      })),

    getCategoryById: (state) => (id) => state.categories.find((category) => category.id === id),

    getCategoryName: (state) => (id) => {
      const category = state.categories.find((c) => c.id === id)
      return category ? category.name : 'Uncategorized'
    },
  },

  actions: {
    async fetchCategories() {
      this.isLoading = true
      try {
        const categories = await categoryService.getCategories()
        this.categories = categories
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to fetch categories')
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async createCategory(categoryData) {
      try {
        const category = await categoryService.createCategory(categoryData)
        this.categories.push(category)
        const toast = useToast()
        toast.success('Category created successfully')
        return category
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to create category')
        throw error
      }
    },

    async updateCategory(id, categoryData) {
      try {
        const updatedCategory = await categoryService.updateCategory(id, categoryData)
        const index = this.categories.findIndex((category) => category.id === id)
        if (index !== -1) {
          this.categories[index] = updatedCategory
        }
        const toast = useToast()
        toast.success('Category updated successfully')
        return updatedCategory
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to update category')
        throw error
      }
    },

    async deleteCategory(id) {
      try {
        await categoryService.deleteCategory(id)
        this.categories = this.categories.filter((category) => category.id !== id)
        const toast = useToast()
        toast.success('Category deleted successfully')
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to delete category')
        throw error
      }
    },
  },
})
