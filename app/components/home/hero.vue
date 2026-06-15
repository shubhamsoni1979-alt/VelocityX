<template>
  <div class="w-full">
    <UPageHero title="India's Trusted Used Car Marketplace"
      description="Discover verified used cars, compare prices, and drive home your dream vehicle with confidence."
      orientation="horizontal" :ui="{
        container: 'py-0 sm:py-0 lg:py-8'
      }">
      <template #links>
        <div class="flex gap-4">
          <UButton to="/brands/Suv" color="neutral" icon="i-lucide-arrow-right">
            Explore Cars
          </UButton>
        </div>
      </template>

      <img src="/herosection illustration.jpg" alt="Buy and Sell Cars" class="w-full rounded-xl object-cover" />
    </UPageHero>
  </div>
</template>