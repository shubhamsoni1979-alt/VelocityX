export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image'
  ],
colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  css: ['~/assets/css/main.css']
})