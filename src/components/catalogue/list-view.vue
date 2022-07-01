<template>
  <div class="flex flex-wrap -mx-3">
    <router-link
      v-for="capsule in capsuleList"
      :key="capsule.capsule_number"
      class="w-full sm:w-1/2 lg:w-1/3 hoverable p-3"
      :to="{ name: 'Redeem', params: { id: capsule.capsule_trait } }"
    >
      <img
        class="w-full mb-3"
        :src="capsule.image"
        width="600"
        height="600"
        :alt="capsule.capsule_trait"
      >
      <div class="flex justify-between text-xs">
        <div class="uppercase">
          <span class="mb-1">
            {{ capsule.capsule_trait }}
          </span><br>
          {{ capsule.capsule_number }}
        </div>
        <div v-if="capsule.eligible">
          REDEEM ↗
        </div>
        <div
          v-else
          class="text-black/30"
        >
          INELIGIBLE
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { capsules } from '@/consts'
import wallet from '@/use/wallet'
import { Capsule } from '@/types'
import cart from '@/use/cart'

const props = defineProps<{
  eligibleOnly: boolean
}>()

const isEligible = (capsule: Capsule) => {
  return wallet.capsuleTypes[capsule.capsule_trait] ||
    wallet.tokens.some(token => token.attributes.some(
      attr => attr.value === '1/1' && !token.redeemed))
}

const capsuleList = computed(() => capsules
  .map((capsule) => ({
    ...capsule,
    eligible: isEligible(capsule)
  }))
  .filter((capsule) => !capsule?.limited)
  .filter(({ capsule_trait, eligible }) => {
    if (!props.eligibleOnly) { return true }

    return eligible && !cart.items
      .some(({ trait_type }) => trait_type === capsule_trait)
  })
)
</script>
