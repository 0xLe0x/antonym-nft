<template>
  <div class="flex flex-wrap -mx-3">
    <router-link
      v-for="antonym in capsuleList"
      :key="antonym.capsule_number"
      class="w-full sm:w-1/2 lg:w-1/3 hoverable p-3"
      :to="{ name: 'Redeem', params: { id: antonym.capsule_trait } }"
    >
      <img
        class="w-full mb-3"
        :src="antonym.thumbnail"
        width="600"
        height="600"
        :alt="antonym.capsule_trait"
      >
      <div class="flex justify-between text-xs">
        <div class="uppercase">
          {{ antonym.capsule_trait }}<br>
          {{ antonym.capsule_number }}
        </div>
        <div v-if="false">
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
import { capsules } from '@/consts'
import { Capsule } from '@/types'

defineProps<{
  eligibleOnly: boolean
}>()

const isEligible = (capsule: Capsule) => {
  return true
}

const capsuleList = capsules
  .filter((capsule) => !capsule?.limited)
  .map((capsule) => ({
    ...capsule,
    eligible: isEligible(capsule)
  }))
</script>
