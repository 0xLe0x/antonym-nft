<template>
  <main-header />
  <main class="page pt-24 sm:pt-28 md:pt-32 xl:pt-48">
    <router-link
      class="inline-flex items-center opacity-40 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
      Keep Browsing
    </router-link>
    <h1 class="page-title">
      {{ $route.meta.title }}
    </h1>

    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row">
        <div class="w-full sm:w-60 lg:w-80 2xl:w-100 sm:mr-12 lg:mr-36 2xl:mr-50 <sm:mb-12 flex-shrink-0">
          <router-link
            v-for="link in links"
            :key="link.title"
            class="legal-tab"
            active-class="legal-tab--active"
            :to="link.to"
          >
            {{ link.title }}
          </router-link>
        </div>
        <div class="flex-grow">
          <router-view />
        </div>
      </div>

      <main-footer class="w-full mt-20 md:mt-auto" />
    </div>
  </main>
</template>

<script setup lang="ts">
const links = [
  {
    title: 'Terms of Use',
    to: { name: 'TermsOfUse' }
  },
  {
    title: 'Privacy Policy',
    to: { name: 'PrivacyPolicy' }
  }
]
</script>
