<template>
  <main class="home page justify-end">
    <transition>
      <div
        v-if="showDialog"
        class="container m-auto p-4"
      >
        <div class="fixed top-0 left-0 right-0 bottom-0 bg-light/30 backdrop-filter backdrop-blur-sm" />
        <div class="relative bg-white rounded-lg p-4 sm:p-6 lg:p-8 xl:p-12">
          <a class="flex text-sm md:text-lg items-center text-black/40 font-bold">
            <img
              class="w-4 md:w-6 mr-4"
              src="/images/arrow-left.svg"
              width="24"
              height="12"
              alt="Arrow Left"
            >
            Back To Home
          </a>
          <h3 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl uppercase mt-9">
            Ineligible for redemption
          </h3>
          <p class="text-md md:text-lg lg:text-xl xl:text-2xl font-normal mt-2 mb-8">
            The connected wallet does not hold any Antonyms that are eligible for redemption.
            Please make sure that you are connected with a wallet that holds at least one genesis Antonym.
          </p>
          <a class="text-md md:text-lg lg:text-xl xl:text-2xl underline">Buy on OpenSea</a>
        </div>
      </div>
      <div
        v-else
        class="home__title"
      >
        Welcome to Brand3
      </div>
    </transition>
    <footer class="footer flex">
      <ul class="flex <lg:hidden">
        <li
          v-for="link in socialLinks"
          :key="link.title"
          class="home__link mr-9"
        >
          <a
            :href="link.link"
            target="_blank"
          >
            {{ link.title }}
          </a>
        </li>
      </ul>

      <router-link
        class="home__link flex items-center <sm:w-full justify-between animate-pulse ml-auto"
        :to="{ name: 'Intro' }"
      >
        Connect to Begin Redemption
        <img
          class="ml-2"
          src="/images/continue.svg"
          width="33"
          height="18"
          alt="continue"
        >
      </router-link>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const socialLinks = [
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/antonym.eth/'
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/AntonymNFT'
  },
  {
    title: 'Opensea',
    link: 'https://opensea.io/collection/antonymgenesis'
  },
  {
    title: 'Lookshare',
    link: 'https://looksrare.org/collections/0x7e3Ef31186D1BEc0D3f35aD701D065743B84C790'
  }
]

const showDialog = ref(false)
</script>

<style>
@media (min-width: 768px) {
  .home.page {
    background-size: auto 90%;
  }
}
</style>

<route>
{
  "name": "Home"
}
</route>
