import legal from './legal.json'
import antonym_abi from './antonym_abi'

export { default as capsules } from './capsules.json'
export { default as intro } from './intro.json'
export { default as zones } from './zones.json'
export const { PrivacyPolicy, TermsOfUse } = legal

export const smartContract = {
  contractAddress: '', // TODO: To be imported from env
  chainId: '4',
  abi: antonym_abi.abi
}
