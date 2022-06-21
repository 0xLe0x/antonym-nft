import path from 'path'

const ssrHistory = {
  state: {},
  replaceState () { },
  pushState () { },
  go () { },
  back () { }
}

const ssrLocation = {
  hash: '',
  host: '',
  hostname: '',
  href: '',
  origin: '',
  pathname: '',
  protocol: '',
  search: ''
}

const ssrIDBFactory = {
  open: () => ({
    result: {
      createObjectStore: () => ({})
    }
  })
}

const ssrNavigator = { userAgent: '' }

const ssrDocument = {
  baseURI: 'file:' + path.resolve(__dirname, '../node_modules/vite-ssg/dist'),
  body: {},
  addEventListener () {},
  removeEventListener () {},
  activeElement: {
    blur () {},
    nodeName: ''
  },
  querySelector () {
    return null
  },
  querySelectorAll () {
    return []
  },
  getElementById () {
    return null
  },
  createEvent () {
    return {
      initEvent () {}
    }
  },
  createElement () {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute () {},
      getElementsByTagName () {
        return []
      }
    }
  },
  createElementNS () {
    return {}
  },
  importNode () {
    return null
  },
  location: ssrLocation
}

const ssrWindow = {
  document: ssrDocument,
  navigator: ssrNavigator,
  location: ssrLocation,
  history: ssrHistory,
  CustomEvent: function CustomEvent () {
    return this
  },
  addEventListener () { },
  removeEventListener () { },
  getComputedStyle () {
    return {
      getPropertyValue () {
        return ''
      }
    }
  },
  Image () { },
  Date () { },
  screen: {},
  setTimeout () { },
  clearTimeout () { },
  matchMedia () {
    return {}
  },
  requestAnimationFrame (callback) {
    if (typeof setTimeout === 'undefined') {
      callback()
      return null
    }
    return setTimeout(callback, 0)
  },
  cancelAnimationFrame (id) {
    if (typeof setTimeout === 'undefined') {
      return
    }
    clearTimeout(id)
  }
}

if (typeof window === 'undefined') {
  global.window = ssrWindow as any
  global.document = ssrDocument as any
  global.navigator = ssrNavigator as any
  global.indexedDB = ssrIDBFactory as any
  global.location = ssrLocation as any
  global.history = ssrHistory as any
}
