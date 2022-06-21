<template>
  <button
    v-if="isHome"
    class="button-connect"
  >
    {{ mock.connected ? mock.address : 'Connect' }}
  </button>
  <template v-else>
    <button
      class="button-connect--small"
    >
      {{ mock.connected ? 'Disconnect' : 'Connect' }}
    </button>
    <div class="order-count ml-8">
      {{ mock.orderCount }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mock } from '@/consts'

const route = useRoute()
const isHome = computed(() => route.name === 'Home')
</script>
