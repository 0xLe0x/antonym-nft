import legal from './legal.json'
import antonym_abi from './antonym_abi'

export { default as capsules } from './capsules.json'
export { default as intro } from './intro.json'
export { default as zones } from './zones.json'
export const { PrivacyPolicy, TermsOfUse } = legal

const {
  VITE_CONTRACT_ADDRESS = ''
} = import.meta.env

export const smartContract = {
  contractAddress: VITE_CONTRACT_ADDRESS,
  chainId: '4',
  abi: antonym_abi.abi
}
