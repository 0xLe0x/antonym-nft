import { schedule } from '@netlify/functions'
import { ethers } from 'ethers'

import { getAllNFTs } from '../../common/db-handlers.mjs'
import { updateFile } from '../../common/aws-helper.mjs'
import { updateOrder } from '../../common/orders-helper.mjs'
import * as abi from '../../artifacts/contracts/ANTONYM/ANTONYM_ABI.json'

export const handler = async (event, context) => {
	try {
		const nftsArray = await getAllNFTs()
		const provider = new ethers.providers.JsonRpcProvider(process.env.VITE_INFURA_RPC)
		const contract = new ethers.Contract(
			process.env.VITE_CONTRACT_ADDRESS,
			abi,
			provider
		)
		const chagedOwners = nftsArray.filter(
			async (res) => (await contract.ownerOf(res.tokenId)) === res.ownerAddress
		)
		console.log(chagedOwners)
		if (chagedOwners.length > 0) {
			chagedOwners.forEach((token) => {
				updateFile(token.tokenId, '001')
				updateOrder()
			})
		}
	} catch (error) {
		console.log('Error:', error)

		if (error.response) {
			return {
				statusCode: error.response.status,
				body: JSON.stringify(error.response),
			}
		} else {
			return {
				statusCode: 404,
				body: JSON.stringify({ ok: false }),
			}
		}
	}
}
