<template>
  <UContainer>
    <div class="hidden md:flex justify-end mb-2">
      <UButton
        :icon="selectedSort === 'desc' ? 'tabler:sort-z-a' : 'tabler:sort-a-z'"
        @click="sortbrands()"
        :variant="selectedSort === 'asc' || selectedSort === 'desc' ? 'solid' : 'soft'"
        :color="selectedSort === 'asc' || selectedSort === 'desc' ? 'primary' : 'neutral'"
        class="cursor-pointer px-2"
      />
    </div>
    <!-- Mobile top bar -->
    <div
      class="flex md:hidden flex-col gap-2 mb-4 sticky top-16 z-10 bg-white dark:bg-black pt-2 pb-3 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex gap-2 items-center">
        <UInput
          icon="i-heroicons-magnifying-glass"
          placeholder="Search brands..."
          v-model="searchQuery"
          @input="debouncegetbrands"
          class="flex-1"
        />
        <UButton
          :label="selectedSort === 'desc' ? 'Z-A' : 'A-Z'"
          @click="sortbrands()"
          :variant="selectedSort === 'asc' || selectedSort === 'desc' ? 'solid' : 'soft'"
          :color="selectedSort === 'asc' || selectedSort === 'desc' ? 'primary' : 'neutral'"
        />
      </div>
      <div class="flex gap-2">
        <!-- categories dropdown -->
        <select
          v-model="selectedCategory"
          @change="onCategoryChange"
          class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-black text-sm"
        >
          <option value="">All Categories</option>
          <option v-for="category in data?.categories" :key="category.slug" :value="category.name">
            {{ category.name }}
          </option>
        </select>
        <!-- tags dropdown  -->
        <select
          v-model="selectedTag"
          @change="getbrands()"
          class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-black text-sm"
        >
          <option value="">All Tags</option>
          <option v-for="tag in data?.tags" :key="tag.slug" :value="tag.name">
            {{ tag.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Desktop layout -->
    <div class="flex justify-between gap-6">
      <!-- Left sidebar (desktop only) -->
      <div class="hidden md:flex flex-col w-1/5 sticky top-20 h-fit self-start gap-4">
        <!-- Skeleton  for the entire left sidebar -->
        <template v-if="pending">
          <USkeleton class="h-9 w-full rounded-md" />

          <!-- Categories skeleton -->
          <div>
            <USkeleton class="h-7 w-32 mb-2 rounded" />
            <div class="flex flex-wrap gap-1">
              <USkeleton class="h-7 w-20 rounded-full" />
              <USkeleton class="h-7 w-24 rounded-full" />
              <USkeleton class="h-7 w-16 rounded-full" />
              <USkeleton class="h-7 w-28 rounded-full" />
              <USkeleton class="h-7 w-18 rounded-full" />
              <USkeleton class="h-7 w-22 rounded-full" />
              <USkeleton class="h-7 w-20 rounded-full" />
              <USkeleton class="h-7 w-26 rounded-full" />
            </div>
          </div>

          <!-- Tags skeleton -->
          <div class="mt-4">
            <USkeleton class="h-7 w-16 mb-2 rounded" />
            <div class="flex flex-wrap gap-1">
              <USkeleton class="h-7 w-16 rounded-full" />
              <USkeleton class="h-7 w-22 rounded-full" />
              <USkeleton class="h-7 w-14 rounded-full" />
              <USkeleton class="h-7 w-20 rounded-full" />
              <USkeleton class="h-7 w-24 rounded-full" />
              <USkeleton class="h-7 w-18 rounded-full" />
            </div>
          </div>
        </template>

        <!-- content -->
        <template v-else>
          <UInput
            icon="i-heroicons-magnifying-glass"
            placeholder="Search brands..."
            v-model="searchQuery"
            @input="debouncegetbrands"
            class="w-full"
          />

          <div>
            <h3 class="text-2xl font-bold w-full mb-2">Categories</h3>
            <div class="flex flex-wrap gap-1 max-h-50 overflow-y-auto">
              <UButton
                v-for="category in data?.categories"
                :key="category.slug"
                :label="category.name"
                @click="selectCategory(category.name)"
                :variant="selectedCategory === category.name ? 'solid' : 'soft'"
                :color="selectedCategory === category.name ? 'primary' : 'neutral'"
                class="cursor-pointer"
              />
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-2xl font-bold w-full mb-2">Tags</h3>
            <div class="flex flex-wrap gap-1 max-h-50 overflow-y-auto">
              <UButton
                v-for="tag in data?.tags"
                :key="tag.slug"
                :label="tag.name"
                @click="selectTag(tag.name)"
                :variant="selectedTag === tag.name ? 'solid' : 'soft'"
                :color="selectedTag === tag.name ? 'primary' : 'neutral'"
                class="cursor-pointer"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Brands grid -->
      <div class="flex-1" keep-alive>
        <UPageGrid
          :ui="{ base: 'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2' }"
          v-if="pending"
        >
          <div
            v-for="n in 8"
            :key="n"
            class="flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
          >
            <USkeleton class="w-full aspect-square rounded-none" />
            <div class="p-4 flex flex-col gap-3">
              <USkeleton class="h-6 w-3/4" />
              <div class="space-y-2">
                <USkeleton class="h-4 w-full" />
                <USkeleton class="h-4 w-5/6" />
              </div>
              <div class="flex gap-2 mt-2">
                <USkeleton class="h-5 w-12 rounded-full" />
                <USkeleton class="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </UPageGrid>

        <UPageGrid
          v-else-if="allBrands.length"
          :ui="{
            base: 'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6'
          }"
        >
          <BrandCard v-for="brand in allBrands" :key="brand.path" :data="brand" />
        </UPageGrid>
        <div class="flex items-center justify-center" v-else>
          <img
            dark:hidden
            src="/images/BRAND ERROR.png"
            class="w-120 h-110 align-center dark:hidden"
          />
          <img
            dark:block
            src="/images/BRAND ERROR (1).png"
            class="w-120 h-110 align-center hidden dark:block"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center" v-if="totalCount > perPage">
          <UPagination v-model:page="currentPage" :total="totalCount" :items-per-page="perPage" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<!-- =========================================================================== -->
<script setup>
  const route = useRoute()
  const router = useRouter()
  // for search input in header
  const searchQuery = ref(route.query.searchQuery || '')
  // cat name coming from cat page
  const selectedCategory = ref(route.query.category || '')
  const selectedTag = ref('')
  const selectedSort = ref('')
  const allBrands = ref([])
  // for skeleton loader
  const pending = ref(true)
  //#Pagination
  const perPage = 8
  const currentPage = ref(1)
  const totalCount = ref(0)

  // Watch page changes to re-fetch on pagination
  watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getbrands()
  })

  // Watch for search query changes in URL, change url when resetting query
  watch(
    () => route.query.searchQuery,
    (newQuery) => {
      searchQuery.value = newQuery || ''
      if (searchQuery.value === '') {
        selectedSort.value = ''
      }
      getbrands()
    }
  )

  // Watch for category changes in URL whike coming from cat page
  watch(
    () => route.query.category,
    (newCategory) => {
      if (newCategory) {
        selectedCategory.value = newCategory
      } else {
        selectedCategory.value = ''
      }
      getbrands()
    }
  )

  // Watch for global search query (from header)
  watch(
    () => route.query.q,
    () => {
      getbrands()
    }
  )

  // Data fetching
  const { getItems } = useDirectusItems()

  // Data fetching for left bar
  const { data } = useAsyncData('explore-brands', async () => {
    let rawCategories = []
    let rawTags = []

    // fetch categories for left bar
    try {
      rawCategories = await getItems({
        collection: 'categories',
        params: { fields: ['name', 'slug'] }
      })
    } catch (err) {
      console.error(err)
    }

    // fetch tags for left bar
    try {
      rawTags = await getItems({
        collection: 'tags',
        params: { fields: ['name', 'slug'] }
      })
    } catch (err) {
      console.error(err)
    }

    return {
      categories: rawCategories,
      tags: rawTags
    }
  })

  // Toggle category selection
  function selectCategory(name) {
    selectedCategory.value = selectedCategory.value === name ? '' : name
    updateUrl()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getbrands()
  }

  // Toggle tag selection
  function selectTag(name) {
    selectedTag.value = selectedTag.value === name ? '' : name
    updateUrl()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getbrands()
  }

  // Mobile handlers
  function onCategoryChange() {
    updateUrl()
    getbrands()
  }

  // Update URL when filters change
  function updateUrl() {
    router.push({
      query: {
        ...route.query,
        category: selectedCategory.value || undefined,
        tag: selectedTag.value || undefined,
        searchQuery: searchQuery.value || undefined
      }
    })
  }

  // Toggle sort buttton
  function sortbrands() {
    if (selectedSort.value === 'asc') {
      selectedSort.value = 'desc'
    } else {
      selectedSort.value = 'asc'
    }
    getbrands()
  }

  // whole fun to get brands with filter
  async function getbrands() {
    pending.value = true
    // base filter
    const baseFilters = [
      {
        status: {
          _eq: 'approved'
        }
      }
    ]
    // Get parameters from URL
    const globalSearch = route.query.q || '' //from header
    const localSearch = searchQuery.value //search in top section

    if (localSearch || globalSearch) {
      const searchVal = localSearch || globalSearch //assign search value
      if (globalSearch && !localSearch) {
        baseFilters.push({
          _or: [
            { name: { _icontains: searchVal } },
            {
              categories: {
                category: {
                  name: { _icontains: searchVal }
                }
              }
            },
            {
              tags: {
                tag: {
                  name: { _icontains: searchVal }
                }
              }
            },
            {
              categories: {
                category: {
                  name: { _icontains: searchVal }
                }
              }
            }
          ]
        })
      } else {
        // Narrow search for local search query
        baseFilters.push({
          _or: [
            {
              name: {
                _icontains: searchVal
              }
            },
            {
              meta_description: {
                _icontains: searchVal
              }
            }
          ]
        })
      }
    }
    // Category and tag filters left bar section
    if (selectedCategory.value) {
      baseFilters.push({
        categories: {
          category: {
            name: {
              _contains: selectedCategory.value
            }
          }
        }
      })
    }
    if (selectedTag.value) {
      baseFilters.push({
        tags: {
          tag: {
            name: {
              _contains: selectedTag.value
            }
          }
        }
      })
    }

    let filter = {
      _and: [...baseFilters]
    }

    //all brands for right side
    try {
      const offset = (currentPage.value - 1) * perPage
      await getItems({
        collection: 'brands',
        params: {
          fields: [
            'logo',
            'name',
            'meta_description',
            'tags.tag.name',
            'categories.category.name',
            'slug'
          ],
          filter: filter,
          meta: 'filter_count',
          limit: perPage,
          offset: offset,
          sort:
            selectedSort.value === 'asc'
              ? ['name']
              : selectedSort.value === 'desc'
                ? ['-name']
                : ['-date_created']
        }
      }).then((res) => {
        totalCount.value = res?.meta?.filter_count || 0
        allBrands.value = res.data.map((item) => {
          return {
            title: item?.name,
            meta_description: item?.meta_description,
            path: `/brands/${item?.slug}`,
            image: getAssetsUrl(item?.logo),
            categories: item?.categories?.map((i) => i?.category?.name),
            tags: item?.tags?.map((i) => i?.tag?.name)
          }
        })
      })
    } catch (err) {
      showError({
        statusCode: 500,
        message: 'Failed to load brands',
        fatal: true
      })
    } finally {
      pending.value = false
    }
  }

  // debounce for search
  const debouncegetbrands = useDebounceFn(() => {
    getbrands()
  }, 500)

  onMounted(() => {
    getbrands()
  })
</script>
