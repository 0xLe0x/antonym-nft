import { computed, reactive, ref } from 'vue'
import account from './account'

export type Token = {
  _id: string,
  tokenID: string,
  owner: string,
  name: string,
  image: string,
  description: string,
  attributes: { trait_type: string, value: string }[],
  redeemed: boolean
}

const tokens = ref([] as Token[])
const capsuleTypes = ref({} as Record<string, boolean>)
const loadingIdx = ref(0)
const balance = ref(null as number | null)
const blackRedeemed = ref(false)
const balanceChecked = computed(() => balance.value !== null)

const tokenMap = computed(() => tokens.value
  .reduce(
    (map, token) => ({ ...map, [token.tokenID]: token }),
    {} as Record<string, Token>)
)

const addToken = (token: Token) => {
  if (!tokenMap.value[token.tokenID]) {
    tokens.value.push(token)
  }
}

const updateCapsuleTypes = (token: Token) => {
  if (Array.isArray(token.attributes) && token.attributes.length > 0) {
    for (const { trait_type, value } of token.attributes) {
      if (trait_type === 'Capsule') {
        capsuleTypes.value[value.toLowerCase()] = true
      }
    }
  }
}

const clear = () => {
  tokens.value = []
  capsuleTypes.value = {}
  loadingIdx.value = 0
  balance.value = null
}

const clearTokens = () => {
  tokens.value = []
  loadingIdx.value = 0
  balance.value = null
}

const getAccountDetails = async () => {
  const res = await fetch('/.netlify/functions/has-redeemed/', {
    method: 'POST',
    headers: { Accept: 'application/json' },

    body: JSON.stringify({ address: account.activeAccount })
  })

  const { redeemed } = await res.json()
  blackRedeemed.value = redeemed
}

const resolveNFT = async (token: { id: number, uri: string }) => {
  try {
    const res = await fetch('/.netlify/functions/proxy-layer/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        origin: 'localhost:8888'
      },
      body: JSON.stringify({
        nftURI: token.uri,
        ownerAddress: account.activeAccount
      })
    })

    const data = await res.json()

    addToken(data)
    updateCapsuleTypes(data)
  } catch (err) {
    //
  }
}

export default reactive({
  tokens,
  capsuleTypes,
  balance,
  balanceChecked,
  blackRedeemed,

  clear,
  clearTokens,
  getAccountDetails,
  resolveNFT
})
