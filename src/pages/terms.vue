<template>
  <legal-contents :contents="TermsOfUse" />
</template>

<script setup lang="ts">
import { TermsOfUse } from '@/consts'
</script>

<route>
{
  "name": "TermsOfUse",
  "meta": {
    "title": "Terms of Use",
    "layout": "legal"
  }
}
</route>
