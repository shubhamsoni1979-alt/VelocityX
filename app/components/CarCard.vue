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
          class="absolute top-3 left-3 shadow text-xs"
        >
          {{ data.badge }}
        </UBadge>
      </div>
    </template>

    <!-- ── Card Body ── -->
    <div class="p-4" :class="{ '!p-3': small }">

      <!-- Category badge -->
      <div class="flex flex-wrap gap-2 mb-3" :class="{ 'mb-2': small }">
        <UBadge
          color="primary"
          :variant="selectedCategory === data.category ? 'solid' : 'outline'"
          class="cursor-pointer"
          :class="{ 'text-[10px] px-1.5 py-0.5': small }"
          @click.stop="emit('filterCategory', data.category)"
        >
          {{ data.category }}
        </UBadge>
        <UBadge
          :color="selectedBrand === data.brand ? 'primary' : 'neutral'"
          :variant="selectedBrand === data.brand ? 'solid' : 'soft'"
          class="cursor-pointer"
          :class="{ 'text-[10px] px-1.5 py-0.5': small }"
          @click.stop="emit('filterBrand', data.brand)"
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
          <UButton
            size="xs"
            :variant="selectedTag === data.fuel ? 'solid' : 'ghost'"
            :color="selectedTag === data.fuel ? 'primary' : 'neutral'"
            class="!px-1 !py-0 !h-auto text-xs"
            @click.stop="emit('filterTag', data.fuel)"
          >
            {{ data.fuel }}
          </UButton>
        </div>

        <div class="flex items-center gap-1">
          <span class="font-medium text-gray-600 dark:text-gray-400">Trans:</span>
          <UButton
            size="xs"
            :variant="selectedTag === data.transmission ? 'solid' : 'ghost'"
            :color="selectedTag === data.transmission ? 'primary' : 'neutral'"
            class="!px-1 !py-0 !h-auto text-xs"
            @click.stop="emit('filterTag', data.transmission)"
          >
            {{ data.transmission }}
          </UButton>
        </div>

        <div class="text-gray-600 dark:text-gray-400">
          <span class="font-medium">Owner:</span> {{ data.ownership }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          <span class="font-medium">KM:</span> {{ data.kmDriven }}
        </div>
      </div>

      <!-- Feature tags -->
      <div v-if="!small && data.features.length > 0" class="flex flex-wrap gap-1">
        <UBadge
          v-for="feature in data.features"
          :key="feature"
          :color="selectedTag === feature ? 'primary' : 'neutral'"
          :variant="selectedTag === feature ? 'solid' : 'soft'"
          class="cursor-pointer"
          @click.stop="emit('filterTag', feature)"
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
  selectedCategory?: string
  selectedBrand?: string
  selectedTag?: string
  small?: boolean
}>()

const emit = defineEmits<{
  filterCategory: [value: string]
  filterBrand: [value: string]
  filterTag: [value: string]
}>()

const router = useRouter()
function navigateToCar() {
  router.push(`/cars/${props.data.id}`)
}
</script>