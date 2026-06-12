<template>
  <UContainer>
    <!-- brand hero section  -->
    <UPageHero
      :ui="{
        title: 'my-2',
        container: ' my-4 py-0 sm:py-0 lg:py-0 sm:px-0 lg:px-0 gap-x-10',
        description: 'mt-0 text-base'
      }"
      :description="brand?.meta_description"
      orientation="horizontal"
    >
      <!-- logo and brand name -->
      <template #title>
        <div class="flex items-center gap-4 sm:flex-col sm:items-start">
          <NuxtImg
            :src="getAssetsUrl(brand?.image)"
            alt="Brands images"
            class="w-16 h-16 sm:w-23 sm:h-23 bg-black rounded-md mt-0 lg:mt-0"
          />
          <p class="text-3xl sm:text-5xl font-bold">{{ brand?.title }}</p>
        </div>
      </template>
      <!-- Carousel images -->
      <UCarousel
        v-slot="{ item }"
        arrows
        loop
        dots
        :autoplay="{ delay: 2000 }"
        :prev-icon="'i-lucide-chevron-left'"
        :next-icon="'i-lucide-chevron-right'"
        :items="brand?.images"
        class="w-full md:w-105 lg:w-108 xl:w-110 mx-auto"
      >
        <NuxtImg
          :src="getAssetsUrl(item)"
          class="rounded-md w-full aspect-square object-contain shadow-lg"
          loading="lazy"
        />
      </UCarousel>

      <!-- tags and categories -->
      <template #links>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col items-start gap-2" v-if="brand?.categories?.length > 0">
            <p>Categories:</p>
            <div class="flex flex-wrap gap-2">
              <UBadge variant="soft" v-for="category in brand?.categories" :key="category">
                {{ category }}
              </UBadge>
            </div>
          </div>
          <div v-else>
            <p>No categories found</p>
          </div>
          <div class="flex flex-col items-start gap-2" v-if="brand?.tags?.length > 0">
            <p>Tags:</p>
            <div class="flex flex-wrap gap-2">
              <UBadge variant="soft" v-for="tag in brand?.tags" :key="tag">
                {{ tag }}
              </UBadge>
            </div>
          </div>
          <div v-else>
            <p>No tags found</p>
          </div>
        </div>
      </template>
    </UPageHero>

    <!-- overview of brand with links -->
    <UPageHero
      title="Overview"
      class="mt-16"
      :description="brand?.overview"
      :ui="{
        container: 'py-4 sm:py-6 lg:py-8'
      }"
    />
    <!-- Links -->
    <div class="justify-center flex mb-16 gap-3" v-if="social_links?.length">
      <UButton
        v-if="brand?.social_links?.instagram"
        icon="i-simple-icons-instagram"
        color="neutral"
        variant="ghost"
        :to="brand.social_links.instagram"
        target="_blank"
        aria-label="Instagram"
      />
      <UButton
        v-if="brand?.social_links?.facebook"
        icon="i-simple-icons-facebook"
        color="neutral"
        variant="ghost"
        :to="brand.social_links.facebook"
        target="_blank"
        aria-label="Facebook"
      />
      <UButton
        v-if="brand?.social_links?.x"
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        :to="brand.social_links.x"
        target="_blank"
        aria-label="X"
      />
      <UButton
        v-if="brand?.social_links?.youtube"
        icon="i-simple-icons-youtube"
        color="neutral"
        variant="ghost"
        :to="brand.social_links.youtube"
        target="_blank"
        aria-label="Youtube"
      />
      <UButton
        v-if="brand?.social_links?.linkedin"
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="ghost"
        :to="brand.social_links.linkedin"
        target="_blank"
        aria-label="Linkedin"
      />
    </div>

    <!-- CTA section -->

    <UPageCTA
      title="Loved by those who don’t settle"
      description="Explore the brand, share it with others, and experience quality like never before."
      class="relative rounded-3xl text-center overflow-hidden border border-white/10"
      :ui="{
        container: 'py-5 sm:py-6 lg:py-10 mb-2  ',
        title: 'text-white text-xl md:text-3xl font-semibold',
        description: 'text-gray-300 mt-2 ',
        links: 'mt-4 flex justify-center gap-3 flex-wrap'
      }"
    >
      <template #links>
        <UButton
          label="Visit Website"
          :to="brand?.url"
          target="_blank"
          trailing-icon="material-symbols:arrow-outward"
          class="rounded-full px-4 py-2 text-sm font-medium bg-white text-black backdrop-blur border border-white/20 hover:scale-105 hover:bg-white/80 transition"
        />

        <UButton
          label="Share Brand"
          @click="shareBrand()"
          trailing-icon="material-symbols:share-outline"
          class="rounded-full px-4 py-2 text-sm font-medium bg-white text-black backdrop-blur border border-white/20 hover:scale-105 hover:bg-white/80 transition"
        />
      </template>

      <!-- Background -->
      <template #default>
        <div
          class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.25)_0%,rgba(0,0,0,0.9)_60%,#000_100%)]"
        ></div>
      </template>
    </UPageCTA>

    <!-- similar brand -->
    <div class="flex items-center justify-between mt-10">
      <h2 class="text-4xl font-bold mb-0">Similar brands</h2>
      <UButton
        variant="subtle"
        :to="
          brand?.categories?.length
            ? `/brands?category=${encodeURIComponent(brand.categories.at(-1))}`
            : '/brands'
        "
      >
        View All
      </UButton>
    </div>

    <!-- similar brand listing -->
    <UPageGrid
      v-if="brands?.length > 0"
      :ui="{
        base: 'grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 mt-3 gap-4'
      }"
    >
      <BrandCard v-for="item in brands" :key="item.slug" :data="item" class="mx-auto w-full" />
    </UPageGrid>
    <div v-else class="text-center">
      <p class="text-gray-500">No similar brands found</p>
    </div>
  </UContainer>
