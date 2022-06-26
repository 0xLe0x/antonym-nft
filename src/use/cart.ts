import { reactive, ref } from 'vue'

const items = ref([] as any[])
const selectedTokens = ref([] as any[])

const removeItem = (item: any) => {
  if (item.capsule_trait !== 'black') {
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

const addBlackEdition = (item: any) => {
  items.value.push(item)
}

const addItem = (item: any) => {
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
