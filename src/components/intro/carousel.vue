<template>
  <div class="max-w-15xl flex flex-col items-stretch flex-grow w-full mx-auto pt-16">
    <div class="overflow-hidden my-auto">
      <div
        class="flex items-stretch transform duration-300 max-h-full"
        :class="[
          `w-[${intro.length * 100}%]`,
          `-translate(${20 * (step - 1)}%)`,
          `-translate-x-${(step - 1)}/${intro.length}`
        ]"
      >
        <div
          v-for="slide in intro"
          :key="slide"
          class="flex flex-col items-center md:flex-row-reverse"
          :class="`w-1/${intro.length}`"
        >
          <div class="w-full font-bold <sm:leading-loose text-3xl sm:text-2xl md:text-[34px] lg:text-[42px] xl:text-6xl p-4 md:p-8">
            <span
              v-for="p in slide.split('\n')"
              :key="p"
            >
              {{ p }}
              <br class="<sm:hidden">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-end justify-between mb-8">
      <span>
        {{ step }}/{{ intro.length }}
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
        :class="`w-${step}/${intro.length}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { intro } from '@/consts'

const router = useRouter()

const step = ref(1)
const lastPage = computed(() => step.value === intro.length)
const gotoNextPage = () => {
  if (step.value >= intro.length) {
    router.push({ name: 'Catalogue' })
  } else {
    step.value++
  }
}
</script>
