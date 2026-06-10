<template>
  <UBlogPost
    :title="data.title"
    :description="data.description"
    :image="getAssetsUrl(data.cover_image)"
    :date="data.date"
    :to="data.path"
    :target="data.target"
    :ui="{
      container: 'p-4 sm:p-4',
      description: 'line-clamp-2'
    }"
  />
</template>
<script setup>
  const props = defineProps({
    data: Object
  })
</script>
