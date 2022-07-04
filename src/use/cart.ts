import { computed, reactive, ref, watch } from 'vue'
import { Token } from './wallet'

export type CartItem = {
  size: string,
  trait_type: string,
  image: string,
  selectedTokens: Token[]
}

const items = ref([] as CartItem[])
const selectedTokens = computed(
  () => items.value.reduce(
    (acc, item) => [...acc, ...item.selectedTokens],
    [] as Token[]
  )
)

const removeItem = (item: CartItem) => {
  if (item.trait_type !== 'black') {
    items.value = items.value.filter((ele) => ele !== item)
  } else {
    items.value = items.value.filter((ele) => ele !== item)
  }
}

const clear = () => {
  items.value = []
}

const addBlackEdition = (item: CartItem) => {
  items.value.push(item)
}

const addItem = (item: CartItem) => {
  if (!selectedTokens.value.some((selected) => item.selectedTokens.includes(selected))) {
    items.value.push({ ...item })
  }
}

const loadLastCart = () => {
  if (typeof localStorage === 'undefined') { return }

  const cartInfoStr = localStorage.getItem('cart')
  if (!cartInfoStr) { return }

  let cartInfo = [] as CartItem[]
  try {
    cartInfo = JSON.parse(cartInfoStr)
  } catch (err) {
    // Error handler if failed loading cart information
  }

  items.value = (Array.isArray(cartInfo) && cartInfo) || []
}
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(items.value))
}

watch([items, selectedTokens], saveCart, { deep: true })
loadLastCart()

export default reactive({
  items,
  selectedTokens,

  removeItem,
  clear,
  addBlackEdition,
  addItem
})
