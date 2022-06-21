<template>
  <div class="container flex flex-col items-stretch flex-grow w-full mx-auto pt-16">
    <div class="overflow-hidden my-auto">
      <div
        class="flex items-stretch transform duration-300 max-h-full"
        :class="[
          `w-[${info.length * 100}%] -translate(${20 * (step - 1)}%)`,
          `-translate-x-${(step - 1)}/${info.length}`
        ]"
      >
        <div
          v-for="(slide, slideIdx) in info"
          :key="slideIdx"
          class="flex flex-col items-center md:flex-row-reverse"
          :class="`w-1/${info.length}`"
        >
          <div class="md:w-3/5 font-bold md:text-3xl lg:text-4xl xl:text-5xl p-4 md:p-8">
            {{ slide.description }}
          </div>
          <div class="flex items-center justify-center w-88 h-120 <md:max-w-full <md:max-h-[50vh] md:w-2/5 p-4 md:p-8 max-h-full">
            <img
              class="w-full h-full"
              :src="slide.image"
              alt="Image"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-end justify-between mb-8">
      <span>
        {{ step }}/{{ info.length }}
      </span>

      <div
        class="flex items-center justify-center w-16 h-16 lg:w-24 lg:h-24 bg-black text-white rounded-full cursor-pointer duration-300"
        @click="gotoNextPage"
      >
        <i class="text-4xl mdi mdi-arrow-right" />
      </div>
    </div>
    <div class="bg-black/30 h-1 w-full">
      <div
        class="bg-black h-1 duration-300"
        :class="`w-${step}/${info.length}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { info } from '@/consts'

const step = ref(1)
const lastPage = computed(() => step.value === info.length)
const gotoNextPage = () => {
  if (step.value >= info.length) {
    // Move to another page
  } else {
    step.value++
  }
}
</script>
