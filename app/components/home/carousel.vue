<script setup lang="ts">
const items = [
  '/carousel/277a5258-aba9-4574-9603-789e540e3906.jpg',
  '/carousel/image.png',
  '/carousel/324a961f-c0d7-40f7-b2b3-5d8d446e58c8.jpg',
   '/carousel/277a5258-aba9-4574-9603-789e540e3906.jpg',
  '/carousel/image.png',
  '/carousel/324a961f-c0d7-40f7-b2b3-5d8d446e58c8.jpg'
  
]
</script>

<template>
  <UContainer>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      loop
      arrows
      :autoplay="{ delay: 2000 }"
      :ui="{ item: 'basis-1/3' }"
    >
      <img
        :src="item"
        class="w-full rounded-4xl"
        alt=""
      >
    </UCarousel>
  </UContainer>
</template>