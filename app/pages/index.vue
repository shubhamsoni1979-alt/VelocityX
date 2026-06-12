<script setup lang="ts">
useSeoMeta({
    title: 'VelocityX',
    description: 'Used Car Buying/Selling Platform'
})
</script>

<template>
    <div class="home-page">
        <HomeHero />
        <home-explorepopularbrand/>
        <home-trendingcar />
        <HomePopularCategories />
        <home-bodytype/>
        <home-manageyourvehicle/>
        <home-carousel/>
    </div>
</template>
