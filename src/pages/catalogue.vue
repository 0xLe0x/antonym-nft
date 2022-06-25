<template>
  <main class="catalogue page pt-24 sm:pt-28 md:pt-32 xl:pt-48">
    <div class="container mx-auto">
      <div class="font-bold uppercase">
        Season1
      </div>
      <div class="flex mx-auto mb-4 sm:mb-6 md:mb-12 lg:mb-18 xl:mb-24">
        <h1 class="text--4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase">
          Catalogue
        </h1>
        <p class="catalogue__description">
          Capsules eligible for redemption are marked with the A symbol.
          To redeem a physical, select your desired capsule.
          All available capsules are listed below.
        </p>
      </div>

      <div class="flex items-center justify-between max-w-sm md:max-w-md mb-6">
        <div class="flex items-center">
          <button
            class="toggle-button px-3 md:w-30 h-6 rounded-r-none"
            :class="{ 'toggle-button--active': options.wallet }"
            @click="options.wallet = true"
          >
            View Wallet
          </button>
          <button
            class="toggle-button px-3 md:w-30 h-6 rounded-l-none"
            :class="{ 'toggle-button--active': !options.wallet }"
            @click="options.wallet = false"
          >
            View Catalogue
          </button>
        </div>
        <label
          class="<md:toggle-button px-3 md:w-30 h-6 flex items-center"
          :class="{ '<md:toggle-button--active': options.eligibleOnly }"
          for="eligible-only"
        >
          <input
            id="eligible-only"
            v-model="options.eligibleOnly"
            class="checkbox <md:hidden"
            type="checkbox"
          >
          <span class="ml-1 text-xs md:text-black/50">
            Eligible Only
          </span>
        </label>
      </div>

      <div class="flex flex-wrap -mx-3">
        <router-link
          v-for="antonym in antonymCatalogue"
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

      <div class="flex flex-col lg:flex-row justify-between bg-darkgrey mt-12 md:mt-20 md:mx-4">
        <div class="flex flex-col flex-grow text-white p-8 pb-0 md:px-12 lg:pl-20 lg:pr-0 lg:py-12 xl:py-16">
          <h2 class="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4">
            Antonym: Black
          </h2>
          <p class="font-light md:text-xl xl:text-2xl 2xl:text-3xl">
            Holders with 4 or more Antonyms are eligible to redeem a limited-edition 24” Antonym: Black.
            We appreciate your early support.
          </p>
          <a class="font-light md:text-xl xl:text-2xl 2xl:text-3xl underline mt-18 xl:mt-auto">
            Learn More
          </a>
        </div>
        <img
          class="w-80 md:w-100 lg:w-120 xl:w-160 2xl:w-200 <lg:ml-auto sm:-mt-16 lg:-mt-24 object-contain object-bottom"
          src="/images/catalogue/black-small.png"
          width="800"
          alt="Antonym Black"
        >
      </div>

      <main-footer class="mt-20 md:mt-auto" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { antonyms } from '@/consts'

const options = reactive({
  wallet: false,
  eligibleOnly: false
})

const antonymCatalogue = antonyms.filter((antonym) => !antonym?.limited)
</script>

<route>
{
  "name": "Catalogue"
}
</route>
