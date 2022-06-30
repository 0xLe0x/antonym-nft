<template>
  <router-view />
</template>

<style>
html{
  overflow: hidden auto;
  scroll-behavior: smooth;
}
.html--use-modal {
  overflow-y: hidden;
}

body {
  color: #232323;
  font-weight: 500;
  font-family: 'Helvetica Now Display';
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
