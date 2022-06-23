<template>
  <div>
    <div
      class="text-base uppercase mb-2"
      :class="{ 'text-error': invalid }"
    >
      {{ title }}
    </div>
    <select
      v-if="options"
      v-model="value"
      class="w-full bg-lightgrey outline-none px-2 py-3 border border-lightgrey <lg:text-xs"
      :class="{ 'border-error': invalid }"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <input
      v-else
      v-model="value"
      class="w-full bg-lightgrey outline-none px-2 py-3 border border-lightgrey <lg:text-xs"
      :class="{ 'border-error': invalid }"
      type="text"
      :data-mask="mask"
    >
    <div class="text-xs text-error py-1">
      <span v-if="invalid">
        {{ invalid }}
      </span>
      &nbsp;
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
const props = defineProps<{
  modelValue: string
  title: string,
  invalid?: boolean | string,
  mask?: string,
  options?: { label: string, value: string }[]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
