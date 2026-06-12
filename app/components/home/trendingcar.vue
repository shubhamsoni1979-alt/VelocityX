<script setup lang="ts">
const trendingCars = [
  {
    rank: 1,
    name: 'Seltos',
    brand: 'Kia',
    image: '/cars/b4747f97-fc71-421a-91b1-a6d6aefc5113Property 1=1.avif'
  },
  {
    rank: 2,
    name: 'Sonet',
    brand: 'Kia',
    image: '/cars/499a8aeb-f15c-4606-bdf8-da1b6cec4123Property 1=2.avif'
  },
  {
    rank: 3,
    name: 'Syros',
    brand: 'Kia',
    image: '/cars/2d7ddf65-bf89-45c5-829b-79178fa6d0f1Property 1=3.avif'
  },
  {
    rank: 4,
    name: 'Carens Clavis',
    brand: 'Kia',
    image: '/cars/d2693bfa-40dc-45b9-9d38-101cec51c93eProperty 1=4.avif'
  },
  {
    rank: 5,
    name: 'Slavia',
    brand: 'Skoda',
    image: '/cars/4d122adf-a794-4a1f-98e4-a62665884bd3Property 1=5.avif'
  },
  {
    rank: 6,
    name: 'Kylaq',
    brand: 'Skoda',
    image: '/cars/1c480db6-df6d-4182-aa40-dfd24d5a5af5skoda.avif'
  }
]
</script>

<template>
  <UContainer>
    <section class="py-8">
      <!-- <div class="mb-6 flex items-center justify-between"> -->
      
        
         <div class="flex items-center gap-6 mb-10">
        <div class="flex-1 h-px bg-gray-300" />
        <h2 class="text-4xl font-bold text-purple-900">
          Explore Popular Brands
        </h2>
        <div class="flex-1 h-px bg-gray-300" />
      </div>
       
     

        <!-- <UButton variant="link" size="lg">
          View all
        </UButton> -->
      <!-- </div> -->

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <UCard v-for="car in trendingCars" :key="car.rank"
        class="h-[290px] overflow-hidden rounded-3xl border-0 bg-gray-50 transition-all duration-300 hover:scale-95" :ui="{
            body: 'p-0 sm:p-0 h-full flex flex-col'
          }">
          <h3 class="px-4 pt-4 text-xl font-semibold">
            {{ car.name }}
          </h3>

          <p class="px-4 text-gray-500">
            {{ car.brand }}
          </p>

          <img :src="car.image" :alt="car.name"
            class="mt-auto h-[340px] w-full object-contain " />
        </UCard>
      </div>
    </section>
  </UContainer>
</template>