</template>

<script setup>
  const toast = useToast()
  const { getItems } = useDirectusItems()
  const route = useRoute()

  // brand details all
  const { data: brand } = await useAsyncData('brand-' + route.params.brand.at(-1), async () => {
    const res = await getItems({
      collection: 'brands',
      params: {
        fields: [
          'logo',
          'name',
          'meta_description',
          'tags.tag.name',
          'slug',
          'categories.category.name',
          'url',
          'instagram',
          'facebook',
          'x',
          'youtube',
          'linkedin',
          'pinterest',
          'overview',
          'images.image'
        ],
        filter: {
          slug: {
            _eq: route.params.brand.at(-1)
          }
        }
      }
    })

    if (!res || res.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Brand not found',
        fatal: true
      })
    }

    const firstItem = res[0]
    return {
      title: firstItem?.name,
      meta_description: firstItem?.meta_description,
      path: `/brand/${firstItem?.slug}`,
      image: firstItem?.logo,
      categories: firstItem?.categories?.map((i) => i?.category?.name),
      overview: firstItem?.overview,
      tags: firstItem?.tags?.map((i) => i?.tag?.name),
      url: firstItem?.url,
      social_links: {
        instagram: firstItem?.instagram || null,
        facebook: firstItem?.facebook || null,
        x: firstItem?.x || null,
        youtube: firstItem?.youtube || null,
        linkedin: firstItem?.linkedin || null,
        pinterest: firstItem?.pinterest || null
      },
      images: firstItem?.images?.map((i) => i?.image)
    }
  })

  const social_links = computed(() => [
    {
      icon: 'i-simple-icons-instagram',
      url: brand.value?.social_links?.instagram
    },
    {
      icon: 'i-simple-icons-facebook',
      url: brand.value?.social_links?.facebook
    },
    {
      icon: 'i-simple-icons-x',
      url: brand.value?.social_links?.x
    },
    {
      icon: 'i-simple-icons-youtube',
      url: brand.value?.social_links?.youtube
    },
    {
      icon: 'i-simple-icons-linkedin',
      url: brand.value?.social_links?.linkedin
    },
    {
      icon: 'i-simple-icons-pinterest',
      url: brand.value?.social_links?.pinterest
    }
  ])

  // similar brnads with matching category of the slug brand
  const { data: brands } = await useAsyncData(
    'similar-brands-' + route.params.brand.at(-1),
    async () => {
      return getItems({
        collection: 'brands',
        params: {
          fields: ['logo', 'name', 'meta_description', 'tags.tag.name', 'slug'],
          limit: 5,
          filter: {
            _and: [
              { status: { _eq: 'approved' } },
              {
                categories: {
                  category: {
                    name: {
                      _in: brand.value?.categories
                    }
                  }
                }
              }
            ]
          }
        }
      }).then((res) => {
        return res.map((item) => ({
          title: item?.name,
          meta_description: item?.meta_description,
          path: `/brands/${item?.slug}`,
          image: getAssetsUrl(item?.logo),
          tags: item?.tags?.map((i) => i?.tag?.name),
          slug: item?.slug
        }))
      })
    }
  )

  watchEffect(() => {
    if (!brand.value) return

    useSeoMeta({
      title: `${brand.value.title} | D2C Guru `,
      description: brand.value.meta_description,

      ogTitle: `${brand.value.title} is now on D2C Guru 🚀`,
      ogDescription: brand.value.meta_description || `Discover ${brand.value.title} on D2C Guru`,

      ogImage: getAssetsUrl(brand.value.image),
      ogUrl: `https://yourdomain.com${brand.value.path}`,
      ogType: 'website',

      twitterCard: 'summary_large_image',
      twitterTitle: `${brand.value.title} on D2C Guru 🚀`,
      twitterDescription: brand.value.meta_description,
      twitterImage: getAssetsUrl(brand.value.image)
    })
  })

  const shareBrand = async () => {
    const url = window.location.href

    if (navigator.share) {
      await navigator.share({
        title: `${brand.value.title} on D2C Guru 🚀`,
        text: `Check out ${brand.value.title} on D2C Guru`,
        url
      })
    } else {
      await navigator.clipboard.writeText(url)
      toast.add({ title: 'Link copied!', color: 'success' })
    }
  }
</script>
