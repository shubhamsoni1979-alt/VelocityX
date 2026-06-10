<template>
  <UContainer>
    <div class="flex justify-between mt-8 items-center">
      <h2 class="text-4xl font-bold my-4">Newly Launched</h2>
      <UButton label="View All" to="/brands" variant="soft" />
    </div>
    <UPageGrid
      :ui="{ base: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4' }"
      v-if="brands"
    >
      <BrandCard v-for="brand in brands" :data="brand" />
    </UPageGrid>
    <div v-else>
      <p>No brands found</p>
    </div>
  </UContainer>
</template>

<script setup>
  const { getItems } = useDirectusItems()
  const {
    public: { assetsUrl }
  } = useRuntimeConfig()

  const { data: brands } = useAsyncData('new-launched-brands', async () => {
    return await getItems({
      collection: 'brands',
      params: {
        fields: ['logo', 'name', 'meta_description', 'tags.tag.name', 'slug'],
        limit: 5,
        filter: {
          status: {
            _eq: 'approved'
          }
        },
        sort: ['-date_created']
      }
    }).then((res) => {
      return res.map((item) => {
        return {
          title: item?.name,
          meta_description: item?.meta_description,
          path: `/brands/${item?.slug}`,
          image: `${assetsUrl}/${item?.logo}`,
          tags: item?.tags?.map((i) => i?.tag?.name)
        }
      })
    })
  })
</script>
