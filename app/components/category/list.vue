<template>
  <UContainer>
    <UPageGrid
      :ui="{ base: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-8' }"
      v-if="pending"
    >
      <div
        v-for="n in 10"
        :key="n"
        class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800 gap-4 aspect-square"
      >
        <USkeleton class="h-24 w-24 rounded-full" />
        <USkeleton class="h-4 w-3/4" />
      </div>
    </UPageGrid>
    <UPageGrid
      :ui="{ base: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-8' }"
      v-else-if="categories.length > 0"
    >
      <CategoryCard
        v-for="category in categories"
        :data="category"
        class="rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
      />
    </UPageGrid>
    <div v-else class="flex flex-col items-center justify-center w-full py-12">
      <NuxtImg src="/images/erroeimg.png" class="w-120 h-110 align-center"></NuxtImg>
    </div>
  </UContainer>
</template>

<script setup>
  const { getItems } = useDirectusItems()

  const { data: categories, pending } = useAsyncData('category-page', () => {
    return getItems({
      collection: 'categories',
      params: { fields: ['icon', 'name', 'color._50', 'color._200', 'slug'] }
    })
  })
</script>
