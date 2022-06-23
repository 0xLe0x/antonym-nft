<template>
  <footer class="flex flex-col md:flex-row items-center justify-between py-8 md:py-12 xl:py-20">
    <div class="md:max-w-xl lg:max-w-2xl">
      <h4 class="text-4xl font-tenebras uppercase">
        Antonym
      </h4>
      <ul class="flex font-light text-xs uppercase mt-6">
        <li class="mr-2 sm:mr-5">
          <router-link
            class="hover:underline"
            :to="{ name: 'TermsOfUse' }"
          >
            Terms of Use
          </router-link>
        </li>
        <li class="mr-2 sm:mr-5">
          <router-link
            class="hover:underline"
            :to="{ name: 'PrivacyPolicy' }"
          >
            Privacy Policy
          </router-link>
        </li>
        <li class="mr-2 sm:mr-5">
          <a class="hover:underline">
            <span class="lg:hidden">
              FAQ
            </span>
            <span class="<lg:hidden">
              Frequently Asked Questions
            </span>
          </a>
        </li>
        <li class="mr-2 sm:mr-5">
          <a class="hover:underline">
            Contact us
          </a>
        </li>
      </ul>
      <p class="text-xs mt-4">
        All contents of this website are the property of ANTONYM.
        No part of this site, including all text and images, may be reproduced in any form
        without the prior written consent of ANTONYM.
        <br><br>
        Copyright © 2022. All Rights Reserved.<br>
        Antonym LLC.
      </p>
    </div>
    <a
      class="scroll-up <md:mt-8"
      @click="scrollTop"
    >
      <img
        class="w-6 md:w-9"
        src="/images/arrow-up.svg"
        width="36"
        height="45"
        alt="Arrow Up"
      >
    </a>
  </footer>
</template>

<script setup lang="ts">
const scrollTop = () => window.scroll(0, 0)
</script>
