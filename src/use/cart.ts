import { reactive, ref } from 'vue'

type CartItem = {
  size: string,
  trait_type: string,
  image: string,
  selectedTokens: any[]
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
  if (selectedTokens.value.some(
    (selected) => selectedTokens.value.some((token: any) => token === selected)
  )) {
    items.value.push(item)
    selectedTokens.value.push(...item.selectedTokens)
  }
}

export default reactive({
  items,
  selectedTokens,

  removeItem,
  clear,
  addBlackEdition,
  addItem
})
