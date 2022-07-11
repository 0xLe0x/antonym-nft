<template>
  <header
    class="header duration-300"
    :class="{
      'py-4': y,
      'bg-white': y && !isBlack,
      'bg-darkgrey': y && isBlack,
      'theme--dark': isBlack
    }"
  >
    <router-link
      class="font-tenebras text-2xl md:text-3xl xl:text-5xl uppercase  mt-2 xl:mt-4 xl:mb-2 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      Antonym
    </router-link>
    <main-connect-modal />
    <main-connect />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const { y } = useScroll(document)
const isBlack = computed(() => route.name === 'Redeem' && route.params.id === 'black')
</script>
