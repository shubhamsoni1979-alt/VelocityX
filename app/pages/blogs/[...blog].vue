<template>
  <!-- Skeleton Loading State -->
  <div v-if="pending">
    <UContainer>
      <div class="flex flex-col md:flex-row gap-6 py-8">
        <div class="flex-1 space-y-4">
          <USkeleton class="h-10 w-3/4" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
          </div>
        </div>
        <USkeleton class="w-full md:w-125 aspect-square rounded-lg" />
      </div>
    </UContainer>
    <UContainer>
      <div class="mt-10 px-20 space-y-4">
        <USkeleton class="h-8 w-48" />
        <div class="space-y-3">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-5/6" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-4/6" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-3/4" />
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Actual Content -->
  <template v-else>
    <UPageHero
      :ui="{
        container: 'py-0 sm:py-0 lg:py-0 gap-20 sm:gap-y-0',
        title: ' mt-6'
      }"
      :title="blogs?.title"
      :description="blogs?.description"
      orientation="horizontal"
    >
      <template #default>
        <NuxtImg
          :src="blogs?.cover_image"
          alt="cover image"
          class="w-full md:w-130 h-100 object-contain rounded-md mt-1"
        />
      </template>
    </UPageHero>
    <UContainer>
      <div class="mt-16">
        <!-- Add introduction tag here -->
        <h3 class="text-3xl font-bold mb-4">Introduction</h3>
        <div v-html="blogs?.content"></div>
      </div>
    </UContainer>
  </template>
</template>

<script setup>
  const { getItems } = useDirectusItems()
  const route = useRoute()

  const { data: blogs, pending } = useLazyAsyncData(
    'blogs-' + route.params.blog.at(-1),
    async () => {
      const res = await getItems({
        collection: 'blogs',
        params: {
          fields: ['title', 'description', 'cover_image', 'content'],
          filter: {
            slug: {
              _eq: route.params.blog.at(-1)
            }
          }
        }
      })

      if (!res || res.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Blog not found',
          fatal: true
        })
      }

      const firstItem = res[0]
      return {
        title: firstItem?.title,
        description: firstItem?.description,
        content: firstItem?.content,
        cover_image: getAssetsUrl(firstItem?.cover_image)
      }
    }
  )

  useSeoMeta({
    title: 'Blogs | D2C Guru',
    description:
      'Stay updated with the latest trends, insights, and success stories from the world of D2C brands.'
  })
</script>
