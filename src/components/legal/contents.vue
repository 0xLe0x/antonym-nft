<template>
  <legal-item
    v-for="content in contents"
    :key="content.title"
    class="mb-8"
    :title="content.title"
    :text="content.text"
  />
</template>

<script setup lang="ts">
defineProps<{
  contents: { title: string, text: string }[]
}>()
</script>
