<template>
  <div
    class="relative flex bg-lightgrey overflow-hidden pt-1/3 min-h-50"
    :class="blackPromo && 'bg-darkgrey text-white'"
  >
    <img
      v-if="item"
      class="absolute top-7 sm:top-0 left-0 w-2/5 sm:w-3/5 lg:w-2/5 xl:w-3/5"
      :src="item.image"
      :alt="item.trait_type"
    >
    <img
      v-else-if="blackPromo"
      class="absolute top-7 sm:top-0 left-0 w-2/5 sm:w-3/5 lg:w-2/5 xl:w-3/5"
      src="/images/catalogue/black.png"
      width="600"
      height="600"
      alt="Black"
    >
    <div
      v-if="item"
      class="flex flex-col absolute top-0 right-0 bottom-0 w-3/5 sm:w-2/5 lg:w-3/5 xl:w-2/5 p-6"
    >
      <h3 class="text-sm sm:text-xl 2xl:text-2xl font-bold uppercase mb-2 lg:mb-3 2xl:mb-4">
        {{ item.trait_type === 'black' ? 'Antonym: Black' : item.trait_type }}
      </h3>
      <p class="text-xs text-black/40">
        {{ item.trait_type === 'black' ? 'Limited Product' : 'Designer Art Toy' }}<br>
        Size: {{ item.size }}"
      </p>

      <a
        class="text-black/40 font-bold mt-auto cursor-pointer"
        @click="$emit('remove')"
      >
        Remove
      </a>
    </div>
    <div
      v-else-if="blackPromo"
      class="flex flex-col absolute top-0 right-0 bottom-0 w-3/5 sm:w-2/5 lg:w-3/5 xl:w-2/5 p-6"
    >
      <h3 class="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-bold uppercase mb-2 lg:mb-3 2xl:mb-4">
        Antonym: Black
      </h3>
      <p class="text-[8px] sm:text-xs text-sm opacity-40">
        Limited Product
        Size: 12"
      </p>

      <div class="text-[8px] sm:text-xs text-sm uppercase my-auto w-4/5">
        You are eligible to redeem a complimentary limited-edition product
      </div>

      <router-link
        class="<sm:text-xs flex items-center opacity-40 font-bold cursor-pointer"
        :to="{
          name: 'Redeem',
          params: { id: 'black' }
        }"
      >
        Learn More
        <img
          class="ml-2 <sm:hidden"
          src="/images/continue-white.svg"
          width="22"
          height="12"
          alt="continue"
        >
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/use/cart'

defineEmits<{
  (event: 'remove'): void
}>()
defineProps<{
  item?: CartItem,
  blackPromo?: boolean
}>()
</script>
