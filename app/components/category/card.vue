<template>
  <UPageCard
    :title="data.name"
    :reverse="true"
    :orientation="'vertical'"
    :to="`/brands?category=${encodeURIComponent(data.name)}`"
    variant="soft"
    :ui="{
      root: 'cat-card',
      container: 'p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2',
      body: 'mx-auto',
      title: 'text-black font-semibold'
    }"
  >
    <NuxtImg
      v-if="data.icon"
      :src="getAssetsUrl(data.icon?.id || data.icon)"
      class="h-24 w-24 mx-auto my-auto"
    />
  </UPageCard>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    data: Object
  })

  const bgColor = computed(() => props.data?.color?._50 || props.data?.colors?.[0] || '#f5f5f5')
  const bgHoverColor = computed(
    () => props.data.color?._200 || props.data?.colors?.[0] || '#e0e0e0'
  )
</script>

<style scoped>
  .cat-card {
    background-color: v-bind(bgColor);
    transition: background-color 0.3s;
  }

  .cat-card:hover {
    background-color: v-bind(bgHoverColor);
  }
</style>
