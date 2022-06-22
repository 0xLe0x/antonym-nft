<template>
  <header
    class="header backdrop-filter duration-300"
    :class="{
      'backdrop-blur-lg py-4': y,
      'bg-white/50': y
    }"
  >
    <router-link
      class="font-tenebras text-2xl md:text-3xl xl:text-5xl uppercase  mt-2 xl:mt-4 xl:mb-2 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      Antonym
    </router-link>
    <main-connect />
  </header>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const { y } = useScroll(document)
</script>
