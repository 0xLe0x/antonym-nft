<template>
  <div>
    <div
      v-if="cart.items.length"
    >
      <cart-item
        v-for="item in cart.items"
        :key="item.trait_type"
        class="mb-4 sm:mb-6 lg:mb-8 2xl:mb-10"
        :item="item"
        @remove="cart.removeItem(item)"
      />
    </div>
    <cart-item
      v-if="enoughBalanceForBlack && !isBlackInCart && !wallet.blackRedeemed"
      black-promo
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import cart from '@/use/cart'
import wallet from '@/use/wallet'

const isBlackInCart = computed(() => cart.items.some(({ trait_type }) => trait_type === 'black'))
const enoughBalanceForBlack = computed(() => wallet.balance && wallet.balance > 3)
</script>
