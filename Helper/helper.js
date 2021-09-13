const util = require('util')
const gc = require('../storage')
const bucket = gc.bucket('latroosfttechblog') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

exports.uploadImage = (file,name) => new Promise((resolve, reject) => {
  const { buffer } = file

  const blob = bucket.file(name+'.png')
  
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = util.format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})


exports.deleteImage=(folder)=> new Promise(async(resolve,reject)=>{
  try {
  
    bucket.getFiles({ prefix: folder }, function(err, files) {})
    bucket.deleteFiles({ prefix: folder }, function(err) {})
    resolve("Success")
  } catch (error) {
    reject(error)
  }
   
    

})