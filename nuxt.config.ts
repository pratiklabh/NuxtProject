import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module'
  ],

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080/ContactCRUD-final/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  },

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  css: [
    'primeflex/primeflex.css'
  ],

  compatibilityDate: '2024-10-09'
});