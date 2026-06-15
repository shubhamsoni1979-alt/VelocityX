<template>
  <UPageCard
    :title="data.title"
    :description="data.meta_description"
    orientation="vertical"
    :to="data.path"
    class="hover:scale-104"
    :ui="{
      container: 'p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2',
      header: 'w-full text-lg ',
      description: 'line-clamp-2',
      title: 'text-xl font-bold font-serif'
    }"
  >
    <template #footer>
      <div class="flex gap-2 text-xs flex-wrap" v-if="data?.tags?.length">
        <UBadge
          v-for="tag in data.tags.slice(0, 2)"
          :key="tag"
          :label="tag"
          variant="soft"
          class="w-auto"
        />
        <UBadge
          v-if="data.tags.length > 2"
          :label="`+${data.tags.length - 2}`"
          variant="soft"
          @click="handleViewMore(data.tags)"
        />
      </div>
    </template>
    <!-- card image -->
    <template #header>
      <NuxtImg
        v-if="data.image"
        :src="data.image"
        alt="Brands images"
        loading="lazy"
        class="w-full h-full object-cover aspect-square rounded-md bg-black"
    /></template>
  </UPageCard>
</template>

<script setup>
  const props = defineProps({
    data: Object
  })

  const handleViewMore = (tags) => {
    //TODO
  }
</script>
