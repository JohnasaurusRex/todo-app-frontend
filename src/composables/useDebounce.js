import { ref, watch } from 'vue'

export function useDebounce(source, delay = 300) {
  const debounced = ref(source.value)
  let timeout = null

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}
