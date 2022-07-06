import cart from '@/use/cart'
import { Token } from '@/use/wallet'

export const getCapsuleTrait = (token: Token) => {
  return token.attributes.find((attr) => attr.trait_type === 'Capsule')?.value || ''
}

export const alreadyInCart = (tokenID: string) => {
  return cart.selectedTokens.some((token) => token.tokenID === tokenID)
}

export const isRedeemable = (token: Token) => {
  if (token.redeemed || alreadyInCart(token.tokenID)) {
    return false
  }
  return true
}
