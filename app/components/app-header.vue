<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/">
        <NuxtImg
          src="/images/D2CGuru_Logo_Black.svg"
          alt="D2C Guru"
          class="h-8 w-auto dark:hidden"
        />
        <NuxtImg src="/images/D2CGuru_Logo_White.svg" class="h-8 w-auto hidden dark:block" />
      </NuxtLink>
    </template>
    <UNavigationMenu :items="items" />
    <!-- desktop -->
    <template #right>
      <div class="flex items-center gap-2">
        <div class="hidden md:block">
          <UInput
            v-model="searchQuery"
            placeholder="Search brands, categories..."
            class="w-full h-1/2 text-primary"
            icon="i-heroicons-magnifying-glass"
            @keyup.enter="applyfilters"
          />
        </div>
        <UColorModeButton class="cursor-pointer" />
      </div>
    </template>
    <!-- mobile -->
    <template #body>
      <div class="px-2 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
        <UInput
          v-model="searchQuery"
          placeholder="Search brands, categories..."
          class="w-full text-black dark:text-white md:hidden"
          icon="i-heroicons-magnifying-glass"
          @keyup.enter="applyfilters"
        />
        <UNavigationMenu :items="items" orientation="vertical" class="text-black flex-col mb-4" />
      </div>
    </template>
  </UHeader>
</template>
<script setup>
  const route = useRoute()
  const searchQuery = ref(route.query.q || '')
  const items = computed(() => [
    {
      icon: 'lucide:store',
      label: 'Categories',
      to: '/category',
      active: route.path.startsWith('/category'),
      class:
        'text-primary dark:text-white hover:bg-secondary hover:text-black rounded-lg transition-colors duration-200 hover:[&_.iconify]:text-black'
    },
    {
      icon: 'lucide:folder-closed',
      label: 'Brands',
      to: '/brands',
      active: route.path.startsWith('/brand'),
      class:
        'text-primary dark:text-white hover:bg-secondary hover:text-black rounded-lg transition-colors duration-200 hover:[&_.iconify]:text-black'
    },
    {
      icon: 'lucide:info',
      label: 'About Us',
      to: '/about-us',
      active: route.path.startsWith('/about-us'),
      class:
        'text-primary dark:text-white hover:bg-secondary hover:text-black rounded-lg transition-colors duration-200 hover:[&_.iconify]:text-black'
    },
    {
      icon: 'lucide:book-text',
      label: 'Blog',
      to: '/blogs',
      active: route.path.startsWith('/blog'),
      class:
        'text-primary dark:text-white hover:bg-secondary hover:text-black rounded-lg transition-colors duration-200 hover:[&_.iconify]:text-black'
    }
  ])

  watch(
    () => route.query.q,
    (newQ) => {
      searchQuery.value = newQ || ''
    }
  )

  watch(
    () => route.path,
    (newPath) => {
      if (!newPath.startsWith('/brands')) {
        searchQuery.value = ''
      }
    }
  )

  function applyfilters() {
    onKeyStroke('Enter', () => {
      if (searchQuery.value) {
        navigateTo(`/brands?q=${searchQuery.value}`)
      } else {
        navigateTo('/brands')
      }
    })
  }
</script>
