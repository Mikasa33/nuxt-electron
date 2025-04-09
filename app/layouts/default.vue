<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

function onToggle() {
  isDark.value = !isDark.value
}

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-icon-park-outline-home',
    to: '/',
  },
  {
    label: 'About',
    icon: 'i-icon-park-outline-info',
    to: '/about',
  },
])
</script>

<template>
  <div>
    <div class="flex">
      <UNavigationMenu :items="items" class="w-full justify-center" />
      <div class="mr-3 mt-3">
        <UButton :icon="isDark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun-one'" @click="onToggle" />
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
