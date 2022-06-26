import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.VITE_S3_ACCESS_KEY,
  secretAccessKey: process.env.VITE_S3_SECRET,
  region: process.env.VITE_REGION
})

const bucketName = process.env.VITE_BUCKET_NAME
const S3 = new AWS.S3()

export const updateFile = async (_key, _phygital) => {
  let content
  const getParams = {
    Bucket: bucketName,
    Key: _key
  }

  S3.getObject(getParams, function (err, data) {
    if (err) {
      console.log(err)
    }
    content = JSON.parse(Buffer.from(data.Body))
    // If we want to add that trait and it does not exist  use this
    // content.attributes.push({  trait_type: 'STATUS', value: 'redeemed'})
    // if we have to update the value use this
    Object.keys(content.attributes).forEach(function (key) {
      if (content.attributes[key].trait_type === 'STATUS') {
        content.attributes[key].value = 'redeemed'
      }
    })
    const putParams = {
      Body: Buffer.from(JSON.stringify(content)),
      Bucket: bucketName,
      Key: _key,
      ACL: 'public-read'

    }
    S3.upload(putParams, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('succesfully uploaded!!!')
      }
    })
  })

  return true
}
