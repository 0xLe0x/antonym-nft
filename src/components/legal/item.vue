<template>
  <article>
    <h2 class="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl mb-8">
      {{ title }}
    </h2>
    <p
      v-for="(paragraph, pIdx) in paragraphs"
      :key="pIdx"
      class="font-light text-sm md:text-md 2xl:text-base mb-2"
    >
      {{ paragraph }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string,
  text: string
}>()

const paragraphs = computed(() => props.text.split('\r\n'))
</script>
