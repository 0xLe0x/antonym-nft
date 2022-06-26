import { MongoClient, ServerApiVersion } from 'mongodb'
import { ethers } from 'ethers'
import { abi } from '../contracts/antonym_abi.json'


const https = require('https')

const URI = process.env.MONGODB_URL
const dbName = process.env.MONGODB_NAME
const scAddress = process.env.CONTRACT_ADDRESS
const isTestnet = true
const client = new MongoClient(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

export const findOrFetch = async (tokenuri, ownerAddress) => {
	await client.connect()
	let nftID = tokenuri.substring(tokenuri.lastIndexOf('/') + 1)
	const db = client.db(dbName)
	const collection = db.collection('tokens')
	const document = await collection.findOne({ tokenID: nftID })
	if (document == null) {
		try {
			nftmeta = await fetchNft(tokenuri)

			const nftObj = JSON.parse(nftmeta)
			collection.insertOne({ ...nftObj, tokenID: nftID, owner: ownerAddress })
			return JSON.stringify(nftObj)
		} catch (error) {
			return JSON.stringify(error)
		}
	}
	return document
}

export const updateToken = async (tokenID, _data) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('tokens')

	await collection.updateOne({ tokenID: tokenID }, { $set: { ..._data } })
	await client.close()
	return true
}
export const refreshMeta = async (tokenID)=> {
	https.get(`https://testnets-api.opensea.io/api/v1/asset/${scAddress}/${tokenID}/?force_update=true`)
} 
export const getTokenOwner = async (tokenID) => {
	let provider = new ethers.providers.InfuraProvider(
		process.env.CHAIN_NETWORK,
		process.env.INFURA_PROJECT
	)
	// const signer = new ethers.Wallet(
	// 	process.env.CONTRACT_OWNER_PRIVATE_KEY,
	// 	provider
	// )
	const contract = new ethers.Contract(
		process.env.CONTRACT_ADDRESS,
		abi,
		provider
	)
	return await contract.ownerOf(tokenID)
}

const fetchNft = async (tokenuri) => {
	const httpRequest = (url) => {
		return new Promise((resolve, reject) => {
			https
				.get(url, (res) => {
					res.setEncoding('utf8')
					let body = ''
					res.on('data', (chunk) => (body += chunk))
					res.on('end', () => resolve(body))
				})
				.on('error', reject)
		})
	}
	return await httpRequest(tokenuri)
}
