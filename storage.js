const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, 'latrosoft-3b817ba58a06.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'latrosoft',
})

module.exports = storage