<template>
  <UContainer>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12" v-if="pending">
      <div
        v-for="n in 6"
        :key="n"
        class="flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 max-w-md mx-auto w-full"
      >
        <USkeleton class="w-full h-60 rounded-none" />
        <div class="p-4 flex flex-col gap-3">
          <USkeleton class="h-6 w-3/4" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
    <UPageGrid
      :ui="{ base: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6' }"
      v-else-if="blogs.length"
    >
      <UBlogPost
        v-for="data in blogs"
        :key="data.slug"
        :title="data.title"
        :description="data.description"
        :image="data.image"
        :to="data.path"
        class="max-w-md mx-auto"
        :ui="{
          container: 'p-0',
          body: 'p-2 sm:p-2',
          description: 'line-clamp-2',
          image: 'h-60 object-cover'
        }"
      />
    </UPageGrid>
    <div class="flex flex-col items-center justify-center w-full py-12" v-else>
      <img dark:hidden src="/images/errorimg.png" class="w-120 h-110 align-center dark:hidden" />
      <img
        dark:block
        src="/images/errorimg_white.png"
        class="w-120 h-110 align-center hidden dark:block"
      />
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center" v-if="totalCount > perPage">
      <UPagination v-model:page="currentPage" :total="totalCount" :items-per-page="perPage" />
    </div>
  </UContainer>
</template>

<script setup>
  const { getItems } = useDirectusItems()

  const blogs = ref([])
  const pending = ref(true)
  const perPage = 6
  const currentPage = ref(1)
  const totalCount = ref(0)

  // Watch page changes to re-fetch
  watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getBlogs()
  })

  async function getBlogs() {
    pending.value = true
    try {
      const offset = (currentPage.value - 1) * perPage

      await getItems({
        collection: 'blogs',
        params: {
          fields: ['title', 'description', 'cover_image', 'slug'],
          meta: 'filter_count',
          limit: perPage,
          offset: offset,
          sort: ['-date_created']
        }
      }).then((res) => {
        totalCount.value = res?.meta?.filter_count || 0
        blogs.value = res.data.map((item) => {
          return {
            title: item?.title,
            description: item?.description,
            path: `/blogs/${item?.slug}`,
            image: getAssetsUrl(item?.cover_image)
          }
        })
      })
    } catch (err) {
      showError({
        statusCode: 500,
        message: 'Failed to load blogs',
        fatal: true
      })
    } finally {
      pending.value = false
    }
  }

  // initial load
  onMounted(() => {
    getBlogs()
  })
</script>
