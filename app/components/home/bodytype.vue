

<template>
    <UContainer>
  <section class=" py-8 space-y-10">
     <div class="flex items-center gap-6 mb-10">
        <div class="flex-1 h-px bg-gray-300" />
        <h2 class="text-4xl font-bold text-purple-900">
          Explore by Body Type
        </h2>
        <div class="flex-1 h-px bg-gray-300" />
      </div>

    <UTabs
      :items="bodyTypes"
      class="max-w-xl mx-auto"
    >
      <template #leading="{ item }">
        <UIcon :name="item.icon" />
      </template>
    </UTabs>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <UCard
        v-for="car in cars"
        :key="car.name"
        class="overflow-hidden p-0"
      >
        <img
          :src="car.image"
          :alt="car.name"
          class="h-52 w-full object-cover"
        >

        <template #footer>
          <h3 class="font-medium">
            {{ car.name }}
          </h3>

          <p class="text-2xl font-bold mt-1">
            {{ car.price }}
            <span class="text-sm text-muted">
              onwards
            </span>
          </p>
        </template>
      </UCard>
    </div>

    <div class="text-center">
      <UButton
        variant="outline"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
      >
        View all hatchbacks
      </UButton>
    </div>
  </section>
  </UContainer>
</template>


<script setup lang="ts">
const bodyTypes = [
  { label: 'Hatchback', icon: 'i-lucide-car-front' },
  { label: 'Sedan', icon: 'i-lucide-car' },
  { label: 'SUV', icon: 'i-lucide-truck' },
  { label: 'MUV', icon: 'i-lucide-bus' }
]

const cars = [
  {
    name: 'Maruti Suzuki Baleno',
    price: '₹3.63 Lakh',
    image: '/cars/baleno.webp'
  },
  {
    name: 'Hyundai Grand i10',
    price: '₹3.12 Lakh',
    image: '/cars/i10.webp'
  },
  {
    name: 'Maruti Suzuki Alto 800',
    price: '₹1.86 Lakh',
    image: '/cars/alto.webp'
  },
  {
    name: 'Renault Kwid',
    price: '₹1.91 Lakh',
    image: '/cars/kwid.webp'
  }
]
</script>