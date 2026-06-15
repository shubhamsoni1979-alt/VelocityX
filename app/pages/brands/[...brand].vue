<template>
  <UContainer class="py-8">
    <h1 class="text-5xl font-bold mb-8">Explore Cars</h1>

    <div class="grid grid-cols-12 gap-8">

      <!-- ══════════════════════════════
           Sidebar
      ══════════════════════════════ -->
      <aside class="col-span-12 lg:col-span-3 sticky top-24 self-start h-fit">

        <!-- Search -->
        <UInput v-model="search" icon="i-lucide-search" placeholder="Search Brand, Model or Variant" class="mb-6" />

        <!-- Active Filters pill strip -->
        <!-- <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-6">
          <UBadge
            v-if="selectedCategory"
            color="primary"
            variant="solid"
            class="cursor-pointer gap-1"
            @click="selectedCategory = ''"
          >
            {{ selectedCategory }} &nbsp;×
          </UBadge>
          <UBadge
            v-if="selectedBrand"
            color="primary"
            variant="solid"
            class="cursor-pointer"
            @click="selectedBrand = ''"
          >
            {{ selectedBrand }} &nbsp;×
          </UBadge>
          <UBadge
            v-if="selectedTag"
            color="primary"
            variant="solid"
            class="cursor-pointer"
            @click="selectedTag = ''"
          >
            {{ selectedTag }} &nbsp;×
          </UBadge>
          <UButton size="xs" variant="ghost" color="error" @click="clearAllFilters">
            Clear all
          </UButton>
        </div> -->

        <!-- Body Type -->
        <p class="text-xl font-bold mb-3">Body Type</p>
        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge v-for="category in categories" :key="category"
            :color="selectedCategory === category ? 'primary' : 'neutral'"
            :variant="selectedCategory === category ? 'solid' : 'soft'" class="cursor-pointer select-none"
            @click="toggleFilter('category', category)">
            {{ category }}
          </UBadge>
        </div>

        <USeparator class="mb-6" />

        <!-- Brands -->
        <p class="text-xl font-bold mb-3">Brands</p>
        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge v-for="brand in brands" :key="brand" :color="selectedBrand === brand ? 'primary' : 'neutral'"
            :variant="selectedBrand === brand ? 'solid' : 'soft'" class="cursor-pointer select-none"
            @click="toggleFilter('brand', brand)">
            {{ brand }}
          </UBadge>
        </div>

        <USeparator class="mb-6" />

        <!-- Fuel & Features -->
        <p class="text-xl font-bold mb-3">Fuel & Features</p>
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="tag in tags" :key="tag" :color="selectedTag === tag ? 'primary' : 'neutral'"
            :variant="selectedTag === tag ? 'solid' : 'soft'" class="cursor-pointer select-none"
            @click="toggleFilter('tag', tag)">
            {{ tag }}
          </UBadge>
        </div>
      </aside>

      <!-- ══════════════════════════════
           Main Content
      ══════════════════════════════ -->
      <section class="col-span-12 lg:col-span-9">

        <!-- Toolbar -->
        <div class="flex justify-between items-center mb-6">
          <p class="text-sm text-gray-500">
            <span class="font-semibold text-gray-800 dark:text-white">
              {{ filteredCars.length }}
            </span>
            car{{ filteredCars.length !== 1 ? 's' : '' }} found
          </p>
          <USelect v-model="sort" :options="sortOptions" option-attribute="label" value-attribute="value"
            class="w-48" />
        </div>

        <!-- Empty state -->
        <UCard v-if="filteredCars.length === 0" class="text-center py-16">
          <p class="text-5xl mb-4">🚗</p>
          <p class="text-xl font-semibold mb-2">No cars match your filters</p>
          <p class="text-sm text-gray-500 mb-6">
            Try adjusting your search or removing some filters.
          </p>
          <UButton color="neutral" @click="clearAllFilters">Clear all filters</UButton>
        </UCard>

        <!-- Car Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
          <CarCard v-for="car in visibleCars" :key="car.id" :data="car" :selected-category="selectedCategory"
            :selected-brand="selectedBrand" :selected-tag="selectedTag"
            @filter-category="toggleFilter('category', $event)" @filter-brand="toggleFilter('brand', $event)"
            @filter-tag="toggleFilter('tag', $event)" />
        </div>

        <!-- Infinite scroll trigger -->
        <div ref="loadMoreTrigger" class="h-10 mt-4">
          <p v-if="visibleCars.length < filteredCars.length" class="text-center py-4 text-gray-400 text-sm">
            Loading more cars...
          </p>
        </div>

      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { allCars, type Car } from '~/data/cars'

const route = useRoute()
const router = useRouter()

// SEO Meta
useSeoMeta({
  title: 'Explore Used Cars | VelocityX',
  description: 'Explore and filter a wide range of certified used cars by body type, brand, fuel type, and features at VelocityX.'
})

// ── Static Filter Lists ─────────────────────────────────────────────────────
const categories = ['SUV', 'Sedan', 'Hatchback', 'EV']

const brands = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Mahindra',
  'Skoda', 'Ford', 'Kia', 'Renault', 'Volkswagen', 'MG Motors', 'Audi',
]

const tags = [
  'Petrol', 'Diesel', 'Automatic', 'Manual',
  'ADAS', 'Sunroof', 'Hybrid', 'Electric',
]

