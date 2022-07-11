<template>
  <web3-modal-component
    ref="web3modal"
    :theme="theme"
    :provider-options="providerOptions"
  />
</template>
<script setup lang='ts'>
import { computed, nextTick, onMounted, ref } from 'vue'
import { Web3ModalComponent } from 'web3modal-vue3'
// import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'

import account, { setWeb3Modal, useAccount } from '@/use/account'

const theme = ref('dark')
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '294756524c724e35ae8e7cb59f4eca94'
    }
  }
}
const web3modal = ref<InstanceType<Web3ModalComponent> | null>(null)

onMounted(() => {
  nextTick(async () => {
    setWeb3Modal(web3modal.value)
    account.init()
  })
})
</script>
