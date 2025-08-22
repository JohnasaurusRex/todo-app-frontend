<template>
  <div :class="containerClass">
    <div :class="['animate-spin rounded-full border-b-2', sizeClass, colorClass]"></div>
    <p v-if="text" :class="textClass">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    color: {
      type: String,
      default: 'blue',
    },
    text: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    containerClass() {
      return [this.centered ? 'flex flex-col items-center justify-center' : '', 'space-y-2']
    },
    sizeClass() {
      const sizes = {
        small: 'h-4 w-4',
        medium: 'h-8 w-8',
        large: 'h-12 w-12',
      }
      return sizes[this.size]
    },
    colorClass() {
      return `border-${this.color}-600`
    },
    textClass() {
      return `text-${this.color}-600 text-sm`
    },
  },
}
</script>
