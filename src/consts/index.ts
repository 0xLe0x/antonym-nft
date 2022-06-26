import legal from './legal.json'
import antonym_abi from './antonym_abi'

export { default as antonyms } from './antonyms.json'
export { default as intro } from './intro.json'
export { default as mock } from './mock.json'
export { default as zones } from './zones.json'
export const { PrivacyPolicy, TermsOfUse } = legal

export const smartContract = {
  contractAddress: '', // TODO: To be imported from env
  chainId: '4',
  abi: antonym_abi.abi
}
