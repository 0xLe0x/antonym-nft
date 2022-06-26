import { MongoClient, ServerApiVersion } from 'mongodb'

const URI = process.env.VITE_MONGODB_URL
const client = new MongoClient(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})
const dbName = process.env.VITE_MONGODB_NAME

export const getUserID = async (address) => {
	return new Promise(async (resolve, reject) => {
		await client.connect()
		console.log('Connected successfully to server')
		const db = client.db(dbName)
		const collection = db.collection('users')

		const document = await collection.find({ address }).toArray()
		await client.close()
		return resolve(document[0].userID)
	})
}

export const getUser = async (address) => {
	await client.connect()
	console.log('Connected successfully to server')
	const db = client.db(dbName)
	const collection = db.collection('users')

	const document = await collection.findOne({ address })
	await client.close()
	return document
}

export const userHasRedeemed = async (address) => {
	await client.connect()
	console.log('Connected successfully to server')
	const db = client.db(dbName)
	const collection = db.collection('users')

	const document = await collection.findOne({ address, redeemed: true })
	await client.close()

	return document !== null
}

export const redeem = async (address) => {
	await client.connect()
	console.log('Connected successfully to server')
	const db = client.db(dbName)
	const collection = db.collection('users')

	const result = await collection.updateOne(
		{ address },
		{ $set: { redeemed: true } },
		{ upsert: true }
	)
	await client.close()

	const updateSuccessful = result.matchedCount && result.modifiedCount
	return updateSuccessful
}

export const createNewUser = async (address) => {
	await client.connect()
	console.log('Connected successfully to server')
	const db = client.db(dbName)
	const collection = db.collection('users')

	await collection.insertOne({ address, redeemed: false })
	await client.close()
	return 'Done.'
}

export const setUserData = async (address, userID) => {
	return new Promise(async (resolve, reject) => {
		await client.connect()
		console.log('Connected successfully to server')
		const db = client.db(dbName)
		const collection = db.collection('users')

		await collection.insertOne({ address, userID })
		await client.close()
		return resolve('Done.')
	})
}

export const getPaymentStatus = async (orderID) => {
	return new Promise(async (resolve, reject) => {
		await client.connect()
		console.log('Connected successfully to server')
		const db = client.db(dbName)
		const collection = db.collection('orders')

		const document = await collection.find({ orderID }).toArray()
		await client.close()
		return resolve(document[0].orderID)
	})
}

export const getAllNFTs = async () => {
	await client.connect()
	console.log('Connected successfully to server')
	const db = client.db(dbName)
	const NFTitems = await db
		.collection('NFTitems')
		.find({ isRedeemed: true })
		.toArray()
	await client.close()
	return NFTitems
}
