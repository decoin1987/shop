<script lang="ts" setup>
const UiButton = {
  base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0',
  font: 'font-medium',
  rounded: 'rounded-md rounded-br-card rounded-tl-card',
  truncate: 'text-left break-all line-clamp-1',
  block: 'w-full flex text-center justify-center items-center',
  inline: 'inline-flex text-center justify-center items-center',
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  },
  gap: {
    '2xs': 'gap-x-1',
    xs: 'gap-x-1.5',
    sm: 'gap-x-1.5',
    md: 'gap-x-2',
    lg: 'gap-x-2.5',
    xl: 'gap-x-2.5'
  },
  padding: {
    '2xs': 'px-2 py-1',
    xs: 'px-2.5 py-1.5',
    sm: 'px-2.5 py-1.5',
    md: 'px-3 py-2',
    lg: 'px-5 py-2',
    xl: 'px-8 py-3'
  },
  square: {
    '2xs': 'p-1',
    xs: 'p-1.5',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-2.5'
  },
  icon: {
    base: 'flex-shrink-0',
    loading: 'animate-spin',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6'
    }
  },
  default: {
    size: 'sm',
    variant: 'solid',
    color: 'primary',
    loadingIcon: 'i-heroicons-arrow-path-20-solid'
  }
}


</script>

<template>
  <UButton :ui="UiButton" class="bg-red-700 hover:bg-gray-800" size="xl">
    <slot />
  </UButton>
</template>

<style scoped lang="scss">

</style>