import { onMounted, onUnmounted } from 'vue'

export function useKeyboard(handlers) {
  const handleKeydown = (event) => {
    const key = event.key.toLowerCase()
    const handler = handlers[key]

    if (handler) {
      // Check for modifiers
      const hasCtrl = event.ctrlKey || event.metaKey
      const hasShift = event.shiftKey
      const hasAlt = event.altKey

      // Create modifier string
      let modifierKey = key
      if (hasCtrl) modifierKey = `ctrl+${key}`
      if (hasShift) modifierKey = `shift+${key}`
      if (hasAlt) modifierKey = `alt+${key}`

      const modifierHandler = handlers[modifierKey]

      if (modifierHandler) {
        event.preventDefault()
        modifierHandler(event)
      } else if (handler && !hasCtrl && !hasShift && !hasAlt) {
        event.preventDefault()
        handler(event)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
