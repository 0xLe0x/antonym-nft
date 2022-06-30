<template>
  <div class="flex flex-wrap -mx-3">
    <a
      v-for="token in userTokens"
      :key="token._id"
      class="w-full sm:w-1/2 lg:w-1/3 hoverable p-3"
      @click="openWalletToken(token)"
    >
      <img
        class="w-full mb-3"
        :src="token.image"
        width="600"
        height="600"
        :alt="token.name"
      >
      <div class="flex justify-between text-xs">
        <div class="uppercase">
          <span class="mb-1">
            {{ getTokenInfo(token.name).tokenName }}
          </span><br>
          {{ getTokenInfo(token.name).tokenNumber }}
        </div>
        <div
          v-if="token.redeemed"
          class="text-black/30"
        >
          REDEEMED
        </div>
        <div v-else>
          REDEEM ↗
        </div>
      </div>
    </a>
    <div
      v-for="idx in puppetCount"
      :key="idx"
      class="w-full sm:w-1/2 lg:w-1/3 hoverable p-3"
    >
      <div class="w-full pt-1/1 mb-3 bg-black/10" />
      <div class="flex items-start justify-between text-xs">
        <div class="uppercase">
          <span class="inline-block w-40 bg-black/10 mb-1 animate-pulse">
            &nbsp;
          </span><br>
          <span class="inline-block w-20 bg-black/10 animate-pulse">
            &nbsp;
          </span>
        </div>
        <span class="inline-block w-20 bg-black/10 animate-pulse">
          &nbsp;
        </span>
      </div>
    </div>

    <catalogue-wallet-modal
      v-model="tokenModal.show"
      :token="tokenModal.token"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import wallet, { Token } from '@/use/wallet'

const props = defineProps<{
  eligibleOnly: boolean
}>()

const tokenModal = reactive({
  token: {} as any as Token,
  show: false
})

const userTokens = computed(() => {
  const tokens = wallet.tokens || []

  return props.eligibleOnly
    ? tokens.filter(({ redeemed }) => redeemed !== true)
    : tokens
})

const puppetCount = computed(
  () => wallet.balance ? wallet.balance - userTokens.value.length : 0
)

const getTokenInfo = (name: string) => {
  const [tokenName, tokenNumber] = name.split(' #')
  return {
    tokenName,
    tokenNumber
  }
}

const openWalletToken = (token: Token) => {
  tokenModal.token = token
  tokenModal.show = true
}
</script>
