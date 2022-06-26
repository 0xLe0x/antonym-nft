import { updateFile } from '../../common/aws-helper.mjs'
import { completeOrder, updateOrder } from '../../common/orders-helper.mjs'
import { updateToken, refreshMeta } from '../../common/token-handler.mjs'
import { userRedeemBlack } from '../../common/users.mjs'
import {utils} from 'ethers';

export const handler = async function (event, context) {
	const { id, address, txhash, redeemItems } = JSON.parse(event.body)
	let ethAddress = utils.getAddress(address)

	try {
		let hasBlack = redeemItems.some((item) => item.trait_type === 'black')
		// UPDATE EACH AWS KEYs FILE

		let regularItems = redeemItems.filter((item) => item.trait_type !== 'black')
		let tokens = regularItems.map((item) =>
			item.selectedTokens?.reduce((token) => token)
		)

		console.debug(tokens)
		for (let index = 0; index < tokens.length; index++) {
			await updateFile(tokens[index].tokenID, redeemItems[index].size)
			await updateToken(tokens[index].tokenID, { redeemed: true })
			await refreshMeta(tokens[index].tokenID)
		}

		paymentData = {
			payerAddress: ethAddress,
			confirmed: true,
			txhash: txhash,
		}

		await updateOrder(id, paymentData) // UPDATE RECORD IN OUR COLLECTION
		await completeOrder(id) // UPDATE FROM DRAFT TO ORDER SHOPIFY
		if (hasBlack) {
			userRedeemBlack(ethAddress)
		}
		return { statusCode: 200, body: 'OK' }
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}
