import { MongoClient } from 'mongodb'
import {utils} from 'ethers';

const dbName = process.env.VITE_MONGODB_NAME
const URI = process.env.VITE_MONGODB_URL

export const userRedeemBlack = async(ethaddress) => {
	console.debug('Updating black ')
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('users')

	await collection.updateOne({ address: ethaddress }, { $set: { blackRedeemed:true } })
	await client.close()
	return true
}
export const createUser = async (data) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)

	const collection = db.collection('users')
	collection.createIndex({ address: 1 }, { unique: true })

	await collection.insertOne({
		address: data.address,
		discordID: data.discordID,
		email: data.email
	})

	await client.close()
	return true
}

export const getUser = async (address) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('users')
	const document = await collection.findOne({ address })
	await client.close()
	return document
}
export const userHasRedeemed = async (address) => {
	let ethAddress = utils.getAddress(address)

	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const collection = db.collection('users')

	const document = await collection.findOne({"address":ethAddress,"blackRedeemed":true})
	console.debug(ethAddress)
	await client.close()

	return document !== null
}
export const allUsers = async (query) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
	const db = client.db(dbName)
	const users = db.collection('users')
	const arr = await users.find({}).toArray()
	await client.close()
	return arr
}
