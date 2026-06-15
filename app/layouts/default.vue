<script setup lang="ts">
import AppFoooter from '~/components/App-Foooter.vue';
import AppHeader from '~/components/App-Header.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFoooter />
  </div>
</template>
