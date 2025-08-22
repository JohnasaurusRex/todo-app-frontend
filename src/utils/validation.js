export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
}

export const validateTaskForm = (task) => {
  const errors = {}

  if (!task.title || task.title.trim().length === 0) {
    errors.title = 'Title is required'
  }

  if (task.title && task.title.length > 255) {
    errors.title = 'Title must be less than 255 characters'
  }

  if (task.description && task.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
  }

  if (task.due_date) {
    const dueDate = new Date(task.due_date)
    const now = new Date()

    if (dueDate < now) {
      errors.due_date = 'Due date cannot be in the past'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
