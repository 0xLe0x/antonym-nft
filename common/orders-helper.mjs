import { MongoClient } from 'mongodb'
import { Shopify, DataType } from '@shopify/shopify-api'

const dbName = process.env.MONGODB_NAME
const URI = process.env.MONGODB_URL
const adminToken = process.env.SHOPIFY_ADMIN_TOKEN
const SHOPIFY_HOST = process.env.SHOPIFY_HOST
const shopifyRestClient = new Shopify.Clients.Rest(SHOPIFY_HOST, adminToken)

export const getShippingPrice = async (_weight, _country) => {
	try {
		const shipingZones = await shopifyRestClient.get({
			path: 'shipping_zones',
			type: DataType.JSON,
		})
		const result = shipingZones.body['shipping_zones']
			.filter((item) => item.countries[0].code === _country)
			.map((zone) => zone.weight_based_shipping_rates)
		return result[0].filter((item) => item.weight_high == _weight)[0].price
	} catch (error) {
		console.log(error)
	}
}

export const storeOrder = async (orderID) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('orders')

	await collection.insertOne({
		payerAddress: null,
		payment_tx: null,
		order_id: orderID,
	})
	await client.close()
	return true
}

export const updateOrder = async (orderID, _data) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('orders')

	await collection.updateOne({ order_id: orderID }, { $set: { ..._data } })
	await client.close()
	return true
}

export const completeOrder = async (orderID) => {
	const order = await shopifyRestClient.put({
		path: `draft_orders/${orderID}/complete`,
		data: {
			draft_order_id: orderID,
			payment_pending: false,
		},
		type: DataType.JSON,
	})
	return order
}
