export const formatDate = (date, options = {}) => {
  if (!date) return ''

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }

  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

export const formatDateTime = (date) => {
  if (!date) return ''

  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatRelativeTime = (date) => {
  if (!date) return ''

  const now = new Date()
  const targetDate = new Date(date)
  const diffTime = targetDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`

  return formatDate(date)
}

export const isOverdue = (dueDate, isCompleted = false) => {
  if (!dueDate || isCompleted) return false
  return new Date(dueDate) < new Date()
}

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null

  const now = new Date()
  const due = new Date(dueDate)
  const diffTime = due - now
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
