export const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io']
}

export const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io'],
  faucetUrls: ['https://faucet.avax-test.network']
}

export const POLYGON_MAINNET_PARAMS = {
  chainId: '0x89',
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: [
    'https://polygon-rpc.com',
    'https://rpc-mainnet.matic.network',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro'
  ],
  blockExplorerUrls: ['https://polygonscan.com']
}

export const POLYGON_MUMBAI_TESTNET_CONFIG = {
  chainId: '0x13881',
  chainName: 'Polygon Testnet',
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  faucetUrls: ['https://faucet.polygon.technology']
}

export const FANTOM_TESTNET_CONFIG = {
  chainId: '0xfa2',
  chainName: 'Fantom Testnet',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  rpcUrls: ['https://rpc.testnet.fantom.network'],
  blockExplorerUrls: ['https://testnet.ftmscan.com'],
  faucetUrls: ['https://faucet.fantom.network']
}

export const FANTOM_MAINNET_CONFIG = {
  chainId: '0xFA',
  chainName: 'Fantom Opera',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  rpcUrls: ['https://rpc.ftm.tools'],
  blockExplorerUrls: ['https://ftmscan.com']
}

export const ETHEREUM_RINKEBY = {
  chainId: '0x4',
  chainName: 'Rinkeby',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  faucetUrls: ['https://faucet.fantom.network', 'https://faucets.chain.link/rinkeby']
}

export const ETHEREUM_MAINNET = {
  chainId: '0x1',
  chainName: 'Mainnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://etherscan.io']
}

export function getMainnetConfig (testnetChainId: string) {
  if (['0x4', '4'].includes(testnetChainId)) return ETHEREUM_MAINNET
  if (['0xA869', '43113'].includes(testnetChainId)) return AVALANCHE_MAINNET_PARAMS
  if (['0x89', '80001'].includes(testnetChainId)) return POLYGON_MAINNET_PARAMS
  if (['0xFA2', '4002'].includes(testnetChainId)) return FANTOM_MAINNET_CONFIG

  throw new Error('Matching mainnet config not found')
}

export const CHAINID_CONFIG_MAP: Record<string, {
  chainId: string,
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
  faucetUrls?: string[]
}> = {
  43114: AVALANCHE_MAINNET_PARAMS,
  43113: AVALANCHE_TESTNET_PARAMS,
  80001: POLYGON_MUMBAI_TESTNET_CONFIG,
  4: ETHEREUM_RINKEBY,
  1: ETHEREUM_MAINNET,
  4002: FANTOM_TESTNET_CONFIG,
  250: FANTOM_MAINNET_CONFIG,

  '0xA86A': AVALANCHE_MAINNET_PARAMS,
  '0xA869': AVALANCHE_TESTNET_PARAMS,
  '0x13881': POLYGON_MUMBAI_TESTNET_CONFIG,
  '0x89': POLYGON_MAINNET_PARAMS,
  '0x4': ETHEREUM_RINKEBY,
  '0x1': ETHEREUM_MAINNET,
  '0xFA2': FANTOM_TESTNET_CONFIG,
  '0xFA': FANTOM_MAINNET_CONFIG
}

export const isTestnet = (chainId: string) => {
  return ['43113', '80001', '4', '4002', '0xA869', '0x13881', '0x4', '0xFA2'].includes(chainId)
}

export function getExplorerUrl (chainId: string) {
  return CHAINID_CONFIG_MAP[chainId]?.blockExplorerUrls[0]
}

export function getCurrency (chainId: string) {
  return CHAINID_CONFIG_MAP[chainId]?.nativeCurrency.symbol
}

export function getNetwork (chainId: string) {
  return CHAINID_CONFIG_MAP[chainId]?.chainName
}

export function getFaucetList (chainId: string) {
  return CHAINID_CONFIG_MAP[chainId]?.faucetUrls
}
