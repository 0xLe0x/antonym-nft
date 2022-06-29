import { reactive, ref, watch } from 'vue'
import { Token } from './wallet'

export type CartItem = {
  size: string,
  trait_type: string,
  image: string,
  selectedTokens: Token[]
}

const items = ref([] as CartItem[])
const selectedTokens = ref([] as any[])

const removeItem = (item: CartItem) => {
  if (item.trait_type !== 'black') {
    items.value = items.value.filter((ele) => ele !== item)

    selectedTokens.value = selectedTokens.value.filter(
      (token: any) => item.selectedTokens.some(
        (removed: any) => removed.tokenID !== token.tokenID
      )
    )
  } else {
    items.value = items.value.filter((ele) => ele !== item)
  }
}

const clear = () => {
  selectedTokens.value = []
  items.value = []
}

const addBlackEdition = (item: CartItem) => {
  items.value.push(item)
}

const addItem = (item: CartItem) => {
  if (!selectedTokens.value.some((selected) => item.selectedTokens.includes(selected))) {
    items.value.push(item)
    selectedTokens.value.push(...item.selectedTokens)
  }
}

const loadLastCart = () => {
  if (typeof localStorage === 'undefined') { return }

  const cartInfoStr = localStorage.getItem('cart')

  if (!cartInfoStr) { return }

  const cartInfo = JSON.parse(cartInfoStr)

  items.value = cartInfo.items
  selectedTokens.value = cartInfo.selectedTokens
}
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify({
    items: items.value,
    selectedTokens: selectedTokens.value
  }))
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
