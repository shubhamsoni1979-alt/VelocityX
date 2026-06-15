<script setup lang="ts">
const brands = [
  { name: 'Maruti Suzuki', logo: '/explorebrands/maruti.png' },
  { name: 'Hyundai', logo: '/explorebrands/huyndia.avif' },
  { name: 'Tata', logo: '/explorebrands/tata.png' },
  { name: 'Honda', logo: '/explorebrands/honda.png' },
  { name: 'Mahindra', logo: '/explorebrands/mahindra.avif' },
  { name: 'Skoda', logo: '/explorebrands/skoda.avif' },
  { name: 'Ford', logo: '/explorebrands/ford.avif' },
  { name: 'Kia', logo: '/explorebrands/kia.png' },
  { name: 'Renault', logo: '/explorebrands/renault.avif' },
  { name: 'Volkswagen', logo: '/explorebrands/voklswegen.avif' },
  { name: 'MG Motors', logo: '/explorebrands/mg moter.avif' },
  { name: 'Audi', logo: '/explorebrands/audi_logo_197x71-Photoroom.png' }
]

const router = useRouter()
function selectBrand(brandName: string) {
  router.push(`/brands/${encodeURIComponent(brandName.toLowerCase())}`)
}
</script>

<template>
  <section class="w-full  py-16">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center gap-6 mb-10">
        <div class="flex-1 h-px bg-gray-300" />
        <h2 class="text-4xl font-bold text-purple-900">
          Explore Popular Brands
        </h2>
        <div class="flex-1 h-px bg-gray-300" />
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        <UCard
          v-for="brand in brands"
          :key="brand.name"
          :ui="{
            root: 'rounded-3xl shadow-none border-0 cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300',
            body: 'p-6'
          }"
          @click="selectBrand(brand.name)"
        >
          <div class="flex flex-col items-center text-center">
            <img :src="brand.logo" :alt="brand.name" class="h-10 object-contain mb-4">

            <h3 class="font-medium text-gray-700">
              {{ brand.name }}
            </h3>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>