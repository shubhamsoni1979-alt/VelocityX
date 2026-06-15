<script setup lang="ts">
import { allCars } from '../../data/cars'
import CarCard from '../CarCard.vue'

const selected = ref(0)

const items = [
  {
    label: 'Hatchback',
    image: '/bodytype/image-Photoroom.png'
  },
  {
    label: 'Sedan',
    image: '/bodytype/Screenshot 2026-06-12 181428-Photoroom.png'
  },
  {
    label: 'SUV',
    image: '/bodytype/Screenshot 2026-06-12 181436-Photoroom.png'
  },
  {
    label: 'EV',
    image: '/bodytype/image-Photoroom.png'
  }
]

const displayedCars = computed(() => {
  const label = items[selected.value]?.label
  if (!label) return []
  return allCars
    .filter(car => car.category.toLowerCase() === label.toLowerCase())
    .slice(0, 3)
})

const buttonText = computed(() => {
  return `View all ${items[selected.value]?.label.toLowerCase()}s`
})

const router = useRouter()
function goToBrands() {
  const tag = items[selected.value]?.label || ''
  router.push({ path: '/brands', query: { tag } })
}
</script>

<template>
  <section class="py-8">
    <!-- Body Type Tabs -->
    <div class="flex justify-center">
      <UTabs v-model="selected" :items="items" color="neutral" class="w-fit py-6">
        <template #default="{ item }">
          <div class="flex items-center justify-center gap-2 px-4 py-2">
            <img :src="item.image" :alt="item.label" class="h-10 w-auto">
            <span class="font-medium text-sm">{{ item.label }}</span>
          </div>
        </template>
      </UTabs>
    </div>

    <!-- Car Cards -->
    <div class="mx-auto max-w-7xl px-4 mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        <CarCard
          v-for="car in displayedCars"
          :key="car.id"
          :data="car"
          :small="true"
        />
      </div>
    </div>

    <!-- Fixed Width Dynamic Button -->
    <div class="mt-16 flex justify-center">
      <UButton color="neutral" size="xl" class="w-72 justify-center rounded-2xl py-4" @click="goToBrands">
        {{ buttonText }}
      </UButton>
    </div>
  </section>
</template>