import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: {
    prefix: 'cls'
  },
  theme: {
    extend: {
      backgroundImage: {
        home: 'url(/images/home-bg.jpg)',
        'home-mobile': 'url(/images/home-bg-mobile.jpg)',
      },
      colors: {
        primary: '#EF03E7',
        secondary: '#35126A',
        dark: '#0E0E0E',
        darkgrey: '#232323',
        light: '#D9D9D9'
      },
      fontFamily: {
        tenebras: ['tenebras']
      }
    }
  },
  shortcuts: {
    // Common
    'header': 'fixed top-0 left-0 w-full flex items-center px-4 py-6 lg:px-8 lg:py-10 2xl:px-16 2xl:py-16 z-50',
    'footer': 'relative px-4 py-6 lg:px-8 lg:py-8 2xl:px-16 2xl:py-10 z-20',
    'page': 'pt-16 lg:pt-20 2xl:pt-40',
    'button-connect': 'bg-dark text-white text-xs sm:text-sm md:text-md lg:text-lg 2xl:text-2xl uppercase px-8 py-2 md:px-10 md:py-3 2xl:px-12 2xl:py-4 rounded-full',
    'button-connect--small': 'border border-darkgrey px-3 py-2 text-xs rounded-full uppercase',
    'order-count': 'flex items-center justify-center w-8 h-8 bg-darkgrey text-white font-bold text-md rounded-full',

    // Home Page
    'home': 'relative flex-grow flex flex-col items-stretch bg-home <md:bg-home-mobile bg-white bg-bottom bg-no-repeat <md:bg-center <md:bg-cover',
    'home__title': 'my-auto mix-blend-exclusion text-white font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center uppercase',
    'home__link': 'text-sm md:text-md lg:text-lg 2xl:text-2xl uppercase'
  }
})
