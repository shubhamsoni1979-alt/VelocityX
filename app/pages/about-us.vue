<template>
  <!-- Skeleton Loading State -->
  <div v-if="pending">
    <UContainer>
      <div class="flex flex-col md:flex-row gap-8 items-center py-8">
        <div class="flex-1 space-y-4">
          <USkeleton class="h-6 w-24" />
          <USkeleton class="h-10 w-3/4" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
          </div>
        </div>
        <USkeleton class="w-125 h-120 rounded-lg" />
      </div>
    </UContainer>
    <div class="py-5">
      <USkeleton class="h-8 w-full" />
    </div>
    <UContainer>
      <div class="w-full flex items-center justify-center gap-x-12 py-4">
        <div v-for="n in 3" :key="n" class="flex flex-col items-center gap-2">
          <USkeleton class="h-12 w-24" />
          <USkeleton class="h-6 w-32" />
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Content -->
  <template v-else>
    <UPageHero
      :ui="{
        container: 'py-0 sm:py-0 lg:py-0 gap-2 lg:-mt-16',
        headline: 'text-2xl my-4'
      }"
      :title="aboutData?.title"
      :description="aboutData?.description"
      headline="About Us"
      orientation="horizontal"
    >
      <NuxtImg
        :src="getAssetsUrl(aboutData?.illustration)"
        alt="D2C Guru Hero"
        class="w-full max-w-125 h-auto md:h-120 object-contain mx-auto mb-4"
      />
    </UPageHero>

    <!-- marquee -->
    <template v-if="isMounted">
      <div
        class="relative overflow-hidden my-2 bg-gradient-to-r from-white via-gray-50 to-white dark:from-black dark:via-zinc-900 dark:to-black py-3"
      >
        <!-- LEFT FADE -->
        <div
          class="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10"
        ></div>

        <!-- RIGHT FADE -->
        <div
          class="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10"
        ></div>

        <!-- MARQUEE -->
        <UMarquee class="py-2">
          <span
            class="mx-2 text-sm md:text-base font-semibold whitespace-nowrap bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent"
          >
            Discover Top D2C Brands
          </span>

          <span
            class="mx-2 text-sm md:text-base font-semibold whitespace-nowrap text-gray-700 dark:text-gray-300"
          >
            • Insights That Matter
          </span>

          <span
            class="mx-2 text-sm md:text-base font-semibold whitespace-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            • Explore Brand Stories
          </span>

          <span
            class="mx-2 text-sm md:text-base font-semibold whitespace-nowrap text-gray-700 dark:text-gray-300"
          >
            • Stay Ahead in D2C
          </span>

          <span
            class="mx-2 text-sm md:text-base font-semibold whitespace-nowrap bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            • D2C.GURU
          </span>
        </UMarquee>
      </div>
    </template>

    <!-- Stats Cards -->
    <UContainer>
      <div class="w-full flex items-center justify-center gap-x-10 mx-auto">
        <UPageCard
          v-for="stat in stats"
          :key="stat.title"
          :title="`${stat.description} +`"
          :description="stat.title"
          variant="ghost"
          :ui="{
            root: 'my-2 p-0',
            title: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center',
            description: 'text-xl md:text-2xl text-gray-500 text-center'
          }"
        />
      </div>
    </UContainer>
  </template>
</template>

<script setup>
  useSeoMeta({
    title: 'About Us | D2C Guru'
  })
  const isMounted = ref(false)

  const { getItems } = useDirectusItems()

  const { data: aboutus, pending } = useAsyncData('about-us', () => {
    return getItems({
      collection: 'about',
      params: {
        fields: ['title', 'description', 'illustration', 'team']
      }
    }).then((res) => {
      return res
    })
  })

  const { data: categories } = useAsyncData('category-page', () => {
    return getItems({
      collection: 'categories',
      params: { aggregate: { count: '*' } }
    }).then((res) => {
      return res
    })
  })

  const { data: brands } = useAsyncData('brand-page', () => {
    return getItems({
      collection: 'brands',
      params: { aggregate: { count: '*' }, filter: { status: 'approved' } }
    }).then((res) => {
      return res
    })
  })

  const aboutData = computed(() => aboutus.value?.[0])

  const brandCount = computed(() => brands.value?.[0]?.count)
  const categoryCount = computed(() => categories.value?.[0]?.count)

  const stats = computed(() => {
    return [
      {
        title: 'Team Members',
        description: aboutData?.value?.team
      },
      {
        title: 'Total Brands',
        description: brandCount.value
      },
      {
        title: 'Total Categories',
        description: categoryCount.value
      }
    ]
  })

  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        isMounted.value = true
      }, 500)
    })
  })
</script>
