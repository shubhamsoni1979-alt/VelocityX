<script setup></script>

<template>
  <UContainer>
    <UPageHero
      :ui="{
        headline: 'my-2 text-2xl',
        container:
          'py-0 gap-2 px-0 lg:px-0  sm:py-0 xl:py-0 xl:pt-2 xl:px-0 lg:pb-0 lg:pt-4 lg:gap-16 xl:gap-0'
      }"
      headline="Welcome to"
      title="India's Home for Niche D2C Brands"
      description="A discovery platform for niche D2C brands in India. Built for curious shoppers who want more than just trending hashtags. Every brand, handpicked."
      orientation="horizontal"
    >
      <template #default>
        <!-- Right Image with floating icons -->
        <div class="relative w-full mx-auto lg:max-w-none mt-8">
          <!-- Top left trolley -->
          <div
            class="absolute z-10 float1 top-[6%] left-[16%] md:top-[8%] md:left-[24%] lg:top-[3%] lg:left-[18%] xl:top-[2%] xl:left-[28%]"
          >
            <NuxtImg
              src="/images/floating/floating1.png"
              alt="tag1"
              class="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md"
            />
          </div>

          <!-- Top right mug -->
          <div
            class="absolute z-10 float2 top-[2%] right-[14%] md:top-[9%] md:right-[21%] lg:top-[1%] lg:right-[12%] xl:right-[20%] xl:top-[2%]"
          >
            <NuxtImg
              src="/images/floating/bottle.png"
              alt="tag2"
              class="w-18 h-18 md:w-22 md:h-22 object-contain drop-shadow-md"
            />
          </div>

          <!-- Top middle cookie -->
          <div
            class="absolute z-10 float3 -top-8 left-[48%] md:-top-12 md:left-[50%] lg:-top-10 lg:left-[50%]"
          >
            <NuxtImg
              src="/images/floating/floating2.png"
              alt="tag2"
              class="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-md"
            />
          </div>

          <!-- Bottom right bottle -->
          <div
            class="absolute z-10 float4 top-[28%] right-[12%] md:top-[36%] md:right-[23%] lg:top-[32%] lg:right-[11%] xl:top-[32%] xl:right-[20%]"
          >
            <NuxtImg
              src="/images/floating/floating3.png"
              alt="tag3"
              class="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md"
            />
          </div>

          <!-- Bottom left headphone -->
          <div
            class="absolute z-10 float5 top-[30%] left-[12%] md:top-[34%] md:left-[22%] lg:top-[30%] lg:left-[13%] xl:top-[28%] xl:left-[21%]"
          >
            <NuxtImg
              src="/images/floating/floating4.png"
              alt="tag4"
              class="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
            />
          </div>

          <!-- Main Image -->
          <NuxtImg
            src="/images/hero_iluustration.png"
            alt="D2C Guru Hero"
            class="w-full max-w-124 aspect-square object-contain mx-auto rounded-xl relative z-0"
          />
        </div>
      </template>
    </UPageHero>
  </UContainer>
</template>
