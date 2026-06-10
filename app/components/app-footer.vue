<!-- FOOTER -->
<template>
  <UContainer>
    <div class="relative bg-white dark:bg-black z-20 mt-20">
      <!-- GRID -->
      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-8">
        <!-- BRAND -->
        <div class="flex flex-col items-center md:items-start">
          <img
            src="/images/D2CGuru_Logo_Black.svg"
            alt="D2C Guru Logo"
            class="h-8 w-auto mb-3 dark:hidden"
          />

          <img
            src="/images/D2CGuru_Logo_White.png"
            alt="D2C Guru Logo"
            class="h-8 w-auto mb-3 hidden dark:block"
          />

          <p class="text-gray-500 dark:text-gray-400 text-sm max-w-sm text-center md:text-left">
            Discover and explore the best D2C brands, products, and insights — all in one place.
          </p>
        </div>

        <div class="flex justify-center">
          <div class="flex flex-wrap justify-center gap-y-2">
            <UButton
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              variant="ghost"
              color="neutral"
              :label="item.label"
              class="cursor-pointer hover:bg-secondary dark:hover:text-black"
            />
          </div>
        </div>

        <!-- SOCIAL ICONS-->
        <div class="flex flex-col items-center md:items-end md:mr-6">
          <h3 class="font-semibold text-lg mb-3 mx-12">Follow Us</h3>
          <div class="flex gap-6 text-gray-400">
            <NuxtLink
              v-for="item in sociallinks"
              :key="item.icon"
              :to="item.to"
              target="_blank"
              class="cursor-pointer hover:text-primary"
            >
              <UIcon :name="item.icon" class="text-xl block" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="mt-4 py-2 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 text-center md:text-left"
      >
        &copy; 🔺 Built By
        <a class="text-primary" target="_blank" href="https://7span.com/">7Span</a>
      </div>
    </div>
  </UContainer>
</template>
<script setup>
  const items = computed(() => [
    { label: 'Home', to: '/' },
    { label: 'Categories', to: '/category' },
    { label: 'Brands', to: '/brands' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Blog', to: '/blogs' }
  ])

  const sociallinks = computed(() => [
    { icon: 'basil:facebook-outline', to: 'https://www.facebook.com' },
    { icon: 'mingcute:social-x-line', to: 'https://www.x.com' },
    { icon: 'basil:instagram-outline', to: 'https://instagram.com/d2c.guru' },
    { icon: 'basil:pinterest-outline', to: 'https://www.pinterest.com' }
  ])
</script>
