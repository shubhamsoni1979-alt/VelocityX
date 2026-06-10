<script setup></script>

<template>
  <UContainer>
    <div class="mb-10">
      <!-- CTA -->
      <UPageCTA
        title="Get Onboarded with D2C Guru Today!"
        description="List your brand, reach the right audience, and grow your D2C business."
        class="relative rounded-3xl text-center pb-28 -mb-16 z-10 overflow-hidden"
        :ui="{
          container: 'h-40 my-14',
          title: 'text-white text-3xl md:text-5xl font-semibold',
          description: 'text-gray-300 mt-4 max-w-xl mx-auto',
          links: 'mt-8 flex justify-center gap-4'
        }"
      >
        <template #links>
          <UButton
            label="Get in touch"
            color="white"
            class="rounded-full px-6 py-2 bg-white dark:text-black hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90"
            to="/onboard-detail-form"
          />
        </template>

        <!-- Gradient Background -->
        <template #default>
          <div
            class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.25)_0%,rgba(0,0,0,0.9)_60%,#000_100%)]"
          ></div>
        </template>
      </UPageCTA>
    </div>
  </UContainer>
</template>
