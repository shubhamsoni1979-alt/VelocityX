<template>
  <UCard
    class="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
    @click="navigateToCar"
  >
    <!-- ── Car Image ── -->
    <template #header>
      <div class="relative overflow-hidden">
        <img
          :src="data.image"
          :alt="`${data.brand} ${data.model}`"
          class="w-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          :class="small ? 'h-[140px]' : 'aspect-video'"
        />
        <!-- Badge overlay on image -->
        <UBadge
          color="success"
          variant="solid"
          class="absolute top-3 left-3 shadow text-xs animate-pulse"
        >
          {{ data.badge }}
        </UBadge>
      </div>
    </template>

    <!-- ── Card Body ── -->
    <div class="p-4" :class="{ '!p-3': small }">

      <!-- Category and Brand badges -->
      <div class="flex flex-wrap gap-2 mb-3" :class="{ 'mb-2': small }">
        <UBadge
          color="primary"
          variant="solid"
          class="select-none"
          :class="{ 'text-[10px] px-1.5 py-0.5': small }"
        >
          {{ data.category }}
        </UBadge>
        <UBadge
          color="neutral"
          variant="soft"
          class="select-none"
          :class="{ 'text-[10px] px-1.5 py-0.5': small }"
        >
          {{ data.brand }}
        </UBadge>
      </div>

      <!-- Title -->
      <p class="font-bold text-gray-900 dark:text-white leading-snug" :class="small ? 'text-base' : 'text-lg'">
        {{ data.brand }} {{ data.model }}
      </p>
      <p class="text-gray-500" :class="small ? 'text-xs mb-1' : 'text-sm mb-4'">{{ data.variant }} &bull; {{ data.year }}</p>

      <!-- Specs grid -->
      <div v-if="!small" class="grid grid-cols-2 gap-y-2 text-sm mb-4">
        <div class="flex items-center gap-1">
          <span class="font-medium text-gray-600 dark:text-gray-400">Fuel:</span>
          <span class="text-gray-900 dark:text-white font-semibold">{{ data.fuel }}</span>
        </div>

        <div class="flex items-center gap-1">
          <span class="font-medium text-gray-600 dark:text-gray-400">Trans:</span>
          <span class="text-gray-900 dark:text-white font-semibold">{{ data.transmission }}</span>
        </div>

        <div class="text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span class="font-medium">Owner:</span> <span class="text-gray-900 dark:text-white font-semibold">{{ data.ownership }}</span>
        </div>
        <div class="text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span class="font-medium">KM:</span> <span class="text-gray-900 dark:text-white font-semibold">{{ data.kmDriven }}</span>
        </div>
      </div>

      <!-- Feature tags -->
      <div v-if="!small && data.features.length > 0" class="flex flex-wrap gap-1">
        <UBadge
          v-for="feature in data.features"
          :key="feature"
          color="neutral"
          variant="soft"
          class="select-none"
        >
          {{ feature }}
        </UBadge>
      </div>

    </div>

    <!-- ── Pricing Footer ── -->
    <template #footer>
      <div class="px-4 py-3 flex items-end justify-between" :class="{ '!px-3 !py-2': small }">
        <div>
          <p class="text-gray-400 line-through" :class="small ? 'text-xs' : 'text-sm'">
            ₹{{ data.originalPrice.toLocaleString('en-IN') }}
          </p>
          <p class="font-bold text-gray-900 dark:text-white" :class="small ? 'text-xl leading-none' : 'text-2xl'">
            ₹{{ data.discountedPrice.toLocaleString('en-IN') }}
          </p>
          <p class="text-green-600 dark:text-green-400 font-medium mt-0.5" :class="small ? 'text-[10px]' : 'text-sm'">
            EMI ₹{{ data.emi.toLocaleString('en-IN') }}/mo
          </p>
        </div>
        <UButton
          size="sm"
          color="primary"
          variant="soft"
          trailing-icon="i-lucide-arrow-right"
          :class="small ? '!py-1 !px-2.5 text-xs' : ''"
        >
          View
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Car {
  id: number
  brand: string
  model: string
  variant: string
  year: number
  category: string
  fuel: string
  transmission: string
  ownership: string
  kmDriven: string
  originalPrice: number
  discountedPrice: number
  emi: number
  badge: string
  features: string[]
  image: string
}

const props = defineProps<{
  data: Car
  small?: boolean
}>()

const router = useRouter()
function navigateToCar() {
  router.push(`/cars/${props.data.id}`)
}
</script>