<template>
     <div class="sticky top-0 z-50 bg-white border-b border-default shadow-sm">
    <UContainer>
        <UHeader 

  :ui="{
    container: ' sticky top-0 z-50 w-full max-w-none px-0 sm:px-0 lg:px-0'
  }"
>
            <!-- Logo -->
            <template #title>
                <NuxtLink to="/">
                    <NuxtImg src="/VelocityX-light-logo.png" alt="VelocityX" class="h-10 w-auto dark:hidden" />
                    <NuxtImg src="/VelocityX-dark-logo.png" alt="VelocityX" class="h-10 w-auto hidden dark:block" />
                </NuxtLink>
            </template>

            <!-- Center Search -->
            <template >
                <div class="px-2 space-y-4">
                    <UInput v-model="searchQuery" placeholder="Search" icon="i-heroicons-magnifying-glass" size="xl"
                        class="w-full max-w-5xl" :ui="{
                            base: 'rounded-full',
                            root: 'w-full',
                            
                        }" @keyup.enter="applyfilters" />
                </div>
            </template>

            <!-- Right Side -->
            <template #right>
                <div class="flex items-center gap-3">
                    <!-- <UColorModeButton /> -->

                    <UButton icon="i-heroicons-user" color="neutral" variant="soft" class="rounded-full">
                        Login
                    </UButton>
                </div>
            </template>

            <!-- Mobile -->
            <template #body>
                <div class="md:hidden space-y-4 border-t pt-4">


                    <UButton icon="i-heroicons-user" color="neutral" variant="soft" block>
                        Login
                    </UButton>
                </div>
            </template>
        </UHeader>
    </UContainer>
    </div>  
</template>

<script setup lang="ts">
const route = useRoute()

const searchQuery = ref(
    typeof route.query.q === 'string'
        ? route.query.q
        : ''
)

watch(
    () => route.query.q,
    (newQ) => {
        searchQuery.value =
            typeof newQ === 'string'
                ? newQ
                : ''
    }
)

function applyfilters() {
    if (searchQuery.value.trim()) {
        navigateTo(`/brands?q=${searchQuery.value}`)
    } else {
        navigateTo('/brands')
    }
}
</script>