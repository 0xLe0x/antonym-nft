<template>
  <transition>
    <div
      v-if="modelValue"
      class="fixed fixed-stretch backdrop-filter backdrop-blur-sm bg-lightgrey/50 z-100 overflow-y-auto md:py-24 md:px-8"
      @click="$emit('update:modelValue', false)"
    >
      <div
        class="max-w-full <md:min-h-screen bg-white p-8 sm:rounded-lg w-full md:w-3xl lg:w-4xl xl:w-5xl 2xl:w-7xl z-120 mx-auto"
        @click.stop
      >
        <a
          class="inline-flex items-center opacity-40 mr-auto cursor-pointer"
          @click="$emit('update:modelValue', false)"
        >
          <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
          Keep Browsing
        </a>

        <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold uppercase mt-9">
          Redemption confirmation:<br class="sm:hidden"> {{ capsule.capsule_trait }}
        </h2>
        <p class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mt-2">
          To complete the redemption process and proceed to check-out,
          please select the Antonyms that you would like to use for this transaction.
          This action is not reversible.
        </p>

        <hr class="my-2 sm:my-4 lg:my-6 2xl:my-8">

        <p class="text-xs font-bold uppercase">
          <span class="text-sm">
            Capsule: {{ capsule.capsule_trait }}
          </span><br>
          {{ selectedItems.length }} / {{ itemsLimit }} Selected
        </p>
        <div class="flex flex-wrap mt-4 -mx-2">
          <div
            v-for="token in userRedeemableTokens"
            :key="token._id"
            class="relative w-full md:w-1/5 cursor-pointer p-2"
            @click="toggleSelect(token)"
          >
            <img
              class="aspect-square"
              :src="token.image"
            >
            <div class="absolute top-4 left-4 text-white text-xs sm:text-lg md:text-xs lg:text-sm 2xl:text-lg">
              <span class="text-xs">
                #{{ token.tokenID }}
              </span><br>
              <span class="uppercase">
                {{ getCapsuleTrait(token) }}
              </span>
            </div>
            <div
              v-if="isSelected(token)"
              class="absolute -top-1 -right-1 flex flex-center border-2 border-black w-8 h-8 rounded-full"
              :class="{
                'bg-white': getCapsuleTrait(token) === capsule.capsule_trait,
                'bg-black text-white': getCapsuleTrait(token) !== capsule.capsule_trait
              }"
            >
              <i class="text-2xl mdi mdi-check" />
            </div>
          </div>
        </div>

        <button
          class="sticky bottom-4 md:-bottom-16 toggle-button toggle-button--active <md:w-full text-xl rounded-full px-4 py-2 mt-2 ml-auto"
          :disabled="!canRedeem"
          @click="redeem"
        >
          Confirm
          <i class="mdi mdi-arrow-right ml-2" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import cart from '@/use/cart'
import wallet, { Token } from '@/use/wallet'
import { getCapsuleTrait, isRedeemable } from '@/utils/capsule'
import { ItemsPerSizeMap } from '@/consts'
import { Capsule } from '@/types'

const emit = defineEmits<{
  (event: 'redeem', value: Token[]): void
  (event: 'update:modelValue', value: boolean): void
}>()
const props = defineProps<{
  size: string,
  capsule: Capsule,
  modelValue: boolean
}>()

const itemsLimit = computed(() => ItemsPerSizeMap[props.size])
const selectedItems = ref([] as Token[])

const hasOneTrait = computed(() => selectedItems.value.map(
  ({ attributes }) => attributes
    .filter(({ trait_type }) => trait_type === 'Capsule' || trait_type === 'Skin Name')
    .some(({ value }) => value === props.capsule.capsule_trait || value === '1/1')
))

const canRedeem = computed(() => {
  if (!hasOneTrait.value) { return false }
  if (selectedItems.value.length < itemsLimit.value) { return false }
  return true
})

const matchTrait = (token: Token, trait: string) => token.attributes.some(
  (attr) => attr.trait_type === 'Capsule' && attr.value === trait
)

const userRedeemableTokens = computed(() => {
  const result = []
  const matchingTokens = []

  for (const token of wallet.tokens) {
    if (!isRedeemable(token)) { continue }

    if (matchTrait(token, props.capsule.capsule_trait)) {
      matchingTokens.push(token)
    } else {
      result.push(token)
    }
  }
  result.unshift(...matchingTokens)

  return result
})

const toggleSelect = (token: Token) => {
  if (selectedItems.value.includes(token)) {
    selectedItems.value = selectedItems.value.filter((t) => t !== token)
  } else if (selectedItems.value.length < itemsLimit.value) {
    selectedItems.value.push(token)
  }
}

const isSelected = (token: Token) => {
  return selectedItems.value.includes(token)
}

const prepareModal = () => {
  for (const token of wallet.tokens) {
    if (!isRedeemable(token)) continue

    if (matchTrait(token, props.capsule.capsule_trait)) {
      selectedItems.value = [token]
      return
    }
  }
}

const redeem = () => {
  emit('redeem', [...selectedItems.value])
}

watch(() => props.modelValue, (value) => {
  if (value) {
    const root = document.getElementsByTagName('html')[0]
    root.classList.add('html--use-modal')

    prepareModal()
  } else {
    const root = document.getElementsByTagName('html')[0]
    root.classList.remove('html--use-modal')
  }
})
</script>
