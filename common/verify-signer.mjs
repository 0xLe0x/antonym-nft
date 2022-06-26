import { ethers } from 'ethers'

export const verifySignature = async (ethAddress, message, signature) => {
  const verifiedAddress = await ethers.utils.verifyMessage(message, signature)
  return ethAddress == verifiedAddress
}
