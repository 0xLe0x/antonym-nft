<template>
  <legal-contents :contents="PrivacyPolicy" />
</template>

<script setup lang="ts">
import { PrivacyPolicy } from '@/consts'
</script>

<route>
{
  "name": "PrivacyPolicy",
  "meta": {
    "title": "Privacy Policy",
    "layout": "legal"
  }
}
</route>