// ── Reactive State ──────────────────────────────────────────────────────────
const search = ref('')
const sort = ref('asc')
const page = ref(1)
const selectedCategory = ref('')
const selectedBrand = ref('')
const selectedTag = ref('')

// ── Sort Options ────────────────────────────────────────────────────────────
const sortOptions = [
  { label: 'A–Z', value: 'asc' },
  { label: 'Z–A', value: 'desc' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
]

// ── Route & Filter Sync ──────────────────────────────────────────────────────
function syncFiltersFromRoute() {
  // Reset all filters first to prevent sticky states on route transitions
  selectedCategory.value = ''
  selectedBrand.value = ''
  selectedTag.value = ''
  search.value = ''

  // 1. Sync from route query params
  if (route.query.q) {
    search.value = String(route.query.q)
  }

  if (route.query.tag) {
    const queryTag = String(route.query.tag)
    const matchedCategory = categories.find(c => c.toLowerCase() === queryTag.toLowerCase())
    if (matchedCategory) {
      selectedCategory.value = matchedCategory
    } else {
      const matchedTag = tags.find(t => t.toLowerCase() === queryTag.toLowerCase())
      if (matchedTag) {
        selectedTag.value = matchedTag
      }
    }
  }

  if (route.query.category) {
    const matchedCategory = categories.find(c => c.toLowerCase() === String(route.query.category).toLowerCase())
    if (matchedCategory) {
      selectedCategory.value = matchedCategory
    }
  }

  if (route.query.brand) {
    const matchedBrand = brands.find(b => b.toLowerCase() === String(route.query.brand).toLowerCase())
    if (matchedBrand) {
      selectedBrand.value = matchedBrand
    }
  }

  // 2. Sync from path params [...brand] (e.g. /brands/hyundai)
  if (route.params.brand && Array.isArray(route.params.brand)) {
    route.params.brand.forEach(param => {
      const pDecoded = decodeURIComponent(param).toLowerCase()

      const matchedBrand = brands.find(b => b.toLowerCase() === pDecoded)
      if (matchedBrand) {
        selectedBrand.value = matchedBrand
        return
      }

      const matchedCategory = categories.find(c => c.toLowerCase() === pDecoded)
      if (matchedCategory) {
        selectedCategory.value = matchedCategory
        return
      }

      const matchedTag = tags.find(t => t.toLowerCase() === pDecoded)
      if (matchedTag) {
        selectedTag.value = matchedTag
        return
      }
    })
  }
}

// Watch for route changes to update filters
watch(() => route.fullPath, syncFiltersFromRoute, { immediate: true })

// Function to update the URL query parameters when filters change
function updateRouteQuery() {
  const query: Record<string, any> = {}

  if (search.value) query.q = search.value
  if (selectedCategory.value) query.category = selectedCategory.value
  if (selectedBrand.value) query.brand = selectedBrand.value
  if (selectedTag.value) query.tag = selectedTag.value

  router.replace({
    query
  })
}

// Watch search input to update route query and reset pagination
watch(search, () => {
  page.value = 1
  updateRouteQuery()
})

// ── Filter Helpers ──────────────────────────────────────────────────────────
const hasActiveFilters = computed(() =>
  !!selectedCategory.value || !!selectedBrand.value ||
  !!selectedTag.value || !!search.value
)

/** Toggle a single filter – clicking the active value clears it */
function toggleFilter(type: 'category' | 'brand' | 'tag', value: string) {
  if (type === 'category') selectedCategory.value = selectedCategory.value === value ? '' : value
  if (type === 'brand') selectedBrand.value = selectedBrand.value === value ? '' : value
  if (type === 'tag') selectedTag.value = selectedTag.value === value ? '' : value
  page.value = 1
  updateRouteQuery()
}

function clearAllFilters() {
  selectedCategory.value = ''
  selectedBrand.value = ''
  selectedTag.value = ''
  search.value = ''
  page.value = 1
  updateRouteQuery()
}

// ── Filtered & Sorted ────────────────────────────────────────────────────────
const filteredCars = computed(() => {
  let result = [...allCars]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(car =>
      `${car.brand} ${car.model} ${car.variant}`.toLowerCase().includes(q)
    )
  }

  if (selectedCategory.value)
    result = result.filter(car => car.category === selectedCategory.value)

  if (selectedBrand.value)
    result = result.filter(car => car.brand === selectedBrand.value)

  if (selectedTag.value) {
    const t = selectedTag.value
    result = result.filter(car =>
      car.fuel === t || car.transmission === t || car.features.includes(t)
    )
  }

  result.sort((a, b) => {
    if (sort.value === 'asc') return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
    if (sort.value === 'desc') return `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`)
    if (sort.value === 'price_asc') return a.discountedPrice - b.discountedPrice
    if (sort.value === 'price_desc') return b.discountedPrice - a.discountedPrice
    return 0
  })

  return result
})

// ── Infinite Scroll ──────────────────────────────────────────────────────────
const perPage = 6
const visibleCars = computed(() => filteredCars.value.slice(0, page.value * perPage))
const loadMoreTrigger = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    // if (entries[0].isIntersecting && visibleCars.value.length < filteredCars.value.length)
    page.value++
  }, { threshold: 0.1 })

  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value)
})
</script>
