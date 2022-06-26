const https = require('https')

import { Shopify, DataType } from '@shopify/shopify-api'
import { getTokenOwner } from '../../common/token-handler.mjs'
import { verifySignature } from '../../common/verify-signer.mjs'
import { storeOrder, getShippingPrice } from '../../common/orders-helper.mjs'
import { createUser, getUser } from '../../common/users.mjs'
import {utils} from 'ethers';

const adminToken = process.env.SHOPIFY_ADMIN_TOKEN
const SHOPIFY_HOST = process.env.SHOPIFY_HOST

const shopifyRestClient = new Shopify.Clients.Rest(SHOPIFY_HOST, adminToken)

export const handler = async (event) => {
	try {
		const body = JSON.parse(event.body)
		const sizeToWeight = {
			12: 4.5,
			24: 21.5,
		}

		const {
			ethAddress,
			signature,
			message,
			email,
			discordId,
			name,
			address,
			items,
		} = body
		let normalizedAddress = utils.getAddress(ethAddress)

		let ShippingPrice = 0
		let tokens = []
		shipitems = []
		for (const item of items) {
			if (!item) {
				console.debug('item null or undefined')
				continue
			}
			if(item.trait_type!='black'){

				if (item.selectedTokens.length < 1)
				return { statusCode: 401, body: 'NOT_SELECTED_ITEMS.' }
				if (item.size == 24 && item.selectedTokens.length < 4) {
					return { statusCode: 401, body: 'NEED_MORE_ITEMS.' }
				}
				tokens.push(...item.selectedTokens)
			}

			let ItemWeight = sizeToWeight[item.size]
			ShippingPrice += Number(await getShippingPrice(ItemWeight, address.country))
			console.debug(ShippingPrice)
			shipitems.push({
				price: 0,
				quantity: 1,
				title: `NFT Capsule: ${item.trait_type} size ${item.size}`,
				grams: 100,
				requires_shipping: true,
			})
		}

		tokens.forEach(async (element) => {
			if ((await getTokenOwner(element.tokenID)) != normalizedAddress) {
				return { statusCode: 401, body: 'NOT_OWNER.' }
			}
		})

		try {
			let verified = await verifySignature(normalizedAddress, message, signature)
			if (!verified) {
				return { statusCode: 401, body: 'Signature is invalid.' }
			}
		} catch (error) {
			return { statusCode: 500, body: 'Signature is invalid.' }
		}

		const data = await shopifyRestClient.post({
			path: 'draft_orders',
			data: {
				draft_order: {
					note: `DISCORDID:${discordId}`,
					customer: {
						note: `DISCORDID:${discordId}`,
						first_name: name + ' ' + normalizedAddress,
						email,
					},
					email,
					line_items: shipitems,
					shipping_line: {
						custom: true,
						title: `STANDARD - ${ShippingPrice} - ${address.country} `,
						price: ShippingPrice,
						code: 'Standard',
					},

					shipping_address: {
						name,
						address1: address.address1,
						address2: address.address2,
						province: address.province,
						zip: address.zip,
						phone: address.phone,
						city: address.city,
						country: address.country,
					},
				},
			},
			type: DataType.JSON,
		})

		await storeOrder(data.body.draft_order.id)
		if ((await getUser(normalizedAddress)) == null) {
			await createUser({ address: normalizedAddress, discordID: discordId, email: email })
		}

		return { statusCode: 200, body: JSON.stringify(data.body.draft_order) }
	} catch (error) {
		return { statusCode: 500, body: JSON.stringify(error) }
	}
}
