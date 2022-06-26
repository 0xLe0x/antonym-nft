<template>
  <button
    v-if="isHome"
    class="button-connect"
    @click="toggleWallet"
  >
    {{ account.accountCompact }}
  </button>
  <template v-else>
    <button
      class="button-connect--small"
      @click="toggleWallet"
    >
      {{ account.activeAccount ? 'Disconnect' : 'Connect' }}
    </button>
    <div class="order-count ml-8">
      {{ cart.items.length }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import cart from '@/use/cart'
import account, { useAccount } from '@/use/account'

const route = useRoute()
const { toggleWallet } = useAccount()

const isHome = computed(() => route.name === 'Home')

onMounted(() => {
  nextTick(() => {
    account.connect()
  })
})
</script>
