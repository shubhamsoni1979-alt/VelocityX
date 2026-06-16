<template>
    <div class="sticky top-0 z-50 bg-white border-b border-default shadow-sm">
        <UContainer>
            <UHeader :ui="{
                container: ' sticky top-0 z-50 w-full max-w-none px-0 sm:px-0 lg:px-0'
            }">
                <!-- Logo -->
                <template #title>
                    <NuxtLink to="/">
                        <NuxtImg src="/VelocityX-light-logo.png" alt="VelocityX" class="h-10 w-auto dark:hidden" />
                        <NuxtImg src="/VelocityX-dark-logo.png" alt="VelocityX" class="h-10 w-auto hidden dark:block" />
                    </NuxtLink>
                </template>

                <!-- Center Search -->
                <template>
                    <div class="px-2 relative w-full max-w-5xl">
                        <UInput v-model="searchQuery" placeholder="Search used cars "
                            icon="i-heroicons-magnifying-glass" size="xl" class="w-full" :ui="{
                                base: 'rounded-full',
                                root: 'w-full'
                            }" @keyup.enter="applyfilters" @focus="showSuggestions = true" @blur="onBlur" />

                        <!-- Suggestions Dropdown -->
                        <div v-if="showSuggestions && filteredSuggestions.length > 0"
                            class="absolute left-2 right-2 top-full mt-2 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden py-2 max-h-72 overflow-y-auto">
                            <div v-for="suggestion in filteredSuggestions" :key="suggestion.text"
                                class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-between transition-colors group"
                                @mousedown="selectSuggestion(suggestion)">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                                        <UIcon
                                            :name="suggestion.type === 'brand' ? 'i-heroicons-tag' : 'i-heroicons-sparkles'"
                                            class="w-4 h-4" />
                                    </div>
                                    <div class="text-left">
                                        <p
                                            class="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm">
                                            {{ suggestion.text }}
                                        </p>
                                        <p class="text-[10px] text-gray-400 capitalize">
                                            {{ suggestion.category }}
                                        </p>
                                    </div>
                                </div>
                                <span class="text-xs text-gray-400 group-hover:translate-x-1 transition-transform mr-1">
                                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                                </span>
                            </div>
                        </div>
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
import { allCars } from '~/data/cars'

const route = useRoute()

const searchQuery = ref(
    typeof route.query.q === 'string'
        ? route.query.q
        : ''
)

const showSuggestions = ref(false)

const filteredSuggestions = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const uniqueBrands = Array.from(new Set(allCars.map(c => c.brand)))

    if (!query) {
        // Show default popular brands on focus
        return uniqueBrands.slice(0, 4).map(brand => ({
            text: brand,
            type: 'brand',
            category: 'Popular Brand',
            value: brand
        }))
    }

    const suggestions: Array<{ text: string, type: 'brand' | 'model', category: string, value: string }> = []

    // 1. Matching brands
    uniqueBrands.forEach(brand => {
        if (brand.toLowerCase().includes(query)) {
            suggestions.push({
                text: brand,
                type: 'brand',
                category: 'Brand',
                value: brand
            })
        }
    })

    // 2. Matching models
    allCars.forEach(car => {
        const modelLower = car.model.toLowerCase()
        const fullSearchLower = `${car.brand} ${car.model}`.toLowerCase()
        if (modelLower.includes(query) || fullSearchLower.includes(query)) {
            const exists = suggestions.some(s => s.type === 'model' && s.text === `${car.brand} ${car.model}`)
            if (!exists) {
                suggestions.push({
                    text: `${car.brand} ${car.model}`,
                    type: 'model',
                    category: car.category,
                    value: car.model
                })
            }
        }
    })

    return suggestions.slice(0, 6)
})

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
    showSuggestions.value = false
    if (searchQuery.value.trim()) {
        navigateTo(`/brands?q=${searchQuery.value}`)
    } else {
        navigateTo('/brands')
    }
}

function selectSuggestion(suggestion: any) {
    searchQuery.value = suggestion.text
    showSuggestions.value = false
    if (suggestion.type === 'brand') {
        navigateTo(`/brands?brand=${encodeURIComponent(suggestion.value)}`)
    } else {
        navigateTo(`/brands?q=${encodeURIComponent(suggestion.value)}`)
    }
}

function onBlur() {
    setTimeout(() => {
        showSuggestions.value = false
    }, 200)
}
</script>
