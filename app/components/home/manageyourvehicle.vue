<script setup lang="ts">
const services = [
  {
    title: 'Pay challan',
    image: '/manageyourcar/154b3881-d141-4063-a2be-09a6be2c143fProperty 1=1.avif'
  },
  {
    title: 'Recharge FASTag',
    image: '/manageyourcar/494244bb-f3b3-40ab-be3c-d6c91939ae60Property 1=2.avif'
  },
  {
    title: 'Get car insurance',
    image: '/manageyourcar/d2d39417-c6c9-4d7d-8d2e-af32038f01edProperty 1=3.avif'
  },
  {
    title: 'Road side assistance',
    image: '/manageyourcar/185a9257-169a-4e2d-ab0d-0891c2ab50deProperty 1=4.avif'
  },
  {
    title: 'Get warranty',
    image: '/manageyourcar/831809ec-a5ee-4714-94ba-92bf07576125Property 1=5.avif'
  },
  {
    title: 'Get assured buyback',
    image: '/manageyourcar/assuredbuyback.avif'
  }
]
</script>

<template>
  <section
    class="my-10  py-6"
  >
    <UContainer>
      <h2 class="mb-6 text-3xl font-bold text-white">
        Manage your vehicle
      </h2>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <UCard
  v-for="service in services"
  :key="service.title"
  class="h-28 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  :ui="{
    body: 'p-0 sm:p-0'
  }"
>
  <div class="flex h-26 items-center justify-between px-4">
    <h3 class="max-w-[90px] text-sm font-semibold leading-5 text-gray-800">
      {{ service.title }}
    </h3>

    <img
      :src="service.image"
      :alt="service.title"
      class="h-16 w-16 object-contain"
    >
  </div>
</UCard>
      </div>
    </UContainer>
  </section>
</template>