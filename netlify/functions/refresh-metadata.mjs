import { post } from 'axios'

export const handler = async (event, context) => {
	try {
		const body = JSON.parse(event.body)

		const { contractAddress, tokenID, isTestnet } = body

		const data = await post(
			`https://${
				isTestnet ? 'testnets-' : ''
			}api.opensea.io/api/v1/asset/${contractAddress}/${tokenID}/?force_update=true`
		)

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		}
	} catch (error) {
		console.log('Error:', error)

		return {
			statusCode: 200,
			body: JSON.stringify({ ok: false }),
		}
	}
}
