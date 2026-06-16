<template>
  <UContainer class="py-8">
    <!-- Back to Home -->
    <div class="mb-6">
      <UButton
        icon="i-lucide-arrow-left"
        label="Back to Home"
        variant="ghost"
        color="neutral"
        class="hover:translate-x-[-4px] transition-transform"
        to="/"
      />
    </div>

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
          <template v-for="category in selectedCategories" :key="`cat-${category}`">
            <UBadge color="primary" variant="solid" class="cursor-pointer gap-1"
              @click="toggleFilter('category', category)">
              {{ category }} &nbsp;×
            </UBadge>
          </template>
<template v-for="brand in selectedBrands" :key="`brand-${brand}`">
            <UBadge color="primary" variant="solid" class="cursor-pointer" @click="toggleFilter('brand', brand)">
              {{ brand }} &nbsp;×
            </UBadge>
          </template>
<template v-for="tag in selectedTags" :key="`tag-${tag}`">
            <UBadge color="primary" variant="solid" class="cursor-pointer" @click="toggleFilter('tag', tag)">
              {{ tag }} &nbsp;×
            </UBadge>
          </template>
<UButton size="xs" variant="ghost" color="error" @click="clearAllFilters">
  Clear all
</UButton>
</div> -->

        <!-- Body Type -->
        <p class="text-xl font-bold mb-3">Body Type</p>
        <div class="flex flex-col gap-2.5 mb-6">
          <UCheckbox v-for="category in categories" :key="category" :model-value="selectedCategories.includes(category)"
            :label="category" color="primary" @update:model-value="toggleFilter('category', category)" />
        </div>

        <USeparator class="mb-6" />

        <!-- Brands -->
        <p class="text-xl font-bold mb-3">Brands</p>
        <div class="flex flex-col gap-2.5 mb-6 max-h-60 overflow-y-auto pr-2">
          <UCheckbox v-for="brand in brands" :key="brand" :model-value="selectedBrands.includes(brand)" :label="brand"
            color="primary" @update:model-value="toggleFilter('brand', brand)" />
        </div>

        <USeparator class="mb-6" />

        <!-- Fuel & Features -->
        <p class="text-xl font-bold mb-3">Fuel & Features</p>
        <div class="flex flex-col gap-2.5">
          <UCheckbox v-for="tag in tags" :key="tag" :model-value="selectedTags.includes(tag)" :label="tag"
            color="primary" @update:model-value="toggleFilter('tag', tag)" />
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
          <USelect v-model="sort" :items="sortOptions" class="w-48" />
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
          <CarCard v-for="car in visibleCars" :key="car.id" :data="car" />
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
const toast = useToast()

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
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const selectedTags = ref<string[]>([])

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
  selectedCategories.value = []
  selectedBrands.value = []
  selectedTags.value = []
  search.value = ''

  // 1. Sync from route query params
  if (route.query.q) {
    search.value = String(route.query.q)
  }

  if (route.query.sort) {
    sort.value = String(route.query.sort)
  } else {
    sort.value = 'asc'
  }

  if (route.query.tag) {
    const tagsArray = Array.isArray(route.query.tag) ? route.query.tag : String(route.query.tag).split(',')
    tagsArray.forEach(t => {
      const queryTag = String(t)
      const matchedCategory = categories.find(c => c.toLowerCase() === queryTag.toLowerCase())
      if (matchedCategory) {
        if (!selectedCategories.value.includes(matchedCategory)) {
          selectedCategories.value.push(matchedCategory)
        }
      } else {
        const matchedTag = tags.find(tag => tag.toLowerCase() === queryTag.toLowerCase())
        if (matchedTag && !selectedTags.value.includes(matchedTag)) {
          selectedTags.value.push(matchedTag)
        }
      }
    })
  }

  if (route.query.category) {
    const cats = Array.isArray(route.query.category) ? route.query.category : String(route.query.category).split(',')
    cats.forEach(c => {
      const matched = categories.find(cat => cat.toLowerCase() === String(c).toLowerCase())
      if (matched && !selectedCategories.value.includes(matched)) {
        selectedCategories.value.push(matched)
      }
    })
  }

  if (route.query.brand) {
    const brs = Array.isArray(route.query.brand) ? route.query.brand : String(route.query.brand).split(',')
    brs.forEach(b => {
      const matched = brands.find(brand => brand.toLowerCase() === String(b).toLowerCase())
      if (matched && !selectedBrands.value.includes(matched)) {
        selectedBrands.value.push(matched)
      }
    })
  }

  // 2. Sync from path params [...brand] (e.g. /brands/hyundai)
  if (route.params.brand && Array.isArray(route.params.brand)) {
    route.params.brand.forEach(param => {
      const pDecoded = decodeURIComponent(param).toLowerCase()

      const matchedBrand = brands.find(b => b.toLowerCase() === pDecoded)
      if (matchedBrand && !selectedBrands.value.includes(matchedBrand)) {
        selectedBrands.value.push(matchedBrand)
        return
      }

      const matchedCategory = categories.find(c => c.toLowerCase() === pDecoded)
      if (matchedCategory && !selectedCategories.value.includes(matchedCategory)) {
        selectedCategories.value.push(matchedCategory)
        return
      }

      const matchedTag = tags.find(t => t.toLowerCase() === pDecoded)
      if (matchedTag && !selectedTags.value.includes(matchedTag)) {
        selectedTags.value.push(matchedTag)
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
  if (sort.value && sort.value !== 'asc') query.sort = sort.value
  if (selectedCategories.value.length) query.category = selectedCategories.value.join(',')
  if (selectedBrands.value.length) query.brand = selectedBrands.value.join(',')
  if (selectedTags.value.length) query.tag = selectedTags.value.join(',')

  router.replace({
    path: '/brands',
    query
  })
}

// Watch search and sort inputs to update route query and reset pagination
watch([search, sort], () => {
  page.value = 1
  updateRouteQuery()
})

// ── Filter Helpers ──────────────────────────────────────────────────────────
const hasActiveFilters = computed(() =>
  selectedCategories.value.length > 0 || selectedBrands.value.length > 0 ||
  selectedTags.value.length > 0 || !!search.value
)

/** Toggle a filter – clicking the value checks/unchecks it */
function toggleFilter(type: 'category' | 'brand' | 'tag', value: string) {
  if (type === 'category') {
    const idx = selectedCategories.value.indexOf(value)
    if (idx > -1) {
      selectedCategories.value.splice(idx, 1)
    } else {
      if (selectedCategories.value.length >= 2) {
        toast.add({
          title: 'Limit Reached',
          description: 'You can select a maximum of 2 body types.',
          color: 'warning'
        })
        return
      }
      selectedCategories.value.push(value)
    }
  } else if (type === 'brand') {
    const idx = selectedBrands.value.indexOf(value)
    if (idx > -1) {
      selectedBrands.value.splice(idx, 1)
    } else {
      if (selectedBrands.value.length >= 2) {
        toast.add({
          title: 'Limit Reached',
          description: 'You can select a maximum of 2 brands.',
          color: 'warning'
        })
        return
      }
      selectedBrands.value.push(value)
    }
  } else if (type === 'tag') {
    const idx = selectedTags.value.indexOf(value)
    if (idx > -1) {
      selectedTags.value.splice(idx, 1)
    } else {
      if (selectedTags.value.length >= 2) {
        toast.add({
          title: 'Limit Reached',
          description: 'You can select a maximum of 2 tags under Fuel & Features.',
          color: 'warning'
        })
        return
      }
      selectedTags.value.push(value)
    }
  }
  page.value = 1
  updateRouteQuery()
}

function clearAllFilters() {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedTags.value = []
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

  if (selectedCategories.value.length > 0) {
    result = result.filter(car => selectedCategories.value.includes(car.category))
  }

  if (selectedBrands.value.length > 0) {
    result = result.filter(car => selectedBrands.value.includes(car.brand))
  }

  if (selectedTags.value.length > 0) {
    result = result.filter(car =>
      selectedTags.value.includes(car.fuel) ||
      selectedTags.value.includes(car.transmission) ||
      car.features.some(f => selectedTags.value.includes(f))
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
