<template>
  <header class="header">
    <span class="font-tenebras text-2xl md:text-3xl xl:text-5xl uppercase  mt-2 xl:mt-4 xl:mb-2 mr-auto">
      Antonym
    </span>
    <main-connect />
  </header>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { mock } from '@/consts'

const { y } = useScroll(document)
</script>
