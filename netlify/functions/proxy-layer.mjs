import { findOrFetch } from '../../common/token-handler.mjs'

export const  handler = async function (event, context) {
  try {
    const {nftURI, ownerAddress} = JSON.parse(event.body)
    const  nft  = await findOrFetch(nftURI,ownerAddress); 
    return { statusCode: 200, body: JSON.stringify(nft)}
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


