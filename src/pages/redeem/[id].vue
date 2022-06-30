<template>
  <main
    class="page py-24 sm:py-28 md:py-32 xl:py-48"
    :class="{ 'theme--dark': route.params.id === 'black' }"
  >
    <router-link
      class="inline-flex items-center opacity-40 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
      Keep Browsing
    </router-link>

    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row md:items-start">
        <img
          class="w-4/5 md:w-80 lg:w-100 xl:w-140 2xl:w-200 <md:mx-auto md:mr-8 <md:mt-6 object-cover flex-grow-0 flex-shrink-0"
          :src="capsule?.image"
          width="800"
          height="800"
          :alt="capsule?.capsule_trait"
        >
        <div>
          <h1 class="text-2xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl uppercase">
            {{ capsule?.name }}
          </h1>
          <div class="text-xs uppercase opacity-60">
            /{{ capsule?.capsule_trait }}
          </div>
          <p
            v-if="capsule?.limited"
            class="mt-5"
          >
            {{ capsule.name }} is a limited edition run 12” and 24” only accesible to holders of 4+ and 20+ Antonym NFTs.
            Holders of 4+ NFTs can claim a complimentary {{ capsule.name }} 12”.
            20+ holders can claim a complimentary {{ capsule.name }} 24”.
          </p>
          <p
            v-else
            class="mt-5"
          >
            First-edition Antonym physical art toy.
            <span class="uppercase">“{{ capsule?.capsule_trait }}”</span> is the final
            capsule in a series of 30 Antonym physical editions, available for
            redemption to select holders of our genesis collection.
            <span class="uppercase">“{{ capsule?.capsule_trait }}”</span> features a
            {{ capsule?.type }} finish.
          </p>

          <div class="mt-12">
            <v-tippy max-width="540">
              <i class="mdi mdi-help-circle-outline" />

              <template #content>
                <div class="bg-black/90 text-white p-4 rounded-md">
                  <div class="flex items-center">
                    <i class="mdi mdi-help-circle-outline" />
                    <span class="text-xs ml-2">Size Prerequisites</span>
                  </div>

                  <p class="text-sm mt-2">
                    The size options available for selection are dependent on eligibility
                    criteria. <br><br>
                    24” editions require 4 Antonyms. 60” editions require 20 Antonyms.<br>
                    All editions require 1 unredeemed Antonym from their respective
                    capsule.
                  </p>
                </div>
              </template>
            </v-tippy> Size
          </div>
          <div class="flex flex-wrap items-center mt-2">
            <button
              v-for="size in (capsule?.limited ? ['12', '24'] : ['12', '24', '60'])"
              :key="size"
              class="toggle-button md:text-base mr-4 py-2 px-5 lg:px-8"
              :class="{ 'toggle-button--active': size === options.size }"
              :disabled="!hasMinItmes(size)"
              @click="selectSize(size)"
            >
              {{ size }}"
            </button>
            <button
              class="toggle-button toggle-button--active md:text-base py-2 px-8 lg:w-50 <sm:py-7 <sm:w-full <sm:mt-2 <sm:rounded-lg"
              :disabled="!isBlackEnligible && !isEligible"
              @click="redeem"
            >
              REDEEM
            </button>
          </div>
          <div class="mt-12">
            <div class="text-xs opacity-60">
              Components
            </div>
            <hr class="mt-2 mb-3">
            <p>
              2 removable + magnetic heads<br>
              2 removable + magnetic arms<br>
              1 body
            </p>
          </div>
          <div class="mt-12">
            <div class="text-xs opacity-60">
              Materials
            </div>
            <hr class="mt-2 mb-3">
            <p v-if="capsule?.limited">
              Vinyl (12”, 24”)<br><br>
              Base Color: Black<br>
              Finish: Matte Ruberized<br>
              Connectors: Gunmetal
            </p>
            <p v-else>
              PVC / Vinyl (12”, 24”)<br>
              Resin (60”)<br>
              Gunmetal
            </p>
          </div>
        </div>
      </div>
    </div>

    <catalogue-nft-modal
      v-if="capsule && !capsule.limited && isEligible"
      v-model="options.showNFTModal"
      :capsule="capsule"
      :size="options.size"
      @redeem="continueOrder"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capsules, BlackItemsPerSizeMap, ItemsPerSizeMap } from '@/consts'
import account from '@/use/account'
import wallet, { Token } from '@/use/wallet'
import cart from '@/use/cart'

const route = useRoute()
const router = useRouter()

const capsule = computed(() => capsules.find(
  ({ capsule_trait }) => capsule_trait === route.params.id
))

const options = reactive({
  size: '12',
  showNFTModal: false
})

const isBlackEnligible = computed(() => {
  return capsule.value?.capsule_trait === 'black' &&
    (account.activeAccount && wallet.balance && wallet.balance >= 4) &&
    !cart.items.some(({ trait_type }) => trait_type === 'black') &&
    !wallet.blackRedeemed
})

const hasMinItmes = (size: string) => {
  const sizeMap = capsule.value?.limited ? BlackItemsPerSizeMap : ItemsPerSizeMap

  return wallet.balance && wallet.balance >= sizeMap[size]
}

const selectSize = (size: string) => {
  if (hasMinItmes(size)) {
    options.size = size
  }
}

const isEligible = computed(() => {
  // If Antonym black, then it's not the case
  if (capsule.value?.limited) {
    return false
  }

  // If not...
  return wallet.capsuleTypes[capsule.value?.capsule_trait || ''] ||
    wallet.tokens.some((token) => token.attributes.some(
      (attr) => attr.value === '1/1' && !token.redeemed)
    )
})

const continueOrder = (selectedTokens: Token[]) => {
  const item = {
    size: options.size,
    trait_type: capsule.value?.capsule_trait || '',
    image: capsule.value?.image || '',
    selectedTokens
  }

  if (capsule.value?.limited) {
    cart.addBlackEdition({
      size: options.size,
      trait_type: capsule.value.capsule_trait,
      image: capsule.value.image,
      selectedTokens: []
    })
  } else {
    cart.addItem(item)

    options.showNFTModal = false
    setTimeout(() => {
      router.push({ name: 'Cart' })
    }, 1000)
  }
}

const redeem = () => {
  if (capsule.value?.capsule_trait === 'black') {
    continueOrder([])
    setTimeout(() => {
      router.push({ name: 'Cart' })
    }, 1000)
  }

  if (!isEligible.value) { return }

  options.showNFTModal = true
}

onMounted(() => {
  if (!capsule.value) {
    router.push({ name: 'Catalogue' })
  }
})
</script>

<route>
{
  "name": "Redeem"
}
</route>
