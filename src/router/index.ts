import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

generatedRoutes.push({
  path: '/:pathMatch(.*)*',
  redirect: { name: 'Home' }
})

export const routes = setupLayouts(generatedRoutes)
