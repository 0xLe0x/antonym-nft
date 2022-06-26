import { schedule } from '@netlify/functions'
import { getPaymentStatus } from '../../common/db-handlers.mjs'

const adminToken = process.env.VITE_SHOPIFY_ADMIN_TOKEN
const SHOPIFY_HOST = process.env.VITE_SHOPIFY_HOST

const shopifyRestClient = new Shopify.Clients.Rest(SHOPIFY_HOST, adminToken)

export const handler = schedule("15 * * * *", async (event, context) => {
	try {
		const body = JSON.parse(event.body)

		const { orderID } = body

		const status = await getPaymentStatus(orderID);

		if (status === 1) {
			// —>
		} else {
			return {
				statusCode: 404,
				body: 'No such order!',
			}
		}
	} catch (error) {
		console.log('Error:', error)

		if(error.response) {
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
})
