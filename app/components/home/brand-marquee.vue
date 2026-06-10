<template>
  <UContainer>
    <div class="pt-16 pb-4 md:my-6 rounded-2xl">
      <h2 class="text-3xl md:text-4xl font-bold flex justify-center items-center">
        Be the first to explore what's trending before it trends!
      </h2>
    </div>

    <!-- marquee skeleton while loading -->
    <!-- {{ error }} -->
    <div
      v-if="status == 'pending'"
      class="flex justify-center md:justify-start items-center gap-4 my-2 rounded-2xl p-0 overflow-hidden"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="flex-shrink-0 mx-2 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 p-2"
      >
        <USkeleton class="w-50 h-50 rounded-md" />
        <USkeleton class="h-5 w-32 mt-2 rounded" />
      </div>
    </div>

    <!-- marquee -->
    <div
      v-else-if="brands?.length"
      class="flex justify-center md:justify-start items-center gap-4 my-2 rounded-2xl p-0"
    >
      <UMarquee   :reverse="false" >
        <div
          v-for="(brand, index) in brands"
          :key="brand.title"
          class="flex items-center gap-4 mx-3 my-8 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300" 
          :class="[
            index % 2 === 0 ? '-rotate-5' : 'rotate-5',
            index % 3 === 0 ? 'translate-y-3' : '-translate-y-1'
          ]"
        >
          <UPageCard
            :title="brand?.title"
            orientation="vertical"
            reverse="false"
            :ui="{
              container: 'p-2',
              header: 'w-full text-lg',
              title: 'text-xl font-bold font-serif'
            }"
          >
            <NuxtImg
              :src="brand?.image"
              :alt="brand?.title"
              class="w-50 h-50 object-contain "
            />
          </UPageCard>
        </div>
      </UMarquee>
    </div>
    <div v-else>No Brands Fetched.</div>
  </UContainer>
</template>

<script setup>
  const { getItems } = useDirectusItems()
  const {
    public: { assetsUrl }
  } = useRuntimeConfig()

  const {
    data: brands,
    error,
    status
  } = await useAsyncData('marquee-brands', async () => {
    return getItems({
      collection: 'brands',
      params: {
        fields: ['logo', 'name'],
        limit: 6,
        filter: {
          status: { _eq: 'approved' }
        },
        sort: ['date_created']
      }
    }).then((res) => {
      return res.map((item) => ({
        title: item?.name,
        image: `${assetsUrl}/${item?.logo}`
      }))
    })
  })
</script>
