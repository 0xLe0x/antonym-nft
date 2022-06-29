import { defineConfig } from 'vite-plugin-windicss'
import intro from './src/consts/intro'

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
        error: '#D81515',
        dark: '#0E0E0E',
        darkgrey: '#232323',
        light: '#D9D9D9',
        lightgrey: '#F2F2F2'
      },
      fontFamily: {
        tenebras: ['tenebras']
      }
    }
  },
  safelist: [
    'theme--dark',
    `w-[${intro.length * 100}%]`,
    ...Array(intro.length).fill(null).map((_, idx) => `w-${idx + 1}/${intro.length}`),
    ...Array(intro.length).fill(null).map((_, idx) => `-translate-x-${idx}/${intro.length}`),
    'backdrop-blur-lg',
    'py-4',
    'toggle-button--disabled',
    'cursor-not-allowed',
    'border--error'
  ],
  shortcuts: {
    // Common
    'header': 'fixed top-0 left-0 w-full flex items-center px-4 py-6 lg:px-8 lg:py-10 2xl:px-12 2xl:py-12 z-50',
    'footer': 'relative z-20 mt-4 lg:mt-8 2xl:mt-10',
    'page': 'min-h-screen pt-12 lg:pt-16 2xl:pt-32 px-4 pb-6 lg:px-8 lg:pb-8 2xl:px-12 2xl:pb-10',
    'page-title': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-8 sm:mb-12 lg:mb-16 2xl:mb-20',
    'button-connect': 'bg-dark text-white text-xs sm:text-sm md:text-md lg:text-lg 2xl:text-2xl uppercase px-8 py-2 md:px-10 md:py-3 2xl:px-12 2xl:py-4 rounded-full',
    'button-connect--small': 'border border-darkgrey px-3 py-2 text-xs rounded-full uppercase',
    'order-count': 'flex items-center justify-center w-8 h-8 bg-darkgrey text-white font-bold text-md rounded-full',
    'checkbox': 'h-4 w-4 appearance-none rounded-full border border-black/50 ring-inset ring-white checked:bg-black/70 checked:ring-2',
    'toggle-button': {
      '@apply': 'flex items-center justify-center border border-black/50 text-black/50 text-xs rounded-l rounded-r',
      '&[disabled]': { '@apply': 'opacity-50 cursor-not-allowed' }
    },
    'toggle-button--active': 'bg-black text-white',
    'scroll-up': 'flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 border border-black rounded-full cursor-pointer',
    'hoverable': 'relative hover:before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-black/5 cursor-pointer',

    'theme--dark': {
      '@apply': 'bg-darkgrey text-white duration-300',
      '.button-connect': { '@apply': 'bg-white text-black' },
      '.button-connect--small': { '@apply': 'border-white' },
      '.order-count': { '@apply': 'bg-white text-black' },
      '.toggle-button': { '@apply': 'text-white/40 border-white/40' },
      '.toggle-button--active': { '@apply': 'bg-white text-black' }
    },
    'flex-center': 'items-center justify-center',
    'fixed-center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'fixed-stretch': 'top-0 left-0 right-0 bottom-0',

    // Legal Tabs
    'legal-tab': 'block border-b border-t border-black px-2 md:px-3 2xl:px-4 py-2 md:py-4 2xl:py-6',
    'legal-tab--active': 'bg-black text-white',

    // Home Page
    'home': 'relative flex flex-col items-stretch bg-home <md:bg-home-mobile bg-white bg-bottom bg-no-repeat <md:bg-center <md:bg-cover',
    'home__title': 'my-auto mix-blend-exclusion text-white font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center uppercase',
    'home__link': 'text-dark text-sm md:text-md lg:text-lg 2xl:text-2xl uppercase',

    // Catalogue Page
    'catalogue__description': '<md:hidden md:ml-20 lg:ml-40 xl:ml-60 md:mt-1 lg:mt-2 xl:mt-3 max-w-100 before:content-["‣"] before:-ml-[10px]',

    // Redeem Page
    'redeem__back': 'text-black/40',
    'redeem__trait': 'text-black/60'
  }
})
