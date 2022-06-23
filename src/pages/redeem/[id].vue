<template>
  <main
    class="redeem page py-24 sm:py-28 md:py-32 xl:py-48"
    :class="{ 'theme--dark': route.params.id === 'black' }"
  >
    <div class="container mx-auto">
      <router-link
        class="inline-flex items-center opacity-40 mr-auto"
        :to="{ name: 'Catalogue' }"
      >
        <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
        Keep Browsing
      </router-link>
      <div class="flex flex-col md:flex-row md:items-start">
        <img
          class="w-4/5 md:w-80 lg:w-100 xl:w-140 2xl:w-200 <md:mx-auto md:mr-8 <md:mt-6 object-cover flex-grow-0 flex-shrink-0"
          :src="antonym?.image"
          width="800"
          height="800"
          :alt="antonym?.capsuleTrait"
        >
        <div>
          <h1 class="text-2xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl uppercase">
            {{ antonym?.name }}
          </h1>
          <div class="text-xs uppercase opacity-60">
            /{{ antonym?.capsuleTrait }}
          </div>
          <p
            v-if="antonym?.limited"
            class="mt-5"
          >
            {{ antonym.name }} is a limited edition run 12” and 24” only accesible to holders of 4+ and 20+ Antonym NFTs.
            Holders of 4+ NFTs can claim a complimentary {{ antonym.name }} 12”.
            20+ holders can claim a complimentary {{ antonym.name }} 24”.
          </p>
          <p
            v-else
            class="mt-5"
          >
            First-edition Antonym physical art toy.
            <span class="uppercase">“{{ antonym?.capsuleTrait }}”</span> is the final
            capsule in a series of 30 Antonym physical editions, available for
            redemption to select holders of our genesis collection.
            <span class="uppercase">“{{ antonym?.capsuleTrait }}”</span> features a
            {{ antonym?.type }} finish.
          </p>

          <div class="mt-12">
            <v-tippy>
              <i class="mdi mdi-help-circle-outline" />

              <template #content>
                <div class="bg-black/90 text-white p-4 rounded-md">
                  <i class="mdi mdi-help-circle-outline" /> Size Prerequisites

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
              v-for="size in (antonym?.limited ? [12, 24] : [12, 24, 60])"
              :key="size"
              class="toggle-button md:text-base mr-4 py-2 px-5 lg:px-8"
              :class="{ 'toggle-button--active': size === selectedSize }"
              @click="selectedSize = size"
            >
              {{ size }}"
            </button>
            <button class="toggle-button toggle-button--active md:text-base py-2 px-8 lg:w-50 <sm:py-7 <sm:w-full <sm:mt-2 <sm:rounded-lg">
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
            <p v-if="antonym?.limited">
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
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { antonyms } from '@/consts'

const route = useRoute()
const router = useRouter()

const antonym = computed(() => antonyms.find(
  ({ capsuleTrait }) => capsuleTrait === route.params.id
))

const selectedSize = ref(12)

onMounted(() => {
  if (!antonym.value) {
    router.push({ name: 'Catalogue' })
  }
})
</script>

<route>
{
  "name": "Redeem"
}
</route>
