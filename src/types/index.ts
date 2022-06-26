import { antonyms } from '@/consts'

export type TokenAttribute = {
  trait_type: string,
  value: string
}
export type Token = {
  tokenID: string,
  attributes?: TokenAttribute[]
}

type CapsuleArray = typeof antonyms
export type Capsule = CapsuleArray[number];
