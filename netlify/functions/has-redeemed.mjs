import { userHasRedeemed } from '../../common/users.mjs'

export const handler = async event => {
  try {
    const body = JSON.parse(event.body)

    const { address } = body

    const hasRedeemed = await userHasRedeemed(address)

    return { statusCode: 200, body: JSON.stringify({ redeemed: hasRedeemed }) }

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}